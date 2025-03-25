"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "../api/axiosInstance";

interface UserInfo {
  user_id: string;
  exp: string;
  user_type: string;
}

const WriteReview = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const housekeeperId = searchParams.get("housekeeperId") || "Unknown";
  const housekeeperName = searchParams.get("housekeeperName") || "Unnamed Housekeeper";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  const handleSubmitReview = async () => {
    if (!rating) {
      alert("Please rate your experience");
      return;
    }

    if (!userInfo?.user_id) {
      alert("User information is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const reviewData = {
        employerID: userInfo.user_id,
        housekeeperID: housekeeperId,
        rating,
        comment,
      };

      await createReview(reviewData);
      alert("Review submitted successfully");
      router.back();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg space-y-6">
     
      <h1 className="text-2xl font-semibold text-gray-800 text-center">Write a Review</h1>
      <h2 className="text-lg text-gray-600 text-center">For {housekeeperName}</h2>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 text-lg font-medium text-center">
          How would you rate your experience with {housekeeperName}?
        </p>
        <div className="flex justify-center mt-3 space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-3xl transition duration-300 ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <label htmlFor="comment" className="text-gray-700 text-lg font-medium block">
          Your Review:
        </label>
        <textarea
          id="comment"
          className="w-full h-28 p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          placeholder="Write your feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        disabled={loading}
        onClick={handleSubmitReview}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default WriteReview;
