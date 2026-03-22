"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dogs", href: "/dogs" },
  { label: "Report Dog", href: "/dogs/report-dog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!token);
  }, []);

  //  logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-navy-600 rounded-lg flex items-center justify-center text-white">
            🐾
          </div>
          <span className="text-lg font-semibold text-navy-dark">
            RescuePaws
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`transition-colors ${active === link.label
                  ? "text-navy-600"
                  : "text-gray-600 hover:text-navy-600"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-navy-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-navy-600 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-navy-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Profile Icon */}
              {/* <div className="w-9 h-9 bg-navy-600 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold shadow-sm">
                U
              </div> */}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-navy text-white px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                setActive(link.label);
                setMenuOpen(false);
              }}
              className="text-gray-700 hover:text-navy-600"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 px-4 py-2 rounded-lg border border-gray-200 text-center hover:bg-gray-100 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-navy-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-navy-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-navy-600 rounded-full flex items-center justify-center text-white text-sm">
                    U
                  </div>
                  <span className="text-sm text-gray-700">Profile</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}