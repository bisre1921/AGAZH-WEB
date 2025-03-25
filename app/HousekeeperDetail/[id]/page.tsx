"use client";

import { getHousekeeper } from "@/app/api/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaBriefcase,
  FaUser,
  FaCheck,
  FaCertificate,
  FaCommentDots,
} from "react-icons/fa";

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

const HousekeeperDetail = () => {
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [housekeeper, setHousekeeper] = useState<Housekeeper | null>(null);

  const router = useRouter();

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

  const handleHire = () => {
    router.push(`/HireHousekeeper/${id}`);
  }

  if (loading) {
    return <p className="text-center text-xl font-semibold mt-20">Loading...</p>;
  }

  if (!housekeeper) {
    return <p className="text-center text-red-500 mt-20">Housekeeper not found</p>;
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] text-[#333] px-6 pt-20 flex flex-col items-center">
      <div className="bg-white shadow-lg border border-[#B08968] rounded-2xl overflow-hidden w-full max-w-3xl">
       
        <div className="relative h-60 bg-gray-200 flex items-center justify-center">
          {housekeeper.photo_url ? (
            <img
              src={housekeeper.photo_url}
              alt={housekeeper.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <FaUser className="text-gray-500 text-9xl" />
          )}
          {housekeeper.is_available && (
            <span className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 text-sm font-bold rounded-full shadow-md">
              Available
            </span>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-[#B08968]">{housekeeper.name}</h1>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaMapMarkerAlt className="text-[#B08968]" /> {housekeeper.location}
          </p>

          <div className="flex items-center mt-3">
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

          <div className="mt-5 text-gray-700 space-y-2">
            <p className="flex items-center gap-2">
              <FaBriefcase className="text-[#B08968]" /> {housekeeper.experience} years of experience
            </p>
            <p>
              <span className="font-semibold">Age:</span> {housekeeper.age} years
            </p>
            <p>
              <span className="font-semibold">Category:</span> {housekeeper.category}
            </p>
            <p>
              <span className="font-semibold">Employment:</span> {housekeeper.employment_type.replace("_", " ")}
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span> {housekeeper.phone_number}
            </p>
          </div>

          {housekeeper.skills?.length ? (
            <div className="mt-5">
              <h2 className="text-lg font-bold text-[#B08968]">Skills</h2>
              <ul className="flex flex-wrap gap-2 mt-2">
                {housekeeper.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-[#E8C888] text-[#333] px-3 py-1 text-sm rounded-lg shadow-md flex items-center"
                  >
                    <FaCheck className="text-green-600 mr-2" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {housekeeper.certifications?.length ? (
            <div className="mt-5">
              <h2 className="text-lg font-bold text-[#B08968]">Certifications</h2>
              <ul className="flex flex-wrap gap-2 mt-2">
                {housekeeper.certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="bg-blue-200 text-[#333] px-3 py-1 text-sm rounded-lg shadow-md flex items-center"
                  >
                    <FaCertificate className="text-blue-600 mr-2" /> {cert}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {housekeeper.reviews?.length ? (
            <div className="mt-5">
              <h2 className="text-lg font-bold text-[#B08968]">Reviews</h2>
              <div className="mt-2 space-y-3">
                {housekeeper.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <p className="flex items-center gap-2 text-gray-700">
                      <FaCommentDots className="text-[#B08968]" /> {review}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6">
            <button 
              className="w-full bg-[#E8C888] text-[#333] font-semibold py-3 rounded-lg shadow-md hover:bg-[#D4AF7A] transition flex items-center justify-center gap-2"
              onClick={handleHire}
            >
              Hire {housekeeper.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousekeeperDetail;
