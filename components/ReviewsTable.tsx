"use client";
import { useEffect, useState } from "react";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews"); // Fetch reviews from API
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / recordsPerPage);

  // Get records for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = reviews.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-green-500 to-green-600">
            <tr>
              <th className="py-3 px-6 text-left text-white font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 text-left text-white font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left text-white font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-6 text-left text-white font-semibold uppercase tracking-wider">
                Vehicle Name
              </th>
              <th className="py-3 px-6 text-left text-white font-semibold uppercase tracking-wider">
                Review
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRecords.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-700">{review.name}</td>
                <td className="py-4 px-6 text-gray-700">{review.email}</td>
                <td className="py-4 px-6 text-gray-700">{review.date}</td>
                <td className="py-4 px-6 text-gray-700">{review.vehicleName}</td>
                <td className="py-4 px-6 text-gray-700">{review.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all mx-2 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded-lg shadow-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all mx-2 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsTable;