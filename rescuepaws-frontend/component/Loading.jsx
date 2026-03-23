// app/loading.jsx
"use client";

export default function Loading({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      
      {/* Loading message */}
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  );
}