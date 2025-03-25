"use client"

import React, { useEffect, useState } from 'react';
import { getHiringHistory } from '../api/axiosInstance';
import { FaCalendarAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';

interface Hiring {
  id: string;
  housekeeperName: string;
  start_date: string;
  salary_offer: number;
  created_at: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
}

interface UserInfo {
  user_id: string;
  exp: string;
  user_type: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-500';
    case 'APPROVED':
      return 'bg-green-500';
    case 'REJECTED':
      return 'bg-red-500';
    case 'COMPLETED':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

const HiringHistory = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [hirings, setHirings] = useState<Hiring[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  const fetchHiringHistory = async () => {
    if (!userInfo?.user_id) return;
    try {
      setLoading(true);
      const response = await getHiringHistory(userInfo.user_id);
      setHirings(response.data);
    } catch (error) {
      console.error('Error fetching hiring history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHiringHistory();
  }, [userInfo?.user_id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hiring History</h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : hirings.length === 0 ? (
        <div className="flex flex-col items-center text-gray-600">
          <FaClock className="text-6xl text-gray-400 mb-4" />
          <p className="text-lg font-semibold">No hiring history found</p>
          <p className="text-sm">Your hiring requests will appear here</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          {hirings.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-5 mb-4">
             
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{item.housekeeperName}</h2>
                <span
                  className={`text-white text-sm font-bold px-3 py-1 rounded ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span>Start Date: {new Date(item.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-gray-500 mr-2" />
                  <span>Salary: ${item.salary_offer?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-gray-500 mr-2" />
                  <span>Requested: {new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HiringHistory;
