import NavBar from "@/component/NavBar";
import StatCart from "@/component/Cart/StatCart";
import Link from "next/link";


const SAMPLE_DOGS = [
  { id: '1', type: 'Golden Retriever', description: 'Found near railway station. Friendly, no collar.', location: 'Colombo Fort', status: 'REPORTED', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '2', type: 'Mixed Breed', description: 'Rescued from Negombo beach. Healthy and calm.', location: 'Negombo Beach', status: 'RESCUED', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', type: 'Labrador', description: 'Adopted by a loving family in Kandy.', location: 'Kandy City', status: 'ADOPTED', createdAt: new Date(Date.now() - 259200000).toISOString() },
]


export default function HomePage() {
  return (
    <section >
      <NavBar />
      <div className="bg-navy text-white min-h-screen flex items-center px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-25 w-auto">

          {/* LEFT */}
          <div className="flex flex-col gap-6 flex-1">


            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-adopted-border"></span>
              <span className="text-xs font-semibold text-white/80">
                Community Dog Rescue <br /> Network
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Help <br />
              Rescue <br />
              Stray Dogs <br />
              in Your <br />
              Community
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-white/60 max-w-xs leading-relaxed">
              Report stray dogs, track their rescue status, and help connect
              animals with their forever homes. Every report makes a difference.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-2">

              <Link
                href="/report-dog"
                className="bg-white text-navy font-bold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Report <br /> a Dog
              </Link>

              <Link
                href="/dogs"
                className="flex items-center gap-1 bg-white/10 border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition"
              >
                View All Dogs →
              </Link>

            </div>
          </div>
          {/* right */}
          <div className="w-full md:w-[300px]">
            <div className="grid grid-cols-2 gap-4">
              <StatCart value="356" label="Total Dogs" color="text-reported-text" />
              <StatCart value="356" label="Rescued" color="text-rescued-text" />
              <StatCart value="356" label="Reported" color="text-reported-text" />
              <StatCart value="356" label="Volunteers" color="text-adopted-accent" />

            </div>


          </div>


        </div>
      </div>
    </section>
  )
}
