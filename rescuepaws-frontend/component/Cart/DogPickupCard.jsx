import { StatusBadge } from "@/constants/Other";
import { timeAgo } from "@/util/timeAgo";
import {
  MapPin,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
export function DogPickupCard({ pickup }) {
  const PICKUP_STATUS = {
  COMPLETED: { label:'Completed', cls:'bg-[#E8F5EE] text-[#1E6B47] border border-[#80CCA4]' },
  PENDING:   { label:'Pending',   cls:'bg-[#FDF2EA] text-[#9A5A2A] border border-[#E8B48A]' },
}
  return (
    <div className="bg-white border border-[#D0DDE8] rounded-2xl p-5 hover:border-[#90B3DD] hover:shadow-lg transition-all duration-200 group flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#ECF2F8] flex items-center justify-center flex-shrink-0 text-xl">
            🚐
          </div>
          <div className="min-w-0">
            <h4 className="font-medium text-[#1A2E42] text-sm truncate">
              {pickup.dogType}
            </h4>
            <p className="text-xs text-[#6B8499] flex items-center gap-1 mt-0.5">
              <MapPin size={9} className="flex-shrink-0" />
              <span className="truncate">{pickup.place}</span>
            </p>
          </div>
        </div>
        <StatusBadge status={pickup.status} map={PICKUP_STATUS} />
      </div>

      <div className="bg-[#F4F7FA] rounded-xl p-3 border border-[#D0DDE8]">
        <p className="text-xs text-[#6B8499] leading-relaxed">
          <span className="font-medium text-[#1A2E42]">Note: </span>
          {pickup.notes}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-[10px] text-[#A0B4C2]">
          <Calendar size={10} />
          <span>{timeAgo(pickup.scheduledAt)}</span>
        </div>
        <Link
          href={`/dogs/${pickup.dogId}`}
          className="text-xs text-[#1E3A5F] font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:underline underline-offset-2"
        >
          View Dog <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}