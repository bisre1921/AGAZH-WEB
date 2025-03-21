"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#FAF3E0] text-[#333] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold text-[#B08968]">
          Agazh
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li>
            <Link href="/" className="hover:text-[#B08968] transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-[#B08968] transition">
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/auth/login"
              className="bg-[#E8C888] text-[#333] px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#D4AF7A] transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/RegisterHousekeeper"
              className="bg-[#E8C888] text-[#333] px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#D4AF7A] transition"
              onClick={() => setIsOpen(false)}
            >
              Register as Housekeeper
            </Link>
            <Link
              href="/auth/RegisterEmployer"
              className="bg-[#E8C888] text-[#333] px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#D4AF7A] transition"
              onClick={() => setIsOpen(false)}
            >
              Register as Employe
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-[#F0E5D8] py-6 space-y-6 text-lg font-medium">
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/auth/login"
              className="bg-[#E8C888] text-[#333] px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#D4AF7A] transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/RegisterHousekeeper"
              className="bg-[#E8C888] text-[#333] px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#D4AF7A] transition"
              onClick={() => setIsOpen(false)}
            >
              Register as Housekeeper
            </Link>
            <Link
              href="/auth/RegisterEmployer"
              className="bg-[#E8C888] text-[#333] px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#D4AF7A] transition"
              onClick={() => setIsOpen(false)}
            >
              Register as Employe
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
