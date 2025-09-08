"use client";

import { useState } from "react";
import Image from "next/image";

export default function RegistrationForm({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showCheckIn, setShowCheckIn] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");

    if (showCheckIn) {
      try {
        const res = await fetch("/api/checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, eventId }),
        });

        const data = await res.json();
        if (res.ok) {
          setMessage("You've successfully checked in! ✅");
        } else {
          setMessage(data.error || "Check-in failed. Please try again.");
        }
      } catch (err) {
        setMessage("Server error during check-in. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, eventId }),
        });

        const data = await res.json();
        if (res.ok) {
          setMessage(data.message || "Registration successful! 🎉");
        } else {
          setMessage(data.error || "Registration failed. Please try again.");
        }
      } catch (err) {
        setMessage("Server error during registration. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  const toggleFormMode = () => {
    setShowCheckIn(!showCheckIn);
    setMessage("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-500 to-blue-500 p-4 relative overflow-hidden">
      {/* The background image will cover the entire screen */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Placeholder for the agricultural technology image */}
        <Image
          src="/images/tractor.jpg"
          alt="Agricultural Technology"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Main content container with text and form */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-12">
        {/* Left section with event details */}
        <div className="text-center md:text-left text-white space-y-4 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Welcome to the 8th World Congress on Rural and Agricultural Finance
          </h1>
          <p className="text-lg md:text-xl font-light">
            [cite_start]Pathways Technologies is a technology partner committed to enhancing your event experience through technology and digital solutions[cite: 16].
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <div className="flex items-center space-x-2 text-yellow-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Real-time Schedules</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Networking Features</span>
            </div>
          </div>
        </div>

        {/* Right section with the form */}
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {showCheckIn ? "Event Check-in" : "Event Registration"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!showCheckIn && (
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-4 focus:ring-purple-400 transition duration-200"
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-4 focus:ring-purple-400 transition duration-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 font-extrabold text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (showCheckIn ? "Checking In..." : "Registering...") : (showCheckIn ? "Check In" : "Register Now")}
            </button>
          </form>

          {message && (
            <p className={`text-center mt-6 font-semibold text-lg ${message.includes("successful") || message.includes("You've successfully") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className="mt-8 text-center text-gray-700">
            <p className="text-md">
              {showCheckIn ? "New to the event?" : "Already registered?"}
              <button
                onClick={toggleFormMode}
                className="text-purple-600 hover:underline ml-2 font-bold focus:outline-none"
              >
                {showCheckIn ? "Register here" : "Check in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}