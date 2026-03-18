"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks, sideMenu } from "@/constants/Other";

/* ─── Data ─────────────────────────────────────────── */
const user = { name: "Ashan Silva", role: "Reporter", initials: "AS" };

const stats = [
  { value: 8, label: "Reports", color: "text-white"        },
  { value: 5, label: "Rescued", color: "text-rescued-text" },
  { value: 3, label: "Pending", color: "text-adopted-text" },
];

const reports = [
  { id: "1", dog: "Golden Retriever", location: "Colombo Fort",  status: "Reported", date: "Mar 14" },
  { id: "2", dog: "Mixed Breed",      location: "Negombo Beach", status: "Rescued",  date: "Mar 12" },
  { id: "3", dog: "Labrador",         location: "Kandy",         status: "Adopted",  date: "Mar 08" },
  { id: "4", dog: "German Shepherd",  location: "Galle",         status: "Reported", date: "Mar 05" },
  { id: "5", dog: "Poodle",           location: "Matara",        status: "Rescued",  date: "Mar 01" },
];

const pickups = [
  { id: "p1", dog: "Golden Retriever", location: "Colombo Fort",  scheduled: "Mar 15 · 10:00 AM", status: "Scheduled" },
  { id: "p2", dog: "Mixed Breed",      location: "Negombo Beach", scheduled: "Mar 13 · 02:00 PM", status: "Completed" },
  { id: "p3", dog: "Labrador",         location: "Kandy",         scheduled: "Mar 10 · 09:00 AM", status: "Completed" },
];



const statusBadge = {
  Reported:  "badge-reported",
  Rescued:   "badge-rescued",
  Adopted:   "badge-adopted",
  Scheduled: "badge-adopted",
  Completed: "badge-rescued",
};

/* ─── Sub-pages ─────────────────────────────────────── */

