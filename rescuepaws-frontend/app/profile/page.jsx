/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PawPrint,
  Plus,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Heart,
  ChevronRight,
  Bell,
  TrendingUp,
  Search,
} from "lucide-react";
import { useDogs } from "@/hooks/useDogs";
import { DogPickupCard } from "@/component/Cart/DogPickupCard";
import { DogCard2 } from "@/component/Cart/DogCard2";
import { EmptyState } from "@/constants/Other";
import Navbar from "@/component/NavBar";



export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dogs");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const { data: dogs, isLoading } = useDogs();

  // Only filter dogs where logged user
  let MY_PICKUPS = [];
  const MY_DOGS =
    user && dogs?.data
      ? dogs.data
          .filter((dog) =>
            dog.reports?.some((report) => report.userId === user.id),
          )
          .map((dog) => {
            // Prepare dog object
            const dogObj = {
              id: dog.id,
              type: dog.type || "Unknown",
              description: dog.description || "No description available",
              gender: dog.gender || "Unknown",
              age: dog.age || "Unknown",
              place: dog.place || `${dog.latitude}, ${dog.longitude}`,
              latitude: dog.latitude,
              longitude: dog.longitude,
              status: dog.status || "REPORTED",
              created_at: dog.created_at,
              images: dog.images || [],
            };

            // If dog has a pickup, add it to MY_PICKUP
            if (dog.pickups && dog.pickups.length > 0) {
              const pickup = dog.pickups[0]; // Assuming 1:1
              MY_PICKUPS.push({
                id: pickup.id,
                dogId: dog.id,
                dogType: dog.type || "Unknown",
                place: dog.place || `${dog.latitude}, ${dog.longitude}`,
                status: pickup.status || "COMPLETED",
                scheduledAt: pickup.pickedAt,
                notes: pickup.username
                  ? `Picked up by ${pickup.username}`
                  : "No notes available",
              });
            }

            return dogObj;
          })
      : [];

  if (!user) return null;

  const USER = {
    name: user.username,
    role: user.role,
    initials: user.username
      .split(" ")
      .map((n) => n[0])
      .join(""),
  };

  const counts = {
    total: MY_DOGS.length,
    reported: MY_DOGS.filter((d) => d.status === "REPORTED").length,
    rescued: MY_DOGS.filter((d) => d.status === "RESCUED").length,
    adopted: MY_DOGS.filter((d) => d.status === "ADOPTED").length,
    pending: MY_PICKUPS.filter((p) => p.status === "PENDING").length,
  };

  const filteredDogs = MY_DOGS.filter((d) => {
    const okStatus = filterStatus === "ALL" || d.status === filterStatus;
    const okSearch =
      !searchQuery ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.place.toLowerCase().includes(searchQuery.toLowerCase());
    return okStatus && okSearch;
  });

  const filteredPickups = MY_PICKUPS.filter((p) => {
    const okStatus = filterStatus === "ALL" || p.status === filterStatus;
    const okSearch =
      !searchQuery ||
      p.dogType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.place.toLowerCase().includes(searchQuery.toLowerCase());
    return okStatus && okSearch;
  });

  function switchTab(tab) {
    setActiveTab(tab);
    setFilterStatus("ALL");
    setSearchQuery("");
  }

  const dogFilters = ["ALL", "REPORTED", "RESCUED", "ADOPTED"];
  const pickupFilters = ["ALL", "PENDING", "COMPLETED"];

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* ── NAVBAR ── */}
      <Navbar initials={USER.initials} name={USER.name} role={USER.role} />


      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* ── WELCOME HERO ── */}
        <div className="bg-[#1E3A5F] rounded-2xl overflow-hidden">
          <div className="px-8 py-7 flex items-center justify-between gap-6">
            <div>
              <p className="text-xs text-white/55 mb-1 font-medium tracking-wide uppercase">
                Welcome back
              </p>
              <h1 className="text-2xl font-semibold text-white mb-5">
                {USER.name}
              </h1>
              <div className="flex gap-3 flex-wrap">
                {[
                  { v: counts.total, l: "Total Reports", c: "text-white" },
                  { v: counts.rescued, l: "Rescued", c: "text-green-300" },
                  {
                    v: counts.reported,
                    l: "Pending Rescue",
                    c: "text-orange-300",
                  },
                  { v: counts.adopted, l: "Adopted", c: "text-blue-300" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="bg-white/10 border border-white/15 rounded-xl px-5 py-3 text-center min-w-[80px]"
                  >
                    <p className={`text-xl font-semibold ${s.c}`}>{s.v}</p>
                    <p className="text-[10px] text-white/50 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-white/15 border-2 border-white/20 flex items-center justify-center text-2xl font-semibold text-white">
                {USER.initials}
              </div>
              <p className="text-xs text-white/60">{USER.role}</p>
            </div>
          </div>

          {/* QUICK STAT STRIP */}
          <div className="border-t border-white/10 grid grid-cols-4 divide-x divide-white/10">
            {[
              {
                icon: PawPrint,
                label: "Dogs Reported",
                value: counts.total,
                color: "text-white",
              },
              {
                icon: AlertCircle,
                label: "Awaiting Help",
                value: counts.reported,
                color: "text-orange-300",
              },
              {
                icon: CheckCircle2,
                label: "Rescued",
                value: counts.rescued,
                color: "text-green-300",
              },
              {
                icon: Heart,
                label: "Pickups",
                value: MY_PICKUPS.length,
                color: "text-blue-300",
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-4">
                <Icon size={16} className="text-white/40 flex-shrink-0" />
                <div>
                  <p className={`text-base font-semibold ${color}`}>{value}</p>
                  <p className="text-[10px] text-white/45">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className="bg-white border border-[#D0DDE8] rounded-2xl px-6 py-4 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#ECF2F8] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
              🐾
            </div>
            <div>
              <p className="font-medium text-[#1A2E42] text-sm">
                Spotted a stray dog?
              </p>
              <p className="text-xs text-[#6B8499] mt-0.5">
                Submit a report with location and photos — every report saves a
                life.
              </p>
            </div>
          </div>
          <Link
            href="/dogs/report-dog"
            className="bg-[#1E3A5F] text-white rounded-xl px-5 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-[#0F2340] transition-colors whitespace-nowrap shadow-sm flex-shrink-0"
          >
            <Plus size={14} /> Report Dog
          </Link>
        </div>

        {/* ── TABS ── */}
        <div>
          {/* Tab header + controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
            <div className="flex bg-white border border-[#D0DDE8] rounded-xl p-1 gap-1 shadow-sm w-fit">
              <button
                onClick={() => switchTab("dogs")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "dogs"
                    ? "bg-[#1E3A5F] text-white shadow-sm"
                    : "text-[#6B8499] hover:bg-[#ECF2F8] hover:text-[#1E3A5F]"
                }`}
              >
                <PawPrint size={14} />
                My Reported Dogs
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${activeTab === "dogs" ? "bg-white/20 text-white" : "bg-[#ECF2F8] text-[#6B8499]"}`}
                >
                  {MY_DOGS.length}
                </span>
              </button>
              <button
                onClick={() => switchTab("pickups")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "pickups"
                    ? "bg-[#1E3A5F] text-white shadow-sm"
                    : "text-[#6B8499] hover:bg-[#ECF2F8] hover:text-[#1E3A5F]"
                }`}
              >
                <TrendingUp size={14} />
                My Pickups
                {counts.pending > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${activeTab === "pickups" ? "bg-white/20 text-white" : "bg-[#FDF2EA] text-[#9A5A2A]"}`}
                  >
                    {counts.pending} pending
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 sm:ml-auto">
              {/* Search */}
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0B4C2]"
                />
                <input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 py-2 bg-white border border-[#D0DDE8] rounded-xl text-sm text-[#1A2E42] placeholder-[#A0B4C2] focus:outline-none focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/10 w-40 transition-all shadow-sm"
                />
              </div>

              {/* Filter chips */}
              <div className="flex items-center gap-1 bg-white border border-[#D0DDE8] rounded-xl p-1 shadow-sm">
                {(activeTab === "dogs" ? dogFilters : pickupFilters).map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setFilterStatus(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filterStatus === f
                          ? "bg-[#1E3A5F] text-white shadow-sm"
                          : "text-[#6B8499] hover:bg-[#ECF2F8]"
                      }`}
                    >
                      {f === "ALL"
                        ? "All"
                        : f.charAt(0) + f.slice(1).toLowerCase()}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-[#A0B4C2] mb-4">
            Showing{" "}
            {activeTab === "dogs"
              ? filteredDogs.length
              : filteredPickups.length}{" "}
            {activeTab === "dogs" ? "dog" : "pickup"}
            {(activeTab === "dogs"
              ? filteredDogs.length
              : filteredPickups.length) !== 1
              ? "s"
              : ""}
            {filterStatus !== "ALL" &&
              ` · filtered by ${filterStatus.toLowerCase()}`}
          </p>

          {/* DOGS GRID */}
          {activeTab === "dogs" &&
            (filteredDogs.length === 0 ? (
              <EmptyState
                icon="🐕"
                message="No dogs found"
                sub="Try adjusting your search or filter."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDogs.map((dog) => (
                  <DogCard2 key={dog.id} dog={dog} />
                ))}
              </div>
            ))}

          {/* PICKUPS GRID */}
          {activeTab === "pickups" &&
            (filteredPickups.length === 0 ? (
              <EmptyState
                icon="🚐"
                message="No pickups found"
                sub="Try adjusting your search or filter."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPickups.map((p) => (
                  <DogPickupCard key={p.id} pickup={p} />
                ))}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}


