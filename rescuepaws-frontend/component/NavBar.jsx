"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dogs", href: "/dogs" },
  { label: "Report Dog", href: "/report-dog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

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
                className={`transition-colors ${
                  active === link.label
                    ? "text-navy-600"
                    : "text-gray-600 hover:text-navy-600"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-navy-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-navy-600 text-navy-dark text-sm px-4 py-2 rounded-lg hover:bg-navy-700 transition"
          >
            Register
          </Link>
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
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-navy-600"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-navy-600 text-white text-sm px-4 py-2 rounded-lg text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}