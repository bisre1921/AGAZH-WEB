"use client";

import { getHiringStatus, getHousekeeper, updateHiringStatus } from "@/app/api/axiosInstance";
import Loader from "@/app/components/Loader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaTruck } from "react-icons/fa";

interface Hiring {
  id: string;
  status: string;
  start_date: string;
  salary_offer: number;
  delivery_type: string;
  requirements: string;
  created_at: string;
  housekeeper_id: string;
}

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

const getStatusColor = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "text-yellow-500";
    case "APPROVED":
      return "text-green-500";
    case "REJECTED":
      return "text-red-500";
    case "COMPLETED":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

const HiringStatus = () => {
  const params = useParams();
  const { id } = params;

  const [hiring, setHiring] = useState<Hiring | null>(null);
  const [housekeeper, setHousekeeper] = useState<Housekeeper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHiringDetails = async () => {
      try {
        const hiringResponse = await getHiringStatus(String(id));
        setHiring(hiringResponse.data);

        const housekeeperResponse = await getHousekeeper(hiringResponse.data.housekeeper_id);
        setHousekeeper(housekeeperResponse.data);
      } catch (error) {
        console.error("Error fetching hiring details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHiringDetails();
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!hiring) return;

    try {
      await updateHiringStatus(hiring.id, { status: newStatus });
      setHiring({ ...hiring, status: newStatus });
      console.log("Hiring status updated successfully.");
    } catch (error) {
      console.error("Error updating hiring status:", error);
    }
  }

  if (loading) return <Loader />;

  if (!hiring || !housekeeper) {
    return <div className="text-center text-gray-500 mt-10">Unable to load hiring details.</div>;
  }

  const handleWriteReview = () => {
    if (hiring && housekeeper) {
      // to do
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg space-y-8">
      {/* Status Section */}
      <div className="flex items-center justify-between">
        <div className={`w-4 h-4 rounded-full ${getStatusColor(hiring.status)}`} />
        <h2 className="ml-3 text-xl font-semibold text-gray-800">Status: <span className={getStatusColor(hiring.status)}>{hiring.status}</span></h2>
      </div>

      <div className="border-t border-gray-200 py-4"></div>

      {/* Housekeeper Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Housekeeper Details</h3>
        <div className="space-y-3">
          <p className="text-gray-600"><strong>Name:</strong> {housekeeper.name}</p>
          <p className="text-gray-600"><strong>Category:</strong> {housekeeper.category}</p>
          <p className="text-gray-600"><strong>Location:</strong> {housekeeper.location}</p>
          <p className="text-gray-600"><strong>Experience:</strong> {housekeeper.experience} years</p>
          <p className="text-gray-600"><strong>Phone:</strong> {housekeeper.phone_number}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4"></div>

      {/* Hiring Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hiring Details</h3>
        <div className="space-y-3">
          <p className="text-gray-600"><strong>Start Date:</strong> {new Date(hiring.start_date).toLocaleDateString()}</p>
          <p className="text-gray-600"><strong>Salary Offer:</strong> ${hiring.salary_offer.toFixed(2)}</p>
          <p className="text-gray-600"><strong>Delivery Type:</strong> {hiring.delivery_type}</p>
          <p className="text-gray-600"><strong>Requirements:</strong> {hiring.requirements}</p>
          <p className="text-gray-600"><strong>Requested On:</strong> {new Date(hiring.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4"></div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 pt-12">
        {hiring.status === "COMPLETED" && (
          <button 
            className="bg-blue-600 text-black px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleWriteReview}
          >
            Write a Review
          </button>
        )}

        {hiring.status !== "COMPLETED" && (
          <button 
            className="bg-green-600 text-black px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => handleUpdateStatus("COMPLETED")}
          >
            Mark as Completed
          </button>
        )}

        {hiring.status === "PENDING" && (
          <>
            <button 
              className="bg-green-600 text-black px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => handleUpdateStatus("APPROVED")}
            >
              Approve Hiring
            </button>
            <button 
              className="bg-red-600 text-black px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
              onClick={() => handleUpdateStatus("REJECTED")}
            >
              Reject Hiring
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HiringStatus;
