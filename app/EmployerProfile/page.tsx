"use client";

import React, { useEffect, useState } from "react";
import { getEmployer } from "../api/axiosInstance";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaUsers,
  FaCalendarAlt,
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (userInfo?.user_id) {
          const response = await getEmployer(userInfo.user_id);
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching employer profile", error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchProfile();
    }
  }, [userInfo]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-700"></div>
        <p className="text-gray-700 mt-4">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen pt-20">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-700 text-white text-xl font-bold">
            {profile?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{profile?.name}</h2>
            <p className="text-gray-600">{profile?.email}</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Profile Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-gray-700" />
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-semibold">{profile?.address || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaPhone className="text-gray-700" />
            <div>
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-semibold">{profile?.phone_number || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaUsers className="text-gray-700" />
            <div>
              <p className="text-gray-500 text-sm">Family Size</p>
              <p className="font-semibold">{profile?.family_size || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-gray-700" />
            <div>
              <p className="text-gray-500 text-sm">Member Since</p>
              <p className="font-semibold">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default EmployerProfile;
