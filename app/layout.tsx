"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NavBar from "./components/NavBar";
import useAuth from "./auth/useAuth";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader";
import { MantineProvider } from "@mantine/core";

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, userType } = useAuth();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (isLoading) {
      <Loader />; 
    }
    if (!redirected && !isLoading) {
      if (!isAuthenticated) {
        router.replace("/auth/login");
      } else {
        router.replace(userType === "housekeeper" ? "/BrowseHousekeepers" : "/BrowseHousekeepers");
      }
      setRedirected(true); 
    }
  }, [isAuthenticated, isLoading, userType, router, redirected]);



  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <NavBar />
          <MantineProvider theme={{}} defaultColorScheme="light">
            {children}
          </MantineProvider>
        </body>
      </html>
    </Provider>
  );
}
