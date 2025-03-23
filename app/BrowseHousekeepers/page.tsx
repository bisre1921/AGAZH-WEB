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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center text-[#FFD700] mb-8 uppercase tracking-wide shadow-lg">
        🔥 Top Housekeepers
      </h1>

      {loading && <p className="text-center text-xl font-semibold">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {housekeepers.map((housekeeper) => (
          <div
            key={housekeeper.id}
            className="relative bg-black/40 border border-[#FFD700] rounded-2xl overflow-hidden shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="h-52 bg-gray-900 flex items-center justify-center relative">
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
              <h2 className="text-3xl font-bold text-[#FFD700]">{housekeeper.name}</h2>
              <p className="text-gray-400 flex items-center gap-2 mt-1">
                <FaMapMarkerAlt className="text-[#FFD700]" /> {housekeeper.location}
              </p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-xl ${
                      index < (housekeeper.rating || 0) ? "text-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-400 text-sm">({housekeeper.rating || 0})</span>
              </div>

              <p className="text-gray-300 flex items-center gap-2 mt-3">
                <FaBriefcase className="text-[#FFD700]" /> {housekeeper.experience} years experience
              </p>

              <p className="text-gray-400 mt-2">
                <span className="font-semibold text-white">Category:</span> {housekeeper.category}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Employment:</span> {housekeeper.employment_type.replace("_", " ")}
              </p>

              {/* Contact Button */}
              <div className="mt-4">
                <button className="w-full bg-[#FFD700] text-black font-semibold py-2 rounded-lg hover:bg-[#ffcc00] transition">
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
