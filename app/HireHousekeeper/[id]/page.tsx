"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from "yup";
import axios from "axios";
import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import { createHiring, getHousekeeper } from "@/app/api/axiosInstance";

interface Housekeeper {
  id: string;
  name: string;
  email: string;
  location: string;
  experience: number;
  category: string;
  employment_type: string;
  skills?: string[];
  photo_url?: string;
  rating?: number;
  age: number;
  certifications?: string[];
  phone_number: string;
  reviews?: string[];
  is_available: boolean;
}

interface UserInfoType {
  user_id: string;
  exp: string;
  user_type: string;
}

interface FormValues {
  requirements: string;
  salaryOffer: number;
  startDate: Date;
  deliveryType: "DELIVERY" | "PICKUP";
}

const hireSchema = Yup.object().shape({
  requirements: Yup.string().required("Requirements are required"),
  salaryOffer: Yup.number()
    .typeError("Salary must be a number")
    .min(1, "Salary must be greater than 0")
    .required("Salary offer is required"),
  startDate: Yup.date().required("Start date is required"),
  deliveryType: Yup.string().oneOf(["DELIVERY", "PICKUP"]).required("Delivery type is required"),
});


const HireHousekeeper = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [housekeeper, setHousekeeper] = useState<Housekeeper | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchHousekeeper = async () => {
      try {
        const response = await getHousekeeper(String(id));
        setHousekeeper(response.data);
      } catch (error) {
        console.error("Error fetching housekeeper details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHousekeeper();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(hireSchema),
    defaultValues: {
      requirements: "",
      salaryOffer: 0,
      startDate: new Date(),
      deliveryType: "DELIVERY",
    },
  });

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        router.push("/auth/login");
      }
    }
  }, [])

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitLoading(true);

      const hiringData = {
        employer_id: userInfo?.user_id,
        housekeeper_id: housekeeper?.id,
        requirements: data.requirements,
        salary_offer: data.salaryOffer,
        start_date: data.startDate.toISOString(),
        delivery_type: data.deliveryType,
      };
      console.log("Hiring data:", hiringData);
      const response = await createHiring(hiringData);
      if (!response.data || !response.data.id) {
        throw new Error("Invalid response from server");
      }
      console.log("Hiring response:", response.data);
      alert("Hiring request sent successfully!");
    } catch (error: any) {
      console.error("Hiring error:", error);
      alert("Hiring failed. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F1] text-[#333] px-6 md:px-10 pt-20">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl px-8 py-10 border border-[#B08968]/30">
        <h2 className="text-4xl font-extrabold text-center text-[#B08968] mb-8">
          Hire Housekeeper
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-[#B08968]">Housekeeper:</h3>
            <p>{housekeeper?.name}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#B08968]">Category:</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded">{housekeeper?.category}</span>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#B08968]">Employment Type:</h3>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded">{housekeeper?.employment_type}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        
          <div>
            <label className="block font-semibold text-[#B08968]">Start Date</label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={(date: any) => field.onChange(date)}
                  minDate={new Date()}
                  className="border p-4 w-full rounded-lg mt-1 bg-[#F9F6F1] text-[#333] border-[#B08968]/50 focus:ring-2 focus:ring-[#B08968] focus:outline-none transition-all duration-300 ease-in-out"
                />
              )}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
          </div>

          <div>
            <label className="block font-semibold text-[#B08968]">Delivery Options</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input type="radio" value="DELIVERY" {...register("deliveryType")} className="mr-2" />
                Delivery (We’ll bring the housekeeper to your home)
              </label>
              <label className="flex items-center">
                <input type="radio" value="PICKUP" {...register("deliveryType")} className="mr-2" />
                Pickup (You’ll pick up the housekeeper from our office)
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#B08968]">Requirements</label>
            <textarea
              {...register("requirements")}
              className="border p-3 w-full mt-1 rounded-lg bg-[#F1E9DB] border-[#B08968]/50"
              rows={4}
              placeholder="Enter specific requirements"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#B08968]">Salary Offer (USD)</label>
            <input
              type="number"
              {...register("salaryOffer")}
              className="border p-3 w-full mt-1 rounded-lg bg-[#F1E9DB] border-[#B08968]/50"
              placeholder="Enter salary offer"
            />
          </div>

          <button 
            className="w-full bg-[#B08968] text-black px-6 py-3 rounded-full font-bold text-lg shadow-md hover:bg-[#8E6B50] transition"
          >
            {submitLoading ? "Submitting..." : "Submit Hiring Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HireHousekeeper;
