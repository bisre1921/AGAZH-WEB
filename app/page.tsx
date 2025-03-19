"use client";

import AuthPage from "./pages/AuthPage"; 
import "./globals.css";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <div>
      <HomePage />
      <AuthPage />
    </div>
  );
}
