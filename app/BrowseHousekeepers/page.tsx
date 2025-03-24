"use client";

import React, { useEffect, useState } from "react";
import { getHousekeepers } from "../api/axiosInstance";
import { FaStar, FaMapMarkerAlt, FaPhone, FaUser, FaBriefcase } from "react-icons/fa";

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

const BrowseHousekeeperPage = () => {
  const [housekeepers, setHousekeepers] = useState<Housekeeper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHousekeepers = async () => {
    try {
      setLoading(true);
      const response = await getHousekeepers();
      setHousekeepers(response.data);
    } catch (error) {
      setError("Failed to fetch housekeepers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHousekeepers();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF3E0] text-[#333] px-6 pt-20">
      <h1 className="text-5xl font-extrabold text-center text-[#B08968] mb-8 uppercase tracking-wide shadow-lg">
        🔥 Top Housekeepers
      </h1>

      {loading && <p className="text-center text-xl font-semibold">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {housekeepers.map((housekeeper) => (
          <div
            key={housekeeper.id}
            className="relative bg-white border border-[#B08968] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
          >
            {/* Image */}
            <div className="h-52 bg-gray-200 flex items-center justify-center relative">
              {housekeeper.photo_url ? (
                <img
                  src={housekeeper.photo_url}
                  alt={housekeeper.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUser className="text-gray-500 text-6xl" />
              )}
              {housekeeper.is_available && (
                <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                  Available
                </span>
              )}
            </div>

            {/* Info Section */}
            <div className="p-5">
              <h2 className="text-3xl font-bold text-[#B08968]">{housekeeper.name}</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <FaMapMarkerAlt className="text-[#B08968]" /> {housekeeper.location}
              </p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-xl ${
                      index < (housekeeper.rating || 0) ? "text-yellow-400" : "text-gray-400"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600 text-sm">({housekeeper.rating || 0})</span>
              </div>

              <p className="text-gray-700 flex items-center gap-2 mt-3">
                <FaBriefcase className="text-[#B08968]" /> {housekeeper.experience} years experience
              </p>

              <p className="text-gray-700 mt-2">
                <span className="font-semibold text-[#333]">Category:</span> {housekeeper.category}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-[#333]">Employment:</span> {housekeeper.employment_type.replace("_", " ")}
              </p>

              {/* Contact Button */}
              <div className="mt-4">
                <button className="w-full bg-[#E8C888] text-[#333] font-semibold py-2 rounded-lg shadow-md hover:bg-[#D4AF7A] transition">
                  Contact: {housekeeper.phone_number}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseHousekeeperPage;
