"use client";
import Image from "next/image";

const HomePage = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="/images/home-bg.jpg" 
          alt="Home Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* <h1 className="text-6xl font-extrabold tracking-wide mb-6 text-yellow-400">
          AGAZH
        </h1> */}
        <p className="text-lg text-gray-300 leading-relaxed">
          A platform to hire housekeepers and for housekeepers to find jobs.  
          Connecting families with trusted domestic workers in an easy and secure way.
        </p>
        <div className="flex justify-center gap-6 mt-8">
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-yellow-500 transition">
            Hire a Housekeeper
          </button>
          <button className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-gray-900 transition">
            Find a Job
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
