"use client";

import { useState } from "react";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { mutate, isPending } = useRegister();

  const [form, setForm] = useState({
    username: "",
    role: "user",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: simple client-side validation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    mutate(form); // call the register API
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-navy-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PawPrint size={26} color="white" />
          </div>
          <h1 className="text-xl font-semibold text-[#1A2E42]">Create an account</h1>
          <p className="text-sm text-[#6B8499] mt-1">
            Join RescuePaws and help save dogs
          </p>
        </div>

        {/* Card / Form */}
        <form onSubmit={handleSubmit} className="card space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="username"
              className="form-input"
              placeholder="Ashan Silva"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-input"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn-primary w-full py-3 text-sm"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-[#6B8499] mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-navy-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}