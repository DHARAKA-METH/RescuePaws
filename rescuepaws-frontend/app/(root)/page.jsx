"use client";

import NavBar from "@/component/NavBar";
import StatCart from "@/component/Cart/StatCart";
import DogCard from "@/component/Cart/DogCard";
import DogCardSkeleton from "@/component/Cart/DogCardSkeleton";
import { Steps } from "@/constants/Stepts";
import Link from "next/link";
import { useDogs } from "@/hooks/useDogs";



export default function HomePage() {
    const { data: dogs, isLoading } = useDogs();
    console.log("dogs  -----------",dogs);
    
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

      <div className="flex justify-center bg-white text-navy min-h-screen md:flex flex-col items-center px-6 md:px-12 py-16 gap-4">
        <h2 className="text-ink-primary text-xl font-semibold mb:mr-[450px] mt-[-20px] mb-2.5">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {Steps.map((step, i) => (
            <div
              key={step.number}
              className="card flex flex-col w-[180px] h-[250px] gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Step number pill */}
              <div className="w-8 h-8 rounded-full bg-navy-light border border-border
                                flex items-center justify-center
                                text-ink-secondary text-xs font-semibold flex-shrink-0">
                {step.number}
              </div>

              <span className="text-3xl leading-none">{step.emoji}</span>

              <div>
                <p className="text-ink-primary font-semibold text-sm mb-1">
                  {step.title}
                </p>
                <p className="text-ink-secondary text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-auto max-w-3xl mt-12">
          <div className="flex flex-col md:flex-row  items-center justify-between md:gap-10 gap-3 mb-5">
            <h2 className="text-ink-primary text-xl font-semibold">
              Latest reported dogs
            </h2>
            <Link
              href="/dogs"
              className="text-navy text-sm font-medium hover:text-navy-dark
                         transition-colors flex items-center gap-1"
            >
              View all →
            </Link>
          </div>
          
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  {isLoading
    ? Array.from({ length: 6 }).map((_, i) => (
        <DogCardSkeleton key={i} />
      ))
    : dogs?.data
        ?.slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
        .map((dog, i) => (
          <div
            key={dog.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <DogCard {...dog} />
          </div>
        ))}
</div>

        </div>
      </div>

    </section>
  );
}
