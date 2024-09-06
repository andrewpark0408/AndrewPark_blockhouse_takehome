"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white mb-6">
          Andrew Park&apos;s Takehome Project
        </h1>
        <p className="text-xl text-gray-200 mb-12">
          Enter to see the interactive dashboard
        </p>
        <button
          onClick={navigateToDashboard}
          className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
