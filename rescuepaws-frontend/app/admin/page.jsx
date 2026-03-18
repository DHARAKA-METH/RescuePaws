"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────── */
const adminUser = { name: "Admin User", role: "Super Admin", initials: "AD" };

const topStats = [
  { value: "1,248", label: "Total Dogs",   sub: "+12 today",          color: "text-ink-primary"  },
  { value: "356",   label: "Reported",     sub: "Needs attention",    color: "text-reported-text" },
  { value: "892",   label: "Rescued",      sub: "71% success rate",   color: "text-rescued-text"  },
  { value: "2,104", label: "Total Users",  sub: "+48 this week",      color: "text-adopted-text"  },
];

const dogsByStatus = [
  { label: "Reported", value: 356,  max: 1248, badge: "badge-reported", bar: "bg-reported-border" },
  { label: "Rescued",  value: 892,  max: 1248, badge: "badge-rescued",  bar: "bg-rescued-border"  },
  { label: "Adopted",  value: 562,  max: 1248, badge: "badge-adopted",  bar: "bg-adopted-border"  },
];

const liveActivity = [
  { text: "New report: Gampaha",      time: "5 min ago",  dot: "bg-reported-text" },
  { text: "Dog rescued: Kandy",       time: "1 hr ago",   dot: "bg-rescued-text"  },
  { text: "New user registered",      time: "2 hrs ago",  dot: "bg-ink-primary"   },
  { text: "Dog adopted: Colombo",     time: "3 hrs ago",  dot: "bg-adopted-text"  },
];

const recentDogs = [
  { id:"1", dog:"Golden Retriever", reporter:"Ashan S.",  status:"Reported", location:"Colombo",  date:"Mar 14" },
  { id:"2", dog:"Mixed Breed",      reporter:"Nimali R.", status:"Rescued",  location:"Negombo",  date:"Mar 13" },
  { id:"3", dog:"Labrador",         reporter:"Kasun P.",  status:"Adopted",  location:"Kandy",    date:"Mar 12" },
  { id:"4", dog:"Beagle",           reporter:"Dilshan W.",status:"Reported", location:"Gampaha",  date:"Mar 14" },
];

const allDogs = [
  { id:"1", dog:"Golden Retriever", reporter:"Ashan S.",   status:"Reported", location:"Colombo",  date:"Mar 14" },
  { id:"2", dog:"Mixed Breed",      reporter:"Nimali R.",  status:"Rescued",  location:"Negombo",  date:"Mar 13" },
  { id:"3", dog:"Labrador",         reporter:"Kasun P.",   status:"Adopted",  location:"Kandy",    date:"Mar 12" },
  { id:"4", dog:"Beagle",           reporter:"Dilshan W.", status:"Reported", location:"Gampaha",  date:"Mar 14" },
  { id:"5", dog:"Poodle",           reporter:"Sachini M.", status:"Rescued",  location:"Matara",   date:"Mar 11" },
  { id:"6", dog:"Husky",            reporter:"Ranil K.",   status:"Reported", location:"Galle",    date:"Mar 10" },
];

const allUsers = [
  { id:"u1", name:"Ashan Silva",   email:"ashan@example.com",  role:"Reporter",   reports:8,  joined:"Jan 2024" },
  { id:"u2", name:"Nimali Raj",    email:"nimali@example.com", role:"Reporter",   reports:5,  joined:"Feb 2024" },
  { id:"u3", name:"Kasun Perera",  email:"kasun@example.com",  role:"Volunteer",  reports:3,  joined:"Mar 2024" },
  { id:"u4", name:"Dilshan W.",    email:"dilshan@example.com",role:"Reporter",   reports:6,  joined:"Jan 2024" },
];

const allPickups = [
  { id:"p1", dog:"Golden Retriever", location:"Colombo Fort",  scheduled:"Mar 15 · 10:00 AM", status:"Scheduled", assignee:"Team A" },
  { id:"p2", dog:"Mixed Breed",      location:"Negombo Beach", scheduled:"Mar 13 · 02:00 PM", status:"Completed", assignee:"Team B" },
  { id:"p3", dog:"Labrador",         location:"Kandy",         scheduled:"Mar 10 · 09:00 AM", status:"Completed", assignee:"Team A" },
  { id:"p4", dog:"Beagle",           location:"Gampaha",       scheduled:"Mar 16 · 11:00 AM", status:"Scheduled", assignee:"Team C" },
];

const sideMenu = [
  {
    section: "OVERVIEW",
    items: [
      { key: "Dashboard",    label: "Dashboard",    icon: "📊", badge: null },
      { key: "Manage Dogs",  label: "Manage Dogs",  icon: "🐾", badge: 12   },
      { key: "Reports",      label: "Reports",      icon: "📋", badge: 5    },
      { key: "Pickups",      label: "Pickups",      icon: "🚐", badge: null },
    ],
  },
  {
    section: "ANALYTICS",
    items: [
      { key: "Statistics",   label: "Statistics",   icon: "📈", badge: null },
      { key: "Users",        label: "Users",        icon: "👥", badge: null },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { key: "Settings",     label: "Settings",     icon: "⚙️", badge: null },
    ],
  },
];

