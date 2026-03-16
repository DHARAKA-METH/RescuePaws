import Link from "next/link";

const statusMap = {
    Reported: "badge-reported",
    Rescued: "badge-rescued",
    Adopted: "badge-adopted",
};

const cardAccent = {
    Reported: "bg-reported-bg",
    Rescued: "bg-rescued-bg",
    Adopted: "bg-adopted-bg",
};

const dogEmoji = {
    "Golden Retriever": "🐕",
    "Mixed Breed": "🐩",
    "Labrador": "🐕‍🦺",
};

export default function DogCard({ id, name, location, status, time }) {
    const badge = statusMap[status] ?? "badge-reported";
    const imgBg = cardAccent[status] ?? "bg-surface";
    const emoji = dogEmoji[name] ?? "🐶";

    return (
        <div className="card flex flex-col w-[180px] animate-slide-up hover:-translate-y-0.5 transition-transform duration-200">

            {/* Image area */}
            <div className={`${imgBg} rounded-xl h-32 flex items-center justify-center text-5xl mb-4`}>
                {emoji}
            </div>

            {/* Body */}
            <div className="flex flex-col gap-1.5 flex-1">
                <h3 className="text-ink-primary font-semibold text-base leading-snug">
                    {name}
                </h3>

                <p className="text-ink-secondary text-xs font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block flex-shrink-0" />
                    {location}
                </p>

                <span className={badge}>{status}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="text-ink-hint text-xs">{time}</span>
                <Link
                    href={`/dogs/${id}`}
                    className="btn-outline text-xs px-3 py-1.5"
                >
                    View Details
                </Link>
            </div>

        </div>
    );
}