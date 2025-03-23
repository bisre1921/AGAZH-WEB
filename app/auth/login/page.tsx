"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { useAppDispatch } from "@/app/store/hooks";
import { loginUser } from "../../store/slices/loginSlice"
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  userType: string;
}


const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: { userType: "housekeeper" }, 
  });
  

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      console.log("Form Data:", data);
      let processedData: any = {};
      processedData = {
        email: data.email,
        password: data.password,
        user_type: data.userType
      }
      console.log("Processed Data:", processedData);
      await dispatch(loginUser(processedData)).unwrap();
      console.log("logged in");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F1] text-[#333] px-6 md:px-10 pt-20">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl px-8 py-10 border border-[#B08968]/30">
        <h2 className="text-4xl font-extrabold text-center text-[#B08968] mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
              <FaUsers className="text-[#B08968]" />
              <select
                  {...register("userType", { required: "User type is required" })}
                  className="bg-transparent flex-1 outline-none text-[#333]"
                >
                  <option value="" disabled>Select User Type</option>
                  <option value="housekeeper">Housekeeper</option>
                  <option value="employer">Employer</option>
              </select>
            </label>
            {errors.userType && <p className="text-red-500 text-sm mt-1">{String(errors.userType.message)}</p>}

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B08968] text-black px-6 py-3 rounded-full font-bold text-lg shadow-md hover:bg-[#8E6B50] transition disabled:opacity-50"
          >
            {loading ? "login..." : "login"}
          </button>
        </form>

        <p className="text-center text-[#333] mt-6">
          Don't have an account?{" "}
          <Link href="/auth/RegisterEmployer" className="text-[#B08968] font-bold hover:underline transition">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
