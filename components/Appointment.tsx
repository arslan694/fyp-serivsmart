"use client";

import React, { useState } from "react";
import heroImage from "../public/images/appointment_hero.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const Appointment = () => {
  const router = useRouter(); // Initialize useRouter
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [extraFeatures, setExtraFeatures] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleMake: "",
    vehicleName: "",
    vehicleModel: "",
    date: "",
    timeSlot: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Mock function to check if the user is logged in
  const isLoggedIn = () => {
    const userEmail = sessionStorage.getItem("userEmail"); // Assuming user email is stored in sessionStorage
    return userEmail !== null; // Return true if email exists
  };

  const pricingOptions = {
    "Sedan Car": {
      prices: [500, 1000, 2000],
      times: ["20 Minutes", "40 Minutes", "1h 20 Minutes"],
    },
    "Minivan Car": {
      prices: [700, 1200, 2500],
      times: ["30 Minutes", "50 Minutes", "1h 30 Minutes"],
    },
    Microbus: {
      prices: [1000, 1500, 2800],
      times: ["40 Minutes", "1h", "1h 40 Minutes"],
    },
    "SUV Car": {
      prices: [700, 1200, 2500],
      times: ["30 Minutes", "50 Minutes", "1h 30 Minutes"],
    },
    "Mid Size SUV": {
      prices: [800, 1300, 2400],
      times: ["40 Minutes", "1h", "1h 30 Minutes"],
    },
    "Full Size SUV": {
      prices: [1000, 1500, 2800],
      times: ["50 Minutes", "1h 20 Minutes", "2h"],
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleSelect = (type: string) => {
    setSelectedVehicle(type);
    setSelectedPlan(null); // Reset selected plan when vehicle type changes
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const toggleExtraFeature = (feature: string) => {
    if (extraFeatures.includes(feature)) {
      setExtraFeatures(extraFeatures.filter((f) => f !== feature));
    } else {
      setExtraFeatures([...extraFeatures, feature]);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 21; hour++) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour > 12 ? hour - 12 : hour;
      slots.push(`${formattedHour}:00 ${period}`);
      slots.push(`${formattedHour}:30 ${period}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleInputChangeTwo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userEmail = sessionStorage.getItem("userEmail");

    if (!userEmail) {
      toast.error("Please log in to confirm your booking.");
      router.push("/login"); // Redirect to login page
      return;
    }

    if (!selectedVehicle || !selectedPlan || !formData.timeSlot) {
      setResponseMessage(
        "Please select a vehicle type, pricing plan, and time slot."
      );
      toast.error("Please select a vehicle type, pricing plan, and time slot.");
      return;
    }

    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: userEmail, // Include user email in the booking data
          selectedVehicle,
          selectedPlan,
          extraFeatures,
        }),
      });

      if (response.ok) {
        setResponseMessage("Booking confirmed!");
        toast.success("Booking confirmed!");
        setFormData({
          name: "",
          phone: "",
          vehicleMake: "",
          vehicleName: "",
          vehicleModel: "",
          date: "",
          timeSlot: "",
          comment: "",
        });
        setSelectedVehicle(null);
        setSelectedPlan(null);
        setExtraFeatures([]);
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "Unable to confirm booking."}`
        );
        toast.error(
          `Error: ${errorData.message || "Unable to confirm booking."}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error occurred while submitting the form.");
      toast.error("Error occurred while submitting the form.");
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
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Select Vehicle Type
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Object.keys(pricingOptions).map((type) => (
            <button
              key={type}
              className={`p-4 border rounded-md text-center text-sm md:text-base ${
                selectedVehicle === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
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
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Select Pricing Plan
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {selectedVehicle &&
            pricingOptions[selectedVehicle].prices.map((price, index) => (
              <button
                key={index}
                className={`p-4 border rounded-md text-center text-sm md:text-base ${
                  selectedPlan === price.toString()
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handlePlanSelect(price.toString())}
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
                  {pricingOptions[selectedVehicle].times[index]}
                </p>
              </button>
            ))}
        </div>
      </div>

      {/* Extra Features Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Choose Extra Features
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            "Tire Shine",
            "Express Interior",
            "Interior Vacuum",
            "Dashboard Polish & Clean",
            "Engine Wash",
          ].map((feature) => (
            <button
              key={feature}
              className={`p-4 border rounded-md text-center text-sm md:text-base ${
                extraFeatures.includes(feature)
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => toggleExtraFeature(feature)}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Details Form */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Enter Your Details
        </h2>
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
              type="text"
              name="vehicleName"
              placeholder="Your Vehicle Name"
              value={formData.vehicleName}
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

            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChangeTwo}
              className="p-2 border rounded-md w-full text-sm md:text-base"
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
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
          <p className="mt-4 text-center text-sm text-red-600">
            {responseMessage}
          </p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Appointment;
