"use client";
import Image from "next/image";
import HousekeeperImage from "../../public/assets/house_keeper_image.png";

const HomePage = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-[#F9F6F1] text-[#333] px-6 md:px-20 pt-24">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={HousekeeperImage}
          alt="Housekeeper"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      {/* Right Section - Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-[#B08968]">
          AGAZH
        </h1>
        <p className="text-lg text-[#555] leading-relaxed">
          A platform to hire housekeepers and for housekeepers to find jobs.  
          Connecting families with trusted domestic workers in an easy and secure way.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-6">
          <button className="bg-[#E8C888] text-[#333] px-6 py-3 rounded-full font-bold text-lg shadow-md hover:bg-[#D4AF7A] transition">
            Hire a Housekeeper
          </button>
          <button className="border border-[#E8C888] text-[#E8C888] px-6 py-3 rounded-full font-bold text-lg hover:bg-[#E8C888] hover:text-[#333] transition">
            Find a Job
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
