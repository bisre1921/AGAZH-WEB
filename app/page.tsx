"use client";

import AuthPage from "./pages/AuthPage"; 
import "./globals.css";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Agazh</h1>
      <AuthPage />
    </div>
  );
}
