"use client";

import React, { useEffect, useState } from "react";
import { getEmployer, updateEmployer } from "@/app/api/axiosInstance";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaUsers,
  FaCalendarAlt,
  FaUserEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

interface EmployerProfile {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  family_size: number;
  created_at: string;
}

interface UserInfo {
  user_id: string;
  exp: string;
  user_type: string;
}

const EmployerProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    familySize: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getEmployer(userInfo?.user_id || "");
      setProfile(response.data);
      setFormData({
        name: response.data.name || "",
        address: response.data.address || "",
        phoneNumber: response.data.phone_number || "",
        familySize: response.data.family_size.toString() || "",
      });
    } catch (error) {
      console.error("Error fetching employer profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchProfile();
    }
  }, [userInfo]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      console.log("Updating profile with data:", formData);
      const updatedData = {
        ...profile,
        name: formData.name,
        address: formData.address,
        phone_number: formData.phoneNumber,
        family_size: parseInt(formData.familySize) || 0,
      }
      console.log("Updated data:", updatedData);
      const response = await updateEmployer(userInfo?.user_id || "", updatedData);
      console.log("Update response:",
        response.data
      );
      setEditing(false);
      fetchProfile();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F9F6F1] text-[#333] px-6 md:px-10 pt-20">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl px-8 py-10 border border-[#B08968]/30">
        {loading ? (
          <p className="text-center text-gray-600">Loading profile...</p>
        ) : (
          <div>
            {/* Profile Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-[#B08968] text-white flex items-center justify-center text-xl font-bold rounded-full">
                {profile?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-[#B08968]">
                  {profile?.name}
                </h2>
                <p className="text-gray-600">{profile?.email}</p>
              </div>
            </div>

            {/* Profile Info */}
            {editing ? (
              <div className="space-y-4">
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Address", key: "address", type: "text" },
                  { label: "Phone Number", key: "phoneNumber", type: "text" },
                  { label: "Family Size", key: "familySize", type: "number" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-gray-600">{field.label}</label>
                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-[#B08968]/50 rounded-lg bg-[#F1E9DB] focus:ring-2 focus:ring-[#B08968] outline-none"
                    />
                  </div>
                ))}

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-full font-bold shadow-md hover:bg-gray-600 transition"
                  >
                    <FaTimes className="mr-2 inline" /> Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 bg-[#B08968] text-black py-3 rounded-full font-bold shadow-md hover:bg-[#8E6B50] transition"
                  >
                    <FaSave className="mr-2 inline" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-lg">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-[#B08968]" />
                  <span>{profile?.address || "N/A"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaPhone className="text-[#B08968]" />
                  <span>{profile?.phone_number || "N/A"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaUsers className="text-[#B08968]" />
                  <span>Family Size: {profile?.family_size || "N/A"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-[#B08968]" />
                  <span>
                    Member Since:{" "}
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-[#B08968] text-black py-3 rounded-full font-bold shadow-md hover:bg-[#8E6B50] transition"
                >
                  <FaUserEdit className="mr-2 inline" /> Edit Profile
                </button>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("userInfo");
                window.location.href = "/login";
              }}
              className="w-full bg-red-600 text-white py-3 rounded-full font-bold shadow-md hover:bg-red-700 transition mt-4"
            >
              <FaSignOutAlt className="mr-2 inline" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
