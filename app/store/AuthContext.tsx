"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, {login} from "@/app/api/axiosInstance"; 

interface AuthContextType {
  isLoading: boolean;
  userToken: string | null;
  userInfo: any;
  loginAuth: (email: string, password: string, userType: string) => Promise<void>;
  logoutAuth: () => void;
  isAuthenticated: boolean;
  userType: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  userToken: null,
  userInfo: null,
  loginAuth: async () => {},
  logoutAuth: () => {},
  isAuthenticated: false,
  userType: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem("token");
        const storedUserType = localStorage.getItem("userType");
        const storedUserInfo = localStorage.getItem("userInfo");

        if (token && storedUserInfo) {
          setUserToken(token);
          setUserInfo(JSON.parse(storedUserInfo));
          setUserType(storedUserType);
        }
      } catch (error) {
        console.error("Error loading user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const loginAuth = async (email: string, password: string, userType: string) => {
    try {
      setIsLoading(true);
      console.log("something here")
      const response = await login(email, password, userType);
  
      console.log("Login response:", response.data);
  
      if (response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", userType);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
  
        setUserToken(response.data.token);
        setUserInfo(response.data.user);
        setUserType(userType);
  
        console.log("Token stored successfully in localStorage");
        
        if (userType === "housekeeper") {
          router.push("/dashboard/housekeeper");
        } else {
          router.push("/dashboard/employer");
        }
      } else {
        console.error("Missing token or user info in API response");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  

  const logoutAuth = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userInfo");

    setUserToken(null);
    setUserInfo(null);
    setUserType(null);

    router.push("/auth/login"); 
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        loginAuth,
        logoutAuth,
        isAuthenticated: !!userToken,
        userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
