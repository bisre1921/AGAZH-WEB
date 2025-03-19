"use client";

import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { RegisterHousekeeper } from "../store/slices/housekeeperAuthSlice";
import { RegisterEmployer } from "../store/slices/employerAuthSlice";
import { loginUser } from "../store/slices/loginSlice";

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const [userType, setUserType] = useState("housekeeper");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    familySize: "",
    age: "",
    location: "",
    category: "",
    employmentType: "",
    experience: "",
    certifications: [],
    photo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: name === "age" || name === "familySize" || name === "experience"
        ? Number(value) 
        : name === "certifications"
        ? value.split(",").map((cert) => cert.trim()) // Convert to array
        : value,
    });
  };
  

  const handleRegister = async () => {
    try {
      let processedData: any = {};
  
      if (userType === "housekeeper") {
        processedData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: Number(formData.age),
          phone_number: formData.phone_number,
          category: formData.category,
          employment_type: formData.employmentType,
          location: formData.location,
          experience: formData.experience,
          certifications: formData.certifications,
          photo_url: formData.photo
        };
        await dispatch(RegisterHousekeeper(processedData)).unwrap();
      } else if (userType === "employer") {
        processedData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          phone_number: formData.phone_number,
          familySize: Number(formData.familySize),
        };
        await dispatch(RegisterEmployer(processedData)).unwrap();
      }
  
      alert(`${userType} registered successfully!`);
    } catch (error) {
      alert(`Registration failed: ${error}`);
    }
  };
  
  
  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email: formData.email, password: formData.password, user_type: userType })).unwrap();
      alert("Login successful!");
    } catch (error) {
      alert(`Login failed: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Authentication</h2>

        {/* User Type Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="housekeeper">Housekeeper</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        {/* Common Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input type="text" name="name" onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" name="email" onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input type="password" name="password" onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input type="text" name="phone_number" onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        {/* Housekeeper Specific Fields */}
        {userType === "housekeeper" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Age</label>
              <input type="number" name="age" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input type="text" name="location" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <input type="text" name="category" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Employment Type</label>
              <input type="text" name="employmentType" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Experience</label>
              <input type="number" name="experience" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Certifications</label>
              <input type="text" name="certifications" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Photo URL</label>
              <input type="text" name="photo" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>


          </>
        )}

        {/* Employer Specific Fields */}
        {userType === "employer" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input type="text" name="address" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Family Size</label>
              <input type="number" name="familySize" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Register
          </button>
          <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
