// Appointment.js
'use client'

import React, { useState } from "react";
import heroImage from "../public/images/appointment_hero.png";

const Appointment = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [extraFeatures, setExtraFeatures] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    date: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle vehicle selection
  const handleVehicleSelect = (type: string) => {
    setSelectedVehicle(type);
  };

  // Handle plan selection
  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  // Handle extra feature selection
  const toggleExtraFeature = (feature: string) => {
    if (extraFeatures.includes(feature)) {
      setExtraFeatures(extraFeatures.filter((f) => f !== feature));
    } else {
      setExtraFeatures([...extraFeatures, feature]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedVehicle || !selectedPlan) {
      setResponseMessage("Please select a vehicle type and pricing plan.");
      return;
    }
  
    setIsSubmitting(true);
    setResponseMessage("");
  
    try {
      const response = await fetch("/api", { // Adjusted to the correct API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedVehicle,
          selectedPlan,
          extraFeatures,
        }),
      });
  
      if (response.ok) {
        setResponseMessage("Booking confirmed!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          vehicleMake: "",
          vehicleModel: "",
          date: "",
          comment: "",
        });
        setSelectedVehicle(null);
        setSelectedPlan(null);
        setExtraFeatures([]);
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.message || "Unable to confirm booking."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage('Error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="py-8 px-4 md:px-16">
      <section className="h-[300px] w-full flex items-center justify-center">
        <img
          src={heroImage.src}
          alt="Hero Image"
          className="object-cover"
          style={{
            width: "45%",
            height: "auto",
          }}
        />
      </section>

      {/* Vehicle Type Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Select Vehicle Type</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {["Sedan Car", "Minivan Car", "Microbus", "SUV Car"].map((type) => (
            <button
              key={type}
              className={`p-4 border rounded-md text-center text-sm md:text-base ${
                selectedVehicle === type ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => handleVehicleSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Plan Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Select Pricing Plan</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {["500", "1000", "2000"].map((price, index) => (
            <button
              key={index}
              className={`p-4 border rounded-md text-center text-sm md:text-base ${
                selectedPlan === price ? "bg-orange-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => handlePlanSelect(price)}
            >
              <h3 className="font-semibold">
                {index === 0
                  ? "Basic Wash"
                  : index === 1
                  ? "Full Wash"
                  : "General Wash"}
              </h3>
              <p className="text-lg font-bold">{price}</p>
              <p className="text-sm text-gray-500">
                {index === 0
                  ? "20 Minutes"
                  : index === 1
                  ? "40 Minutes"
                  : "1h 20 Minutes"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Extra Features Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Choose Extra Features</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {["Tire Shine", "Express Interior", "Interior Vacuum", "Dashboard Polish & Clean", "Engine Wash"].map(
            (feature) => (
              <button
                key={feature}
                className={`p-4 border rounded-md text-center text-sm md:text-base ${
                  extraFeatures.includes(feature) ? "bg-orange-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => toggleExtraFeature(feature)}
              >
                {feature}
              </button>
            )
          )}
        </div>
      </div>

      {/* Booking Details Form */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Enter Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full text-sm md:text-base"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full text-sm md:text-base"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full text-sm md:text-base"
            />
            <input
              type="text"
              name="vehicleMake"
              placeholder="Vehicle Make"
              value={formData.vehicleMake}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full text-sm md:text-base"
            />
            <input
              type="text"
              name="vehicleModel"
              placeholder="Vehicle Model"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full text-sm md:text-base"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full text-sm md:text-base"
            />
          </div>
          <textarea
            name="comment"
            placeholder="Write Comment"
            value={formData.comment}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full text-sm md:text-base"
          />
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
        {responseMessage && (
          <p className="mt-4 text-center text-sm text-red-600">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Appointment;
