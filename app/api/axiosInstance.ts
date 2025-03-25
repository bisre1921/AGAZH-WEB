import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); 
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

interface HousekeeperData {
  name: string;
  email: string;
  password: string;
  age: number;
  experience?: number;
  category: string; 
  employment_type: string; 
  skills?: string[];
  photoURL?: string;
  certifications?: string[];
  location: string;
  phone_number: string;
  rating?: number;
  reviews?: string[]; 
  isAvailable?: boolean;
}

interface EmployerData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
  familySize?: number;
}

export const registerHousekeeper = (data: HousekeeperData) => {
  return api.post("/auth/register/housekeeper", data);
}

export const registerEmployer = (data: EmployerData) => {
  return api.post("/auth/register/employer", data);
}

export const login = (email: string, password: string, user_type: string) => {
  return api.post("/auth/login", { email, password, user_type });
}

export const getHousekeepers = () => {
  return api.get("/housekeepers");
}

export const getHousekeeper = (id: string) => {
  return api.get(`/housekeepers/${id}`);
}

export const createHiring = (data: any) => {
  return api.post("/hiring", data);
}

export const getHiringStatus = (employer_id: string) => {
  return api.get(`/hiring/${employer_id}`);
}

export const updateHiringStatus = (id: string, data: any) => {
  return api.put(`/hiring/${id}`, data);
}

export const createReview = (data: any) => {
  return api.post("/ratings", data);
}

export const getHiringHistory = (employer_id: string) => {
  return api.get(`/hiring/employer/${employer_id}`);
}

export default api;