function DashboardHome({ onNavigate }) {
  return (
    <div className="space-y-4">

      {/* Welcome banner */}
      <div className="bg-navy rounded-2xl p-5 flex items-start justify-between animate-slide-up">
        <div className="space-y-3">
          <div>
            <p className="text-white/60 text-xs font-medium">Welcome back</p>
            <h1 className="text-white text-xl font-semibold mt-0.5">My Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {stats.map(({ value, label, color }) => (
              <div key={label}
                   className="bg-white/10 rounded-xl px-4 py-2.5 text-center min-w-[64px]">
                <p className={`text-lg font-semibold leading-tight ${color}`}>{value}</p>
                <p className="text-white/50 text-[10px] font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20
                        flex items-center justify-center text-white text-sm font-semibold shrink-0">
          {user.initials}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white border border-border rounded-2xl px-5 py-4
                      flex items-center justify-between gap-4 animate-slide-up"
           style={{ animationDelay: "60ms" }}>
        <div>
          <p className="text-ink-primary text-sm font-semibold">Spotted a stray dog?</p>
          <p className="text-ink-secondary text-xs mt-0.5">Submit a report and help them find safety.</p>
        </div>
        <Link href="/report-dog" className="btn-primary whitespace-nowrap text-xs shrink-0">
          + Report Dog
        </Link>
      </div>

      {/* Recent reports */}
      <div className="card p-0 overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-ink-primary text-sm font-semibold">My recent reports</h2>
          <button onClick={() => onNavigate("My Reports")}
            className="text-navy text-xs font-medium hover:text-navy-dark transition-colors">
            View all →
          </button>
        </div>
        <ReportsTable rows={reports.slice(0, 3)} />
      </div>

      {/* Recent pickups */}
      <div className="card p-0 overflow-hidden animate-slide-up" style={{ animationDelay: "140ms" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-ink-primary text-sm font-semibold">Recent pickups</h2>
          <button onClick={() => onNavigate("My Pickups")}
            className="text-navy text-xs font-medium hover:text-navy-dark transition-colors">
            View all →
          </button>
        </div>
        <PickupsTable rows={pickups.slice(0, 2)} />
      </div>

    </div>
  );
}

function MyReports() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Reported", "Rescued", "Adopted"];
  const filtered = filter === "All" ? reports : reports.filter(r => r.status === filter);

  return (
    <div className="space-y-4 animate-slide-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-ink-primary text-lg font-semibold">My Reports</h1>
          <p className="text-ink-secondary text-xs mt-0.5">{reports.length} total reports submitted</p>
        </div>
        <Link href="/report-dog" className="btn-primary text-xs">+ New Report</Link>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-xl border transition-all
              ${filter === f
                ? "bg-navy text-white border-navy"
                : "bg-white text-ink-secondary border-border hover:border-navy"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total",   value: reports.length,                              cls: "text-ink-primary" },
          { label: "Rescued", value: reports.filter(r=>r.status==="Rescued").length,  cls: "text-rescued-text" },
          { label: "Pending", value: reports.filter(r=>r.status==="Reported").length, cls: "text-reported-text" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="card text-center py-4">
            <p className={`text-2xl font-semibold ${cls}`}>{value}</p>
            <p className="text-ink-hint text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-ink-primary text-sm font-semibold">
            {filter === "All" ? "All reports" : `${filter} reports`}
            <span className="ml-2 text-ink-hint text-xs font-normal">({filtered.length})</span>
          </h2>
        </div>
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-ink-hint text-sm">No reports found.</div>
        ) : (
          <ReportsTable rows={filtered} showFull />
        )}
      </div>

    </div>
  );
}

function MyPickups() {
  const scheduled = pickups.filter(p => p.status === "Scheduled");
  const completed = pickups.filter(p => p.status === "Completed");

  return (
    <div className="space-y-4 animate-slide-up">

      {/* Header */}
      <div>
        <h1 className="text-ink-primary text-lg font-semibold">My Pickups</h1>
        <p className="text-ink-secondary text-xs mt-0.5">{pickups.length} total pickups requested</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Scheduled", value: scheduled.length, cls: "text-adopted-text"  },
          { label: "Completed", value: completed.length, cls: "text-rescued-text"  },
        ].map(({ label, value, cls }) => (
          <div key={label} className="card text-center py-4">
            <p className={`text-2xl font-semibold ${cls}`}>{value}</p>
            <p className="text-ink-hint text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Scheduled */}
      {scheduled.length > 0 && (
        <div className="card p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-adopted-text" />
            <h2 className="text-ink-primary text-sm font-semibold">Scheduled</h2>
            <span className="text-ink-hint text-xs">({scheduled.length})</span>
          </div>
          <PickupsTable rows={scheduled} />
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div className="card p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rescued-text" />
            <h2 className="text-ink-primary text-sm font-semibold">Completed</h2>
            <span className="text-ink-hint text-xs">({completed.length})</span>
          </div>
          <PickupsTable rows={completed} />
        </div>
      )}

    </div>
  );
}

function ProfilePage() {
  return (
    <div className="space-y-4 animate-slide-up max-w-sm">
      <h1 className="text-ink-primary text-lg font-semibold">Profile</h1>
      <div className="card space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-navy-light border border-border
                          flex items-center justify-center text-navy text-lg font-semibold">
            {user.initials}
          </div>
          <div>
            <p className="text-ink-primary font-semibold">{user.name}</p>
            <p className="text-ink-hint text-xs">{user.role}</p>
          </div>
        </div>
        <div className="space-y-3 pt-2 border-t border-border">
          {[
            { label: "Full name",  value: user.name          },
            { label: "Role",       value: user.role          },
            { label: "Email",      value: "ashan@example.com" },
            { label: "Member since", value: "January 2024"   },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-ink-hint text-xs">{label}</span>
              <span className="text-ink-primary text-xs font-medium">{value}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary w-full text-xs">Edit Profile</button>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [notif, setNotif] = useState(true);
  const [emails, setEmails] = useState(false);

  return (
    <div className="space-y-4 animate-slide-up max-w-sm">
      <h1 className="text-ink-primary text-lg font-semibold">Settings</h1>
      <div className="card space-y-4">
        <p className="text-ink-secondary text-xs font-semibold uppercase tracking-wide">Notifications</p>
        {[
          { label: "Push notifications", desc: "Get notified about status updates", val: notif,   set: setNotif   },
          { label: "Email updates",      desc: "Receive weekly summary emails",     val: emails,  set: setEmails  },
        ].map(({ label, desc, val, set }) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-ink-primary text-xs font-medium">{label}</p>
              <p className="text-ink-hint text-[10px]">{desc}</p>
            </div>
            <button onClick={() => set(!val)}
              className={`w-10 h-5 rounded-full transition-colors relative shrink-0
                ${val ? "bg-navy" : "bg-border"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm
                               transition-all ${val ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="card">
        <p className="text-ink-secondary text-xs font-semibold uppercase tracking-wide mb-3">Danger zone</p>
        <button className="w-full text-xs font-medium text-reported-text border border-reported-border
                           bg-reported-bg rounded-xl px-4 py-2.5 hover:opacity-80 transition-opacity">
          Delete Account
        </button>
      </div>
    </div>
  );
}

/* ─── Shared table components ────────────────────────── */

function ReportsTable({ rows, showFull = false }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-surface">
            {["Dog", "Location", "Status", "Date", "Actions"].map((h) => (
              <th key={h} className="text-left text-ink-hint font-semibold px-5 py-2.5
                                     text-[10px] uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, dog, location, status, date }) => (
            <tr key={id} className="border-b border-border last:border-0
                                    hover:bg-surface transition-colors">
              <td className="px-5 py-3.5 text-ink-primary font-medium">
                {showFull ? dog : (dog.length > 8 ? dog.slice(0, 7) + "…" : dog)}
              </td>
              <td className="px-5 py-3.5 text-ink-secondary">
                {showFull ? location : (location.length > 7 ? location.slice(0, 6) + "…" : location)}
              </td>
              <td className="px-5 py-3.5">
                <span className={statusBadge[status]}>{status}</span>
              </td>
              <td className="px-5 py-3.5 text-ink-secondary">{date}</td>
              <td className="px-5 py-3.5">
                <Link href={`/dogs/${id}`}
                  className="text-navy font-semibold hover:text-navy-dark transition-colors">
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PickupsTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-surface">
            {["Dog", "Location", "Scheduled", "Status", "Actions"].map((h) => (
              <th key={h} className="text-left text-ink-hint font-semibold px-5 py-2.5
                                     text-[10px] uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, dog, location, scheduled, status }) => (
            <tr key={id} className="border-b border-border last:border-0
                                    hover:bg-surface transition-colors">
              <td className="px-5 py-3.5 text-ink-primary font-medium">
                {dog.length > 8 ? dog.slice(0, 7) + "…" : dog}
              </td>
              <td className="px-5 py-3.5 text-ink-secondary">
                {location.length > 7 ? location.slice(0, 6) + "…" : location}
              </td>
              <td className="px-5 py-3.5 text-ink-secondary">{scheduled}</td>
              <td className="px-5 py-3.5">
                <span className={statusBadge[status]}>{status}</span>
              </td>
              <td className="px-5 py-3.5">
                <Link href={`/dogs/${id}`}
                  className="text-navy font-semibold hover:text-navy-dark transition-colors">
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Page titles map ────────────────────────────────── */
const pageTitles = {
  Dashboard:   "Dashboard",
  "My Reports": "My Reports",
  "My Pickups": "My Pickups",
  Profile:     "Profile",
  Settings:    "Settings",
};

/* ─── Root layout ────────────────────────────────────── */
export default function DashboardPage() {
  const [activeKey, setActiveKey] = useState("Dashboard");

  const renderContent = () => {
    switch (activeKey) {
      case "Dashboard":   return <DashboardHome onNavigate={setActiveKey} />;
      case "My Reports":  return <MyReports />;
      case "My Pickups":  return <MyPickups />;
      case "Profile":     return <ProfilePage />;
      case "Settings":    return <SettingsPage />;
      default:            return <DashboardHome onNavigate={setActiveKey} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">

      {/* Top Nav */}
      <nav className="bg-white border-b border-border px-5 py-3 flex items-center
                      justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">🐾</span>
            </div>
            <span className="text-ink-primary font-semibold text-sm">RescuePaws</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={label} href={href}
                className="text-xs font-medium px-3 py-1.5 rounded-lg text-ink-secondary
                           hover:text-ink-primary hover:bg-surface transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-ink-secondary text-xs font-medium hidden sm:block">
            {pageTitles[activeKey]}
          </span>
          <div className="w-8 h-8 rounded-full bg-navy-light border border-border
                          flex items-center justify-center text-navy text-xs font-semibold">
            {user.initials}
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-48 bg-white border-r border-border flex-col
                          justify-between py-5 px-3 shrink-0 hidden sm:flex">
          <div className="space-y-5">
            {/* User */}
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-9 h-9 rounded-full bg-navy-light border border-border
                              flex items-center justify-center text-navy text-xs font-semibold shrink-0">
                {user.initials}
              </div>
              <div>
                <p className="text-ink-primary text-xs font-semibold leading-tight">{user.name}</p>
                <p className="text-ink-hint text-[10px]">{user.role}</p>
              </div>
            </div>

            {/* Nav sections */}
            {sideMenu.map(({ section, items }) => (
              <div key={section} className="space-y-0.5">
                <p className="text-ink-hint text-[9px] font-semibold tracking-widest px-2 mb-2">
                  {section}
                </p>
                {items.map(({ key, label, icon }) => (
                  <button key={key}
                    onClick={() => setActiveKey(key)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs
                                font-medium transition-all text-left
                                ${activeKey === key
                                  ? "bg-navy-light text-navy font-semibold"
                                  : "text-ink-secondary hover:bg-surface hover:text-ink-primary"}`}>
                    <span className="text-sm">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Logout */}
          <button className="flex items-center gap-2 px-2.5 py-2 text-xs text-ink-hint
                             hover:text-ink-primary transition-colors rounded-xl hover:bg-surface">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto px-5 py-6">
          {renderContent()}
        </main>

      </div>
    </div>
  );
}