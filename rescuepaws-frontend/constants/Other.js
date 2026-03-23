
// report dog page constants item

export const ageOptions = ["Puppy (<1yr)", "Adult (1–3yr)", "Adult (3–7yr)", "Senior (7yr+)", "Unknown"];
export const genderOptions = ["Male", "Female", "Unknown"]; 
export const submissionGuide = [
  "Provide accurate location",
  "Upload clear photos",
  "Describe visible injuries",
  "Note the dog's behavior",
];

export const statusInfo = [
  { badge: "badge-reported", color: "text-reported-text", label: "Your report is submitted" },
  { badge: "badge-rescued",  color: "text-rescued-text",  label: "Dog is safe"              },
  { badge: "badge-adopted",  color: "text-adopted-text",  label: "Found a home"             },
];



// user profile

export const navLinks = [
  { href: "/",           label: "Home"       },
  { href: "/dogs",       label: "Dogs"       },
  { href: "/report-dog", label: "Report Dog" },
];

export const sideMenu = [
  {
    section: "MENU",
    items: [
      { key: "Dashboard",   label: "Dashboard",   icon: "📊" },
      { key: "My Reports",  label: "My Reports",  icon: "🐾" },
      { key: "My Pickups",  label: "My Pickups",  icon: "🚐" },
    ],
  },
  {
    section: "ACCOUNT",
    items: [
      { key: "Profile",  label: "Profile",  icon: "👤" },
      { key: "Settings", label: "Settings", icon: "⚙️" },
    ],
  },
];


//  profile cart


export function StatusBadge({ status, map }) {
  const s = map[status];
  if (!s) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${s.cls}`}
    >
      {s.dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      )}
      {s.label}
    </span>
  );
}


export function EmptyState({ icon, message, sub }) {
  return (
    <div className="bg-white border border-[#D0DDE8] rounded-2xl py-20 flex flex-col items-center gap-3 shadow-sm">
      <span style={{ fontSize: 44 }}>{icon}</span>
      <p className="font-medium text-[#1A2E42] text-base">{message}</p>
      <p className="text-sm text-[#6B8499]">{sub}</p>
    </div>
  );
}