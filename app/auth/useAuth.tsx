import React, { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    const userType = localStorage.getItem("userType");

    if (token && userInfo) {
      setUserToken(token);
      setUserInfo(JSON.parse(userInfo));
      setUserType(userType);
      setIsAuthenticated(true);
    }

    setIsLoading(false); 
  }, []); 

  return {
    isLoading,
    userToken,
    userInfo,
    userType,
    isAuthenticated,
  };
};

export default useAuth;
