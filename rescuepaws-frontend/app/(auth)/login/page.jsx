"use client";

import { useState } from "react";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const { mutate, isPending } = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form); 
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-navy-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PawPrint size={26} color="white" />
          </div>
          <h1 className="text-xl font-semibold text-[#1A2E42]">Welcome back</h1>
          <p className="text-sm text-[#6B8499] mt-1">
            Sign in to your RescuePaws account
          </p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="card space-y-4">
          
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="form-label mb-0">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-navy-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
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
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-[#6B8499] mt-5">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-navy-600 font-medium hover:underline"
          >
            Register free
          </Link>
        </p>
      </div>
    </div>
  );
}