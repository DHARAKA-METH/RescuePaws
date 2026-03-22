/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ageOptions, genderOptions, statusInfo, submissionGuide } from "@/constants/Other";
import Navbar from "@/component/NavBar";






export default function ReportDogPage() {
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("Adult (3–7yr)");
    const [gender, setGender] = useState("Unknown");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [coords, setCoords] = useState(null);
    const [address, setAddress] = useState("");
    const [locError, setLocError] = useState("");
    const [manualLoc, setManualLoc] = useState(false);
    const [manualAddr, setManualAddr] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();

    /* Auto-detect GPS on mount */
    useEffect(() => {
        if (!navigator.geolocation) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocError("Geolocation not supported.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude: lat, longitude: lng } = pos.coords;
                setCoords({ lat, lng, accuracy: Math.round(pos.coords.accuracy) });
                setAddress(`${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`);
            },
            () => setLocError("Location access denied."),
            { enableHighAccuracy: true }
        );
    }, []);

    const handlePhotos = (e) => {
        const files = Array.from(e.target.files).slice(0, 2);
        setPhotos(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files)
            .filter(f => f.type.startsWith("image/"))
            .slice(0, 5);
        setPhotos(files);
    };

    const handleSubmit = () => {
        if (!breed) return alert("Please enter the breed / type.");
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center px-4">
                <div className="card max-w-sm w-full text-center space-y-4 py-10 animate-slide-up">
                    <div className="text-5xl">🐾</div>
                    <h2 className="text-ink-primary text-lg font-semibold">Report submitted!</h2>
                    <p className="text-ink-secondary text-sm">
                        Thank you. Our team will review your report and dispatch help shortly.
                    </p>
                    <Link href="/dogs" className="btn-primary inline-block mt-2">View all dogs</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface">
            <Navbar/>

            {/* ── Hero banner ── */}
            <div className="bg-navy px-6 py-6">
                <h1 className="text-white text-xl font-semibold">Report a Stray Dog</h1>
                <p className="text-navy-light/70 text-sm mt-0.5">
                    Fill in the details below to submit a rescue report.
                </p>
            </div>

            {/* ── Page body ── */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

                {/* Row 1: Dog info + Submission guide */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4">

                    {/* Dog information */}
                    <div className="card space-y-4 animate-slide-up">
                        <h2 className="text-ink-primary text-sm font-semibold">Dog information</h2>

                        {/* Breed */}
                        <div className="space-y-1.5">
                            <label className="text-ink-secondary text-xs font-medium">
                                Breed / type <span className="text-red-400">*</span>
                            </label>
                            <input
                                className="form-input"
                                placeholder="e.g. Golden Retriever, Mixed Breed"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </div>

                        {/* Age + Gender */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label className="text-ink-secondary text-xs font-medium">Age range</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {ageOptions.map((opt) => (
                                        <button key={opt} onClick={() => setAge(opt)}
                                            className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all
                        ${age === opt
                                                    ? "bg-navy text-white border-navy"
                                                    : "bg-surface text-ink-secondary border-border hover:border-navy-light"}`}>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-ink-secondary text-xs font-medium">Gender</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {genderOptions.map((opt) => (
                                        <button key={opt} onClick={() => setGender(opt)}
                                            className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all
                        ${gender === opt
                                                    ? "bg-navy text-white border-navy"
                                                    : "bg-surface text-ink-secondary border-border hover:border-navy-light"}`}>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
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

                    {/* Right column */}
                    <div className="space-y-4">

                        {/* Submission guide */}
                        <div className="card animate-slide-up" style={{ animationDelay: "40ms" }}>
                            <h2 className="text-ink-primary text-sm font-semibold mb-3">Submission guide</h2>
                            <ul className="space-y-2">
                                {submissionGuide.map((tip) => (
                                    <li key={tip} className="flex items-start gap-2">
                                        <svg className="w-3.5 h-3.5 text-rescued-text mt-0.5 flex-shrink-0"
                                            fill="none" stroke="currentColor" strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span className="text-ink-secondary text-xs leading-snug">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Status info */}
                        <div className="card animate-slide-up" style={{ animationDelay: "80ms" }}>
                            <h2 className="text-ink-primary text-sm font-semibold mb-3">Status after submission</h2>
                            <div className="space-y-2.5">
                                {statusInfo.map(({ badge, color, label }) => (
                                    <div key={label} className="flex items-center gap-2.5">
                                        <span className={badge + " text-[10px]"}>
                                            {badge.includes("reported") ? "Reported" : badge.includes("rescued") ? "Rescued" : "Adopted"}
                                        </span>
                                        <span className={`${color} text-xs font-medium`}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Location card */}
                <div className="card animate-slide-up space-y-3" style={{ animationDelay: "100ms" }}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-ink-primary text-sm font-semibold">
                            Location — GPS auto-detect
                        </h2>
                        {coords && (
                            <span className="text-[10px] text-rescued-text bg-rescued-bg border border-rescued-border
                               px-2 py-0.5 rounded-full font-medium">
                                ✓ Located
                            </span>
                        )}
                    </div>

                    {/* Mini map */}
                    <div className="relative h-36 bg-[#dce8f0] rounded-xl overflow-hidden border border-border">
                        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid2" width="28" height="28" patternUnits="userSpaceOnUse">
                                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#7aaabf" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid2)" />
                        </svg>
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#b8cdd8" strokeWidth="7" />
                            <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#b8cdd8" strokeWidth="5" />
                            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#c8d8e4" strokeWidth="3" />
                            <line x1="0" y1="28%" x2="100%" y2="28%" stroke="#c8d8e4" strokeWidth="3" />
                            <line x1="0" y1="78%" x2="100%" y2="78%" stroke="#c8d8e4" strokeWidth="2" />
                        </svg>
                        {/* Pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                            <div className="w-7 h-7 bg-navy rounded-full border-2 border-white shadow-lg
                              flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </div>
                        </div>
                        {/* Copy coords button */}
                        {coords && (
                            <button
                                onClick={() => navigator.clipboard?.writeText(`${coords.lat}, ${coords.lng}`)}
                                className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-lg border border-border
                           flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                                title="Copy coordinates"
                            >
                                <svg className="w-3.5 h-3.5 text-ink-secondary" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Coords + accuracy */}
                    {coords ? (
                        <div className="space-y-0.5">
                            <p className="text-ink-primary text-xs font-semibold">
                                {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
                            </p>
                            <p className="text-ink-secondary text-xs">
                                {address || "Detecting address…"}
                            </p>
                            <p className="text-ink-hint text-[10px] flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rescued-text inline-block" />
                                Accurate to ±{coords.accuracy} meters
                            </p>
                        </div>
                    ) : (
                        <p className="text-ink-hint text-xs">{locError || "Detecting your location…"}</p>
                    )}

                    {/* Manual entry */}
                    {!manualLoc ? (
                        <p className="text-ink-hint text-xs">
                            Not accurate?{" "}
                            <button onClick={() => setManualLoc(true)}
                                className="text-navy underline underline-offset-2 font-medium hover:text-navy-dark">
                                Enter manually
                            </button>
                        </p>
                    ) : (
                        <div className="space-y-1.5">
                            <label className="text-ink-secondary text-xs font-medium">Manual location</label>
                            <input
                                className="form-input"
                                placeholder="e.g. Colombo Fort, near railway station"
                                value={manualAddr}
                                onChange={(e) => setManualAddr(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* Photos card */}
                <div className="card animate-slide-up space-y-3" style={{ animationDelay: "120ms" }}>
                    <h2 className="text-ink-primary text-sm font-semibold">Photos</h2>

                    {/* Drop zone */}
                    <div
                        onClick={() => fileRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 border-dashed border-border rounded-xl h-32
                       flex flex-col items-center justify-center gap-2
                       cursor-pointer hover:border-navy hover:bg-navy-light/30
                       transition-all duration-200"
                    >
                        {photos.length === 0 ? (
                            <>
                                <div className="w-9 h-9 bg-navy-light rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                </div>
                                <p className="text-navy text-xs font-semibold">Click to upload photos</p>
                                <p className="text-ink-hint text-[10px]">PNG, JPG up to 10MB · max 2 photos</p>
                            </>
                        ) : (
                            <div className="flex flex-wrap gap-2 p-2 justify-center">
                                {photos.map((f, i) => (
                                    <div key={i}
                                        className="w-16 h-16 rounded-lg bg-navy-light border border-border overflow-hidden
                               flex items-center justify-center text-xs text-ink-secondary font-medium">
                                        <img src={URL.createObjectURL(f)} alt={f.name}
                                            className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border
                                flex items-center justify-center text-ink-hint text-lg">+</div>
                            </div>
                        )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                        onChange={handlePhotos} />

                    {photos.length > 0 && (
                        <p className="text-ink-secondary text-xs">
                            {photos.length} photo{photos.length > 1 ? "s" : ""} selected ·{" "}
                            <button onClick={() => setPhotos([])}
                                className="text-reported-text underline underline-offset-2 hover:opacity-70">
                                Remove all
                            </button>
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pb-8 animate-slide-up" style={{ animationDelay: "140ms" }}>
                    <Link href="/" className="btn-outline">Cancel</Link>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-primary flex items-center gap-2 disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                        stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting…
                            </>
                        ) : (
                            "Submit Report"
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}