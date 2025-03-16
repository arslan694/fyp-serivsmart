"use client";
import React, { useEffect, useState } from "react";
import ServicesTable from "../components/serviceTable";
import AppointmentsTable from "../components/AppointmentsTable";
import CompletedTable from "../components/CompletedTable";

const AdminDashboard = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Oil Change",
      description: "Regular oil change service",
      icon: "oil-change-icon.png",
      banner: "oil-change-banner.jpg",
    },
    // Add more services here
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      vehicleMake: "Toyota",
      vehicleName: "Camry",
      vehicleModel: "2020",
      date: "2023-10-15",
      timeSlot: "10:00 AM",
      comment: "Regular maintenance",
      email: "john@example.com",
      selectedVehicle: "Toyota Camry",
      selectedPlan: "Basic",
      extraFeatures: "Interior Cleaning",
      engineWash: true,
    },
    // Add more appointments here
  ]);

  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      try {
        const response = await fetch("/api/completedAppointments");
        if (response.ok) {
          const data = await response.json();
          setCompletedAppointments(data);
        }
      } catch (error) {
        console.error("Error fetching completed appointments:", error);
      }
    };

    fetchCompletedAppointments();
  }, []);

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleEditService = (id, updatedService) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...updatedService } : service
      )
    );
  };

  const handleMarkAsDone = async (id) => {
    const appointment = appointments.find((app) => app.id === id);
    if (!appointment) return;

    try {
      const response = await fetch("/api/completedAppointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        // Remove from active appointments and add to completed locally
        setCompletedAppointments([...completedAppointments, appointment]);
        setAppointments(appointments.filter((app) => app.id !== id));
      } else {
        console.error("Failed to mark as done:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <ServicesTable
          services={services}
          onDelete={handleDeleteService}
          onEdit={handleEditService}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>
        <AppointmentsTable
          appointments={appointments}
          onMarkAsDone={handleMarkAsDone}
          onDelete={handleDeleteAppointment}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Completed Appointments</h2>
        <CompletedTable completedAppointments={completedAppointments} />
      </div>
    </div>
  );
};

export default AdminDashboard;