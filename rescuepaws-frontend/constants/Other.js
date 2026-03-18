
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