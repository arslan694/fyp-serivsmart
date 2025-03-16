"use client";
import { useEffect, useState } from "react";

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api"); // Update with actual API endpoint
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(appointments.length / recordsPerPage);

  // Get records for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = appointments.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Vehicle Make</th>
            <th className="py-2 px-4 border-b">Vehicle Name</th>
            <th className="py-2 px-4 border-b">Vehicle Model</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time Slot</th>
            <th className="py-2 px-4 border-b">Comment</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Selected Vehicle</th>
            <th className="py-2 px-4 border-b">Selected Plan</th>
            <th className="py-2 px-4 border-b">Extra Features</th>
            <th className="py-2 px-4 border-b">Engine Wash</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((appointment) => (
            <tr key={appointment._id}>
              <td className="py-2 px-4 border-b">{appointment.name}</td>
              <td className="py-2 px-4 border-b">{appointment.phone}</td>
              <td className="py-2 px-4 border-b">{appointment.vehicleMake}</td>
              <td className="py-2 px-4 border-b">{appointment.vehicleName}</td>
              <td className="py-2 px-4 border-b">{appointment.vehicleModel}</td>
              <td className="py-2 px-4 border-b">{appointment.date}</td>
              <td className="py-2 px-4 border-b">{appointment.slot}</td>
              <td className="py-2 px-4 border-b">{appointment.comment}</td>
              <td className="py-2 px-4 border-b">{appointment.email}</td>
              <td className="py-2 px-4 border-b">{appointment.selectedVehicle}</td>
              <td className="py-2 px-4 border-b">{appointment.selectedPlan}</td>
              <td className="py-2 px-4 border-b">{appointment.extraFeatures?.join(", ")}</td>
              <td className="py-2 px-4 border-b">{appointment.engineWash ? "Yes" : "No"}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Done</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded mx-2 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded">Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded mx-2 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentsTable;
