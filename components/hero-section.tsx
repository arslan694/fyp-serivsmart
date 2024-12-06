'use client'
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const images = [
    "/images/hero1.jpg",
    "/images/hero3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the image every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // 1 second duration

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  // Handle manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
      {/* Images */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-50">
          <div className="text-white space-y-4 px-4">
            <h2 className="text-5xl md:text-4xl  font-extrabold">Welcome to ServisMART</h2>
            <p className="text-2xl font-semibold">Premium Quality Carwash</p>
            <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
