"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import heroImage from '../public/images/services-hero-bg.png';

const fetchServices = async (page = 1, limit = 6) => {
  try {
    const response = await fetch(`/api/services?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return { services: [], totalPages: 0 };
  }
};

const Services = () => {
  const [services, setServices] = useState([]); // State to store services
  const [page, setPage] = useState(1); // State to manage pagination
  const [totalPages, setTotalPages] = useState(1); // State to store total pages
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch services when the component mounts or the page changes
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      const data = await fetchServices(page);

      // Reset services if page is 1 (initial load)
      if (page === 1) {
        setServices(data.services); // Replace existing services
      } else {
        setServices((prevServices) => [...prevServices, ...data.services]); // Append new services
      }

      setTotalPages(data.totalPages);
      setLoading(false);
    };

    loadServices();
  }, [page]);

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-[500px] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage.src})`,
        }}
      >
        {/* Hero content */}
      </section>

      {/* Services Cards Section */}
      <section className="px-6 py-10 md:px-20">
        <h1 className="text-4xl font-bold text-orange-500 mb-3">Services</h1>
        {loading && services.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="border rounded-lg shadow-md bg-white">
                <Image
                  src={service.banner.base64} // Use the base64 image from the database
                  alt={service.name}
                  className="rounded-t-lg"
                  width={400}
                  height={200}
                />
                <div className="p-4 text-center">
                  <h3 className="text-[#173049] text-lg font-bold">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    {service.description}
                  </p>
                  <button className="mt-4 text-[#173049] bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                    →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {page < totalPages && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Services;