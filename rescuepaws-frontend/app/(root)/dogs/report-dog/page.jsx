/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ageOptions, genderOptions, submissionGuide } from "@/constants/Other";
import Navbar from "@/component/NavBar";
import toast from "react-hot-toast";
import { reportDog } from "@/services/dogService";

export default function ReportDogPage() {
  // ── States ──
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [age, setAge] = useState("Adult (3–7yr)");
  const [gender, setGender] = useState("Unknown");
  const [photos, setPhotos] = useState([]);
  const [coords, setCoords] = useState(null);
  const [manualLoc, setManualLoc] = useState(false);
  const [manualAddr, setManualAddr] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const status = "REPORTED";

  // ── GPS auto-detect ──
  useEffect(() => {
    if (!navigator.geolocation)
      return setLocError("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCoords({ lat, lng, accuracy: Math.round(pos.coords.accuracy) });
      },
      () => setLocError("Location access denied."),
      { enableHighAccuracy: true },
    );
  }, []);

  // ── Photo handlers ──
  const handlePhotos = (e) => {
    const files = Array.from(e.target.files).slice(0, 2);
    setPhotos(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 5);
    setPhotos(files);
  };

  // ── Submit ──
  const handleSubmit = async () => {
    if (!type) return alert("Please enter the dog type.");
    setLoading(true);

    const payload = {
      type,
      description,
      place: manualLoc
        ? manualAddr
        : coords
          ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
          : "",
      latitude: coords?.lat,
      longitude: coords?.lng,
      status,
      age,
      gender,
    };

    try {
      const res = await reportDog({
        ...payload,
        images: photos,
      });

      console.log("---------------------------", res);
      if (!res.success) throw new Error(res.message);

      toast.success("Report submitted successfully!");
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1400);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="card max-w-sm w-full text-center space-y-4 py-10 animate-slide-up">
          <div className="text-5xl">🐾</div>
          <h2 className="text-ink-primary text-lg font-semibold">
            Report submitted!
          </h2>
          <p className="text-ink-secondary text-sm">
            Thank you. Our team will review your report and dispatch help
            shortly.
          </p>
          <Link href="/dogs" className="btn-primary inline-block mt-2">
            View all dogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <div className="bg-navy px-6 py-6">
        <h1 className="text-white text-xl font-semibold">Report a Stray Dog</h1>
        <p className="text-navy-light/70 text-sm mt-0.5">
          Fill in the details below to submit a rescue report.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Dog Info + Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4">
          {/* Dog Info */}
          <div className="card space-y-4 animate-slide-up">
            <h2 className="text-ink-primary text-sm font-semibold">
              Dog information
            </h2>

            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-ink-secondary text-xs font-medium">
                Dog type <span className="text-red-400">*</span>
              </label>
              <input
                className="form-input"
                placeholder="e.g. Golden Retriever, Mixed Breed"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-ink-secondary text-xs font-medium">
                  Age range
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ageOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAge(opt)}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                        age === opt
                          ? "bg-navy text-white border-navy"
                          : "bg-surface text-ink-secondary border-border hover:border-navy-light"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-ink-secondary text-xs font-medium">
                  Gender
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {genderOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setGender(opt)}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                        gender === opt
                          ? "bg-navy text-white border-navy"
                          : "bg-surface text-ink-secondary border-border hover:border-navy-light"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* place */}
            <div className="space-y-1.5">
              <label className="text-ink-secondary text-xs font-medium">
                Dog Loacation <span className="text-red-400">*</span>
              </label>
              <input
                className="form-input"
                placeholder="e.g. Nearby Viharamahadevi Park"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-ink-secondary text-xs font-medium">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={4}
                className="form-input resize-none"
                placeholder="Describe the dog's condition, behavior, any injuries..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Submission Guide */}
          <div className="space-y-4">
            <div
              className="card animate-slide-up"
              style={{ animationDelay: "40ms" }}
            >
              <h2 className="text-ink-primary text-sm font-semibold mb-3">
                Submission guide
              </h2>
              <ul className="space-y-2">
                {submissionGuide.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <svg
                      className="w-3.5 h-3.5 text-rescued-text mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-ink-secondary text-xs leading-snug">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div
          className="card animate-slide-up space-y-3"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-ink-primary text-sm font-semibold">
              Location — GPS auto-detect
            </h2>
            {coords && (
              <span className="text-[10px] text-rescued-text bg-rescued-bg border border-rescued-border px-2 py-0.5 rounded-full font-medium">
                ✓ Located
              </span>
            )}
          </div>

          {!manualLoc ? (
            <p className="text-ink-hint text-xs">
              Not accurate?{" "}
              <button
                onClick={() => setManualLoc(true)}
                className="text-navy underline underline-offset-2 font-medium hover:text-navy-dark"
              >
                Enter manually
              </button>
            </p>
          ) : (
            <div className="space-y-1.5">
              <label className="text-ink-secondary text-xs font-medium">
                Manual location
              </label>
              <input
                className="form-input"
                placeholder="e.g. Colombo Fort, near railway station"
                value={manualAddr}
                onChange={(e) => setManualAddr(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Photos */}
        <div
          className="card animate-slide-up space-y-3"
          style={{ animationDelay: "120ms" }}
        >
          <h2 className="text-ink-primary text-sm font-semibold">Photos</h2>
          <div
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-navy hover:bg-navy-light/30 transition-all duration-200"
          >
            {photos.length === 0 ? (
              <>
                <div className="w-9 h-9 bg-navy-light rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className="text-navy text-xs font-semibold">
                  Click to upload photos
                </p>
                <p className="text-ink-hint text-[10px]">
                  PNG, JPG up to 10MB · max 2 photos
                </p>
              </>
            ) : (
              <div className="flex flex-wrap gap-2 p-2 justify-center">
                {photos.map((f, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-lg bg-navy-light border border-border overflow-hidden flex items-center justify-center text-xs text-ink-secondary font-medium"
                  >
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-ink-hint text-lg">
                  +
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotos}
          />
          {photos.length > 0 && (
            <p className="text-ink-secondary text-xs">
              {photos.length} photo{photos.length > 1 ? "s" : ""} selected ·{" "}
              <button
                onClick={() => setPhotos([])}
                className="text-reported-text underline underline-offset-2 hover:opacity-70"
              >
                Remove all
              </button>
            </p>
          )}
        </div>

        {/* Actions — hide if PICKED_UP */}
        {status !== "PICKED_UP" && (
          <div
            className="flex items-center gap-3 pb-8 animate-slide-up"
            style={{ animationDelay: "140ms" }}
          >
            <Link href="/" className="btn-outline">
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit Report"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
