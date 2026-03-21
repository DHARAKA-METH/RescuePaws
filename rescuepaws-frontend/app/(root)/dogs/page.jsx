"use client";
import DogCard from "@/component/Cart/DogCard";
import DogCardSkeleton from "@/component/Cart/DogCardSkeleton";
import Navbar from "@/component/NavBar";
import { TagCart } from "@/constants/Stats";
import { useDogs } from "@/hooks/useDogs";
import React from "react";

const Page = () => {
  const { data: dogs, isLoading } = useDogs();
  let value = dogs?.data?.length || 0;
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <Navbar />
      <section className="bg-navy text-white w-full h-[250px] flex flex-col px-12 md:px-18 py-12 gap-4">
        <div className=" flex flex-col md:flex-row justify-evenly">
          <h2 className="md:text-4xl text-2xl font-bold">All Dogs</h2>
          <p className="pl-4 pr-4 pt-1 pb-1 bg-white/10 rounded-full flex justify-center items-center">
            {value} Dogs
          </p>
        </div>
        <div className="flex justify-center items-center mt-3">
          <div className="flex justify-center items-center w-[750px] bg-white/10 h-12 rounded-2xl">
            <input
              type="text"
              placeholder="Search"
              className="w-[750px] h-12 rounded-2xl px-4 "
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-2 gap-4">
          {TagCart.map((item) => (
            <p
              key={item.value}
              className="pl-4 pr-4 pt-1 pb-1 bg-white/10 rounded-full flex justify-center items-center"
            >
              {item.value}
            </p>
          ))}
        </div>
      </section>
      <div className="flex justify-center items-center mt-2 gap-4  px-12 md:px-18 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <DogCardSkeleton key={i} />
              ))
            : dogs?.data?.map((dog, i) => (
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
  );
};

export default Page;
