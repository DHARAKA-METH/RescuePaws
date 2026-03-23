import { timeAgo } from "@/util/timeAgo";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export function DogCard2({ dog }) {
  const s = DOG_STATUS[dog.status] || DOG_STATUS.REPORTED;
  return (
    <div className="bg-white border border-[#D0DDE8] rounded-2xl overflow-hidden hover:border-[#90B3DD] hover:shadow-lg transition-all duration-200 group flex flex-col">
      <div
        className={`h-32 flex items-center justify-center relative flex-shrink-0 ${s.bg}`}
      >
        <span style={{ fontSize: 48 }}>🐕</span>
        <div className="absolute top-3 right-3">
          <StatusBadge status={dog.status} map={DOG_STATUS} />
        </div>
        <div className="absolute bottom-3 left-3 bg-white/80 rounded-lg px-2 py-0.5">
          <span className="text-[10px] text-[#6B8499] font-medium">
            {dog.gender} · {dog.age}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-medium text-[#1A2E42] text-sm mb-1.5 truncate">
          {dog.type}
        </h4>
        <p className="text-xs text-[#6B8499] flex items-center gap-1 mb-2">
          <MapPin size={10} className="flex-shrink-0" />
          <span className="truncate">{dog.place}</span>
        </p>
        <p className="text-xs text-[#A0B4C2] line-clamp-2 leading-relaxed flex-1">
          {dog.description}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D0DDE8]">
          <span className="text-[10px] text-[#A0B4C2] flex items-center gap-1">
            <Clock size={9} /> {timeAgo(dog.created_at)}
          </span>
          <Link
            href={`/dogs/${dog.id}`}
            className="text-xs font-medium flex items-center gap-0.5 
  text-[#1E3A5F] 
  opacity-100 md:opacity-0 
  group-hover:opacity-100 
  transition-opacity 
  hover:underline 
  underline-offset-2
"
          >
            View Details <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, map }) {
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

const DOG_STATUS = {
  REPORTED: {
    label: "Reported",
    cls: "bg-[#FDF2EA] text-[#9A5A2A] border border-[#E8B48A]",
    dot: "bg-[#C97B4B]",
    bg: "bg-[#FDF2EA]",
  },
  RESCUED: {
    label: "Rescued",
    cls: "bg-[#E8F5EE] text-[#1E6B47] border border-[#80CCA4]",
    dot: "bg-[#3D9970]",
    bg: "bg-[#E8F5EE]",
  },
  ADOPTED: {
    label: "Adopted",
    cls: "bg-[#E8F1FB] text-[#1A4F8A] border border-[#80AADE]",
    dot: "bg-[#3575B5]",
    bg: "bg-[#E8F1FB]",
  },
};
