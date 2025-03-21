"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { useAppDispatch } from "@/app/store/hooks";
import { RegisterHousekeeper } from "../../store/slices/housekeeperAuthSlice"
import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  age: number;
  category: string;
  employmentType: string;
  experience: number;
  certifications: string;
  photo_url: string;
  location: string;
}


const RegisterHousekeeperPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const password = watch("password");

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      console.log("Form Data:", data);
      let processedData: any = {};
      processedData = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        phone_number: data.phone,
        age: Number(data.age),
        location: data.location,
        category: data.category,
        employment_type: data.employmentType,
        experience: Number(data.experience),
        certifications: data.certifications
        ? data.certifications.split(",").map((cert) => cert.trim()) : [], 
        photo_url: data.photo_url,
      }
      console.log("Processed Data:", processedData);
      await dispatch(RegisterHousekeeper(processedData)).unwrap();
      console.log("Registered Housekeeper");
      setLoading(false);
      router.push("/auth/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F1] text-[#333] px-6 md:px-10 pt-20">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl px-8 py-10 border border-[#B08968]/30">
        <h2 className="text-4xl font-extrabold text-center text-[#B08968] mb-8">
          Register as Housekeeper
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaUser className="text-[#B08968]" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full Name is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{String(errors.fullName.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaEnvelope className="text-[#B08968]" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaLock className="text-[#B08968]" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaLock className="text-[#B08968]" />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match", 
                })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{String(errors.confirmPassword.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaHome className="text-[#B08968]" />
              <input
                type="number"
                placeholder="Age"
                {...register("age", { required: "age is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.age && <p className="text-red-500 text-sm mt-1">{String(errors.age.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaHome className="text-[#B08968]" />
              <input
                type="string"
                placeholder="Location"
                {...register("location", { required: "Location is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.location && <p className="text-red-500 text-sm mt-1">{String(errors.location.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaPhone className="text-[#B08968]" />
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone", { required: "Phone Number is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{String(errors.phone.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaUsers className="text-[#B08968]" />
              <input
                type="string"
                placeholder="Category"
                {...register("category", { required: "Category is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.category && <p className="text-red-500 text-sm mt-1">{String(errors.category.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaUsers className="text-[#B08968]" />
              <input
                type="string"
                placeholder="Employment Type"
                {...register("employmentType", { required: "Employment Type is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.employmentType && <p className="text-red-500 text-sm mt-1">{String(errors.employmentType.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaUsers className="text-[#B08968]" />
              <input
                type="string"
                placeholder="photo url"
                {...register("photo_url", { required: "photo url is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.photo_url && <p className="text-red-500 text-sm mt-1">{String(errors.photo_url.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaUsers className="text-[#B08968]" />
              <input
                type="number"
                placeholder="Experience"
                {...register("experience", { required: "Experience is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.experience && <p className="text-red-500 text-sm mt-1">{String(errors.experience.message)}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-3 bg-[#F1E9DB] border border-[#B08968]/50 rounded-lg px-5 py-3 focus-within:ring-2 focus-within:ring-[#B08968]">
              <FaUsers className="text-[#B08968]" />
              <input
                type="string"
                placeholder="certifications(comma separated list)"
                {...register("certifications", { required: "Certifications is required" })}
                className="bg-transparent flex-1 outline-none text-[#333] placeholder-gray-500"
              />
            </label>
            {errors.certifications && <p className="text-red-500 text-sm mt-1">{String(errors.certifications.message)}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B08968] text-black px-6 py-3 rounded-full font-bold text-lg shadow-md hover:bg-[#8E6B50] transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-[#333] mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#B08968] font-bold hover:underline transition">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterHousekeeperPage;
