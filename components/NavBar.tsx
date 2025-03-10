"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname for current path

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  // Function to dynamically set active link styles
  const getLinkClass = (path: string) =>
    pathname === path
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500";

  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/services" className={getLinkClass("/services")}>
            Services
          </Link>
          <Link href="/shop" className={getLinkClass("/shop")}>
            Shop
          </Link>
          <Link href="/news" className={getLinkClass("/news")}>
            News
          </Link>
        </div>

        <div className="flex flex-row gap-5">
          {/* Appointment Button */}
          <Link
            href="/appointment"
            className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Appointment
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link href="/services" className={getLinkClass("/services")}>
            Services
          </Link>
          <Link href="/pages" className={getLinkClass("/pages")}>
            Pages
          </Link>
          <Link href="/shop" className={getLinkClass("/shop")}>
            Shop
          </Link>
          <Link href="/news" className={getLinkClass("/news")}>
            News
          </Link>
          <Link
            href="/appointment"
            className="block w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Appointment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
