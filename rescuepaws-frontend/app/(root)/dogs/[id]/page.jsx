"use client";

import { useState } from "react";
import Link from "next/link";
import ImageCart from "@/component/Cart/ImageCart";
import { useParams } from "next/navigation";
import { useDogs } from "@/hooks/useDogs";
import toast from "react-hot-toast";
import { deleteDog, pickupDog, updateDogStatus } from "@/services/dogService";

const statusOptions = ["REPORTED", "RESCUED"];

const statusBadge = {
  REPORTED: "badge-reported",
  RESCUED: "badge-rescued",
  PICKED_UP: "badge-adopted",
};

export default function DogDetailPage() {
  const { id } = useParams();
  const { data: dogs, isLoading } = useDogs();

  const filteredDog = dogs?.data?.find((dog) => dog.id === Number(id));

  const dog = {
    id: filteredDog?.id,
    name: filteredDog?.type,
    status: filteredDog?.status,
    reportedAt: filteredDog?.created_at,
    reportedBy: filteredDog?.reports?.[0]?.reporterName || "Anonymous",
    description: filteredDog?.description,
    location: filteredDog?.place,
    coordinates: {
      lat: filteredDog?.latitude,
      lng: filteredDog?.longitude,
    },
    emoji: "🐕",
    image: filteredDog?.images?.[0]?.imageUrl,
  };

  const [status, setStatus] = useState("REPORTED");
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleSave = async () => {
    try {
      await updateDogStatus(dog.id, status);
      toast.success("Dog status updated successfully 🐶");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Failed to update dog status");
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this report? ",
    );
    if (!confirm) return;

    try {
      await deleteDog(id);
      toast.success("Dog deleted successfully 🐶");
      setDeleted(true);
    } catch (error) {
      toast.error(error.message || "Failed to delete dog");
    }
  };

  const handlePickup = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to request pickup? 🚐",
    );

    if (!confirm) return;

    try {
      await pickupDog(id);
      toast.success("Pickup requested successfully 🚐");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Failed to request pickup");
    }
  };

  if (deleted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="card text-center p-10 max-w-sm mx-auto space-y-3">
          <p className="text-2xl">🗑️</p>
          <p className="text-ink-primary font-semibold">Report deleted.</p>
          <Link href="/dogs" className="btn-primary inline-block mt-2">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back */}
        <Link
          href="/dogs"
          className="inline-flex items-center gap-1.5 text-ink-secondary text-sm hover:text-ink-primary transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to listings
        </Link>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5">
          {/* Left column */}
          <div className="space-y-4">
            {/* Dog image card */}
            <div className="card overflow-hidden p-0 animate-slide-up">
              <div className="bg-navy-light h-52 flex items-center justify-center relative">
                {dog.image ? (
                  <ImageCart image={dog.image} />
                ) : (
                  <span className="text-8xl">{dog.emoji}</span>
                )}
                <span
                  className={`absolute bottom-3 right-3 ${statusBadge[dog.status] ?? "badge-reported"} text-xs`}
                >
                  {dog.status}
                </span>
              </div>

              <div className="p-5 space-y-3">
                {/* Title row */}
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-ink-primary text-xl font-semibold">
                    {dog.name}
                  </h1>
                  <span className={statusBadge[dog.status] ?? "badge-reported"}>
                    {dog.status}
                  </span>
                </div>

                <p className="text-ink-hint text-xs">
                  Dog ID: #{dog.id} · {dog.status} · {dog.reportedAt}
                </p>

                <p className="text-navy text-sm leading-relaxed">
                  {dog.description}
                </p>

                {/* Info grid */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { label: "Breed", value: dog.breed },
                    { label: "Status", value: dog.status },
                    { label: "Location", value: dog.location },
                    { label: "Reported by", value: dog.reportedBy },
                    { label: "Reported", value: dog.reportedAt },
                    {
                      label: "Coordinates",
                      value: dog.coordinates
                        ? `${dog.coordinates.lat}, ${dog.coordinates.lng}`
                        : "Unknown",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-surface rounded-xl border border-border px-3 py-2.5 space-y-0.5"
                    >
                      <p className="text-ink-hint text-[10px] font-medium uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-ink-primary text-xs font-semibold leading-snug">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location map card */}
            <div
              className="card overflow-hidden p-0 animate-slide-up"
              style={{ animationDelay: "80ms" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-ink-primary text-sm font-semibold">
                    Location map
                  </span>
                </div>
                <span className="text-ink-secondary text-xs">
                  {dog.location}, LK
                </span>
              </div>

              {/* Static map */}
              <div className="relative h-44 bg-[#dce8f0] overflow-hidden">
                {/* Grid lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="30"
                      height="30"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 30 0 L 0 0 0 30"
                        fill="none"
                        stroke="#7aaabf"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Roads */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="#b8cdd8"
                    strokeWidth="8"
                  />
                  <line
                    x1="40%"
                    y1="0"
                    x2="40%"
                    y2="100%"
                    stroke="#b8cdd8"
                    strokeWidth="6"
                  />
                  <line
                    x1="70%"
                    y1="0"
                    x2="70%"
                    y2="100%"
                    stroke="#c8d8e4"
                    strokeWidth="4"
                  />
                  <line
                    x1="0"
                    y1="30%"
                    x2="100%"
                    y2="30%"
                    stroke="#c8d8e4"
                    strokeWidth="3"
                  />
                  <line
                    x1="0"
                    y1="75%"
                    x2="100%"
                    y2="75%"
                    stroke="#c8d8e4"
                    strokeWidth="3"
                  />
                </svg>

                {/* Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="w-8 h-8 bg-navy rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>

                {/* Coordinates label */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] text-ink-secondary font-medium border border-border whitespace-nowrap">
                  {dog.coordinates
                    ? `${dog.coordinates.lat}, ${dog.coordinates.lng}`
                    : "Unknown"}
                </div>
              </div>

              {/* Footer — Directions button */}
              <div className="px-4 py-3 border-t border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-ink-hint"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-ink-hint text-xs">
                    Opens Google Maps
                  </span>
                </div>

                <button
                  onClick={() => {
                    const lat = dog.coordinates.lat;
                    const lng = dog.coordinates.lng;
                    const label = encodeURIComponent(dog.location);
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${label}&travelmode=driving`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  }}
                  className="btn-primary flex items-center gap-2 text-xs px-4 py-2"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.71 11.29l-9-9a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                  </svg>
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Actions */}
            <div
              className="card space-y-2.5 animate-slide-up"
              style={{ animationDelay: "40ms" }}
            >
              <p className="text-ink-primary text-sm font-semibold">Actions</p>
              <button
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={() => handlePickup(dog.id)}
              >
                <span>🚐</span> Request Pickup
              </button>
              <button className="btn-outline w-full flex items-center justify-center gap-2">
                <span>↗</span> Share Report
              </button>
            </div>

            {/* Admin actions */}
            <div
              className="card space-y-3 animate-slide-up"
              style={{ animationDelay: "80ms" }}
            >
              <p className="text-ink-primary text-sm font-semibold">
                Admin actions
              </p>

              <div>
                <p className="text-ink-hint text-[10px] font-medium uppercase tracking-wide mb-1.5">
                  Update status
                </p>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-input text-xs uppercase font-semibold"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={dog.status === "PICKED_UP"}
                className={`w-full rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-150 shadow-sm
      ${dog.status === "PICKED_UP" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-rescued-text text-white hover:opacity-90 active:scale-95"}`}
              >
                {saved ? "✓ Saved!" : "Save Status"}
              </button>

              <button
                onClick={() => {
                  handleDelete(dog.id);
                }}
                className="w-full bg-reported-bg text-reported-text border border-reported-border rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-red-100 active:scale-95 transition-all duration-150"
              >
                Delete Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