const statusBadge = {
  Reported:  "badge-reported",
  Rescued:   "badge-rescued",
  Adopted:   "badge-adopted",
  Scheduled: "badge-adopted",
  Completed: "badge-rescued",
};

const trunc = (str, n) => str.length > n ? str.slice(0, n - 1) + "…" : str;

/* ─── Sub Pages ─────────────────────────────────────── */

function AdminHome({ onNavigate }) {
  return (
    <div className="space-y-5">

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {topStats.map(({ value, label, sub, color }) => (
          <div key={label} className="card animate-slide-up">
            <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            <p className="text-ink-primary text-xs font-semibold mt-1">{label}</p>
            <p className="text-ink-hint text-[10px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Dogs by status */}
        <div className="card space-y-4 animate-slide-up" style={{ animationDelay: "60ms" }}>
          <h2 className="text-ink-primary text-sm font-semibold">Dogs by status</h2>
          <div className="space-y-3">
            {dogsByStatus.map(({ label, value, max, badge, bar }) => (
              <div key={label} className="flex items-center gap-3">
                <span className={`${badge} text-[10px] w-16 text-center shrink-0`}>{label}</span>
                <div className="flex-1 bg-surface rounded-full h-2 overflow-hidden">
                  <div className={`${bar} h-2 rounded-full transition-all duration-500`}
                       style={{ width: `${(value / max) * 100}%` }} />
                </div>
                <span className="text-ink-primary text-xs font-semibold w-10 text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live activity */}
        <div className="card space-y-3 animate-slide-up" style={{ animationDelay: "80ms" }}>
          <h2 className="text-ink-primary text-sm font-semibold">Live activity</h2>
          <div className="space-y-3">
            {liveActivity.map(({ text, time, dot }, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className={`w-2 h-2 rounded-full ${dot} mt-1 shrink-0`} />
                <div>
                  <p className="text-ink-primary text-xs font-medium">{text}</p>
                  <p className="text-ink-hint text-[10px]">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent dogs table */}
      <div className="card p-0 overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-ink-primary text-sm font-semibold">Recent dogs</h2>
          <button onClick={() => onNavigate("Manage Dogs")}
            className="text-navy text-xs font-medium hover:text-navy-dark transition-colors">
            Manage all →
          </button>
        </div>
        <DogsTable rows={recentDogs} admin />
      </div>

    </div>
  );
}

function ManageDogs() {
  const [dogs, setDogs]     = useState(allDogs);
  const [filter, setFilter] = useState("All");
  const filters             = ["All", "Reported", "Rescued", "Adopted"];
  const filtered            = filter === "All" ? dogs : dogs.filter(d => d.status === filter);

  const handleDelete = (id) =>
    setDogs(prev => prev.filter(d => d.id !== id));

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-ink-primary text-lg font-semibold">Manage Dogs</h1>
          <p className="text-ink-secondary text-xs mt-0.5">{dogs.length} total records</p>
        </div>
        <Link href="/report-dog" className="btn-primary text-xs">+ Add Dog</Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-xl border transition-all
              ${filter === f ? "bg-navy text-white border-navy"
                             : "bg-white text-ink-secondary border-border hover:border-navy"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <DogsTable rows={filtered} admin onDelete={handleDelete} />
      </div>
    </div>
  );
}

function AdminReports() {
  const [reports, setReports] = useState(allDogs);

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-ink-primary text-lg font-semibold">Reports</h1>
          <p className="text-ink-secondary text-xs mt-0.5">{reports.length} pending review</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:"New today",  value:4, cls:"text-reported-text" },
          { label:"Reviewed",   value:12, cls:"text-rescued-text"  },
          { label:"Total",      value:reports.length, cls:"text-ink-primary" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="card text-center py-4">
            <p className={`text-2xl font-semibold ${cls}`}>{value}</p>
            <p className="text-ink-hint text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-ink-primary text-sm font-semibold">All reports</h2>
        </div>
        <DogsTable rows={reports} admin onDelete={(id) =>
          setReports(prev => prev.filter(d => d.id !== id))} />
      </div>
    </div>
  );
}

function AdminPickups() {
  const scheduled = allPickups.filter(p => p.status === "Scheduled");
  const completed  = allPickups.filter(p => p.status === "Completed");

  return (
    <div className="space-y-4 animate-slide-up">
      <h1 className="text-ink-primary text-lg font-semibold">Pickups</h1>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label:"Scheduled", value:scheduled.length, cls:"text-adopted-text" },
          { label:"Completed", value:completed.length, cls:"text-rescued-text"  },
        ].map(({ label, value, cls }) => (
          <div key={label} className="card text-center py-4">
            <p className={`text-2xl font-semibold ${cls}`}>{value}</p>
            <p className="text-ink-hint text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {[{ title:"Scheduled", rows:scheduled, dot:"bg-adopted-text" },
        { title:"Completed",  rows:completed,  dot:"bg-rescued-text"  }]
        .map(({ title, rows, dot }) => (
        <div key={title} className="card p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            <h2 className="text-ink-primary text-sm font-semibold">{title}</h2>
            <span className="text-ink-hint text-xs">({rows.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-surface">
                  {["Dog","Location","Scheduled","Assignee","Status"].map(h => (
                    <th key={h} className="text-left text-ink-hint font-semibold px-4 py-2.5
                                           text-[10px] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ id, dog, location, scheduled, assignee, status }) => (
                  <tr key={id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                    <td className="px-4 py-3 text-ink-primary font-medium">{trunc(dog,8)}</td>
                    <td className="px-4 py-3 text-ink-secondary">{trunc(location,8)}</td>
                    <td className="px-4 py-3 text-ink-secondary">{scheduled}</td>
                    <td className="px-4 py-3 text-ink-secondary">{assignee}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge[status]}>{status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function Statistics() {
  const barData = [
    { month:"Jan", value:45 }, { month:"Feb", value:62 },
    { month:"Mar", value:38 }, { month:"Apr", value:74 },
    { month:"May", value:55 }, { month:"Jun", value:90 },
  ];
  const maxVal = Math.max(...barData.map(d => d.value));

  return (
    <div className="space-y-4 animate-slide-up">
      <h1 className="text-ink-primary text-lg font-semibold">Statistics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {topStats.map(({ value, label, sub, color }) => (
          <div key={label} className="card">
            <p className={`text-xl font-semibold ${color}`}>{value}</p>
            <p className="text-ink-primary text-xs font-medium mt-1">{label}</p>
            <p className="text-ink-hint text-[10px]">{sub}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="card space-y-4">
        <h2 className="text-ink-primary text-sm font-semibold">Monthly rescues</h2>
        <div className="flex items-end gap-2 h-32">
          {barData.map(({ month, value }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-ink-hint text-[9px]">{value}</span>
              <div className="w-full bg-navy rounded-t-lg transition-all duration-500"
                   style={{ height:`${(value/maxVal)*100}%` }} />
              <span className="text-ink-hint text-[9px]">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status breakdown */}
      <div className="card space-y-3">
        <h2 className="text-ink-primary text-sm font-semibold">Status breakdown</h2>
        {dogsByStatus.map(({ label, value, max, badge, bar }) => (
          <div key={label} className="flex items-center gap-3">
            <span className={`${badge} text-[10px] w-16 text-center shrink-0`}>{label}</span>
            <div className="flex-1 bg-surface rounded-full h-2.5 overflow-hidden">
              <div className={`${bar} h-2.5 rounded-full`}
                   style={{ width:`${(value/max)*100}%` }} />
            </div>
            <span className="text-ink-secondary text-xs w-12 text-right">{value} dogs</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersPage() {
  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-ink-primary text-lg font-semibold">Users</h1>
          <p className="text-ink-secondary text-xs mt-0.5">{allUsers.length} registered users</p>
        </div>
        <button className="btn-primary text-xs">+ Invite User</button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["User","Email","Role","Reports","Joined","Actions"].map(h => (
                  <th key={h} className="text-left text-ink-hint font-semibold px-4 py-3
                                         text-[10px] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allUsers.map(({ id, name, email, role, reports, joined }) => (
                <tr key={id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-navy-light border border-border
                                      flex items-center justify-center text-navy text-[10px] font-semibold shrink-0">
                        {name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                      </div>
                      <span className="text-ink-primary font-medium">{name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-secondary">{email}</td>
                  <td className="px-4 py-3">
                    <span className="bg-navy-light text-navy border border-border
                                     text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-primary font-semibold">{reports}</td>
                  <td className="px-4 py-3 text-ink-secondary">{joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-navy text-xs font-semibold hover:text-navy-dark transition-colors">
                        Edit
                      </button>
                      <button className="text-reported-text text-xs font-semibold hover:opacity-70 transition-opacity">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [notif,  setNotif]  = useState(true);
  const [emails, setEmails] = useState(true);
  const [maint,  setMaint]  = useState(false);

  return (
    <div className="space-y-4 animate-slide-up max-w-sm">
      <h1 className="text-ink-primary text-lg font-semibold">Settings</h1>

      <div className="card space-y-4">
        <p className="text-ink-secondary text-xs font-semibold uppercase tracking-wide">System</p>
        {[
          { label:"Admin notifications", desc:"Get alerts for new reports",      val:notif,  set:setNotif  },
          { label:"Email digests",        desc:"Daily summary to admin email",    val:emails, set:setEmails },
          { label:"Maintenance mode",     desc:"Disable public access to app",    val:maint,  set:setMaint  },
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

      <div className="card space-y-2">
        <p className="text-ink-secondary text-xs font-semibold uppercase tracking-wide mb-3">Danger zone</p>
        <button className="w-full text-xs font-medium text-reported-text border border-reported-border
                           bg-reported-bg rounded-xl px-4 py-2.5 hover:opacity-80 transition-opacity">
          Clear all reports
        </button>
        <button className="w-full text-xs font-medium text-reported-text border border-reported-border
                           bg-reported-bg rounded-xl px-4 py-2.5 hover:opacity-80 transition-opacity mt-2">
          Reset database
        </button>
      </div>
    </div>
  );
}

/* ─── Shared DogsTable ───────────────────────────────── */
function DogsTable({ rows, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-surface">
            {["Dog","Reporter","Status","Location","Date","Actions"].map(h => (
              <th key={h} className="text-left text-ink-hint font-semibold px-4 py-2.5
                                     text-[10px] uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, dog, reporter, status, location, date }) => (
            <tr key={id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
              <td className="px-4 py-3 text-ink-primary font-medium">{trunc(dog,6)}</td>
              <td className="px-4 py-3 text-ink-secondary">{trunc(reporter,5)}</td>
              <td className="px-4 py-3">
                <span className={statusBadge[status]}>{status}</span>
              </td>
              <td className="px-4 py-3 text-ink-secondary">{trunc(location,5)}</td>
              <td className="px-4 py-3 text-ink-secondary">{date}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link href={`/dogs/${id}`}
                    className="text-navy text-xs font-semibold hover:text-navy-dark transition-colors">
                    Edit
                  </Link>
                  {onDelete && (
                    <button onClick={() => onDelete(id)}
                      className="text-reported-text text-xs font-semibold hover:opacity-70 transition-opacity">
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────── */
export default function AdminDashboard() {
  const [activeKey, setActiveKey] = useState("Dashboard");

  const renderContent = () => {
    switch (activeKey) {
      case "Dashboard":   return <AdminHome onNavigate={setActiveKey} />;
      case "Manage Dogs": return <ManageDogs />;
      case "Reports":     return <AdminReports />;
      case "Pickups":     return <AdminPickups />;
      case "Statistics":  return <Statistics />;
      case "Users":       return <UsersPage />;
      case "Settings":    return <AdminSettings />;
      default:            return <AdminHome onNavigate={setActiveKey} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">

      {/* ── Sidebar ── */}
      <aside className="w-52 bg-navy-dark flex-col justify-between py-5 px-3
                        shrink-0 hidden sm:flex sticky top-0 h-screen">
        <div className="space-y-6">

          {/* Brand */}
          <div className="flex items-center gap-2.5 px-2 pb-2 border-b border-white/10">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">🐾</span>
            </div>
            <span className="text-white font-semibold text-sm">RescuePaws</span>
          </div>

          {/* Nav */}
          {sideMenu.map(({ section, items }) => (
            <div key={section} className="space-y-0.5">
              <p className="text-white/30 text-[9px] font-semibold tracking-widest px-2 mb-2">
                {section}
              </p>
              {items.map(({ key, label, icon, badge }) => (
                <button key={key} onClick={() => setActiveKey(key)}
                  className={`w-full flex items-center justify-between px-2.5 py-2
                              rounded-xl text-xs font-medium transition-all text-left
                              ${activeKey === key
                                ? "bg-white/15 text-white"
                                : "text-white/50 hover:bg-white/8 hover:text-white/80"}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{icon}</span>
                    {label}
                  </div>
                  {badge && (
                    <span className="bg-reported-text text-white text-[9px] font-semibold
                                     px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Admin user */}
        <div className="flex items-center gap-2.5 px-2 pt-4 border-t border-white/10">
          <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20
                          flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {adminUser.initials}
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-tight">{adminUser.name}</p>
            <p className="text-white/40 text-[10px]">{adminUser.role}</p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-border px-6 py-3.5 flex items-center
                           justify-between sticky top-0 z-10">
          <div>
            <p className="text-ink-hint text-[10px] font-medium uppercase tracking-wide">Admin Panel</p>
            <h1 className="text-ink-primary text-base font-semibold leading-tight">
              {activeKey}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rescued-text animate-pulse" />
              <span className="text-ink-hint text-xs hidden sm:block">Live</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center
                            text-white text-xs font-semibold">
              {adminUser.initials}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {renderContent()}
        </main>

      </div>
    </div>
  );
}