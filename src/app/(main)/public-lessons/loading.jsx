"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

const PublicLessonsLoading = () => {
  return (
    <div className="px-4 md:px-8 mx-auto py-6 bg-[#060211] min-h-screen text-white flex flex-col gap-10">
      
      {/* Header Skeleton */}
      <div className="flex flex-col items-center text-center mt-8 gap-3 relative z-10">
        <Skeleton className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10" />
        <Skeleton className="w-64 sm:w-80 h-9 rounded-xl bg-white/5" />
        <Skeleton className="w-full max-w-xl h-4 rounded-lg bg-white/5" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="relative z-20 bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl backdrop-blur-xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-xl">
        <Skeleton className="w-full md:w-72 h-11 rounded-xl bg-white/5" />
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Skeleton className="w-36 h-10 rounded-xl bg-white/5" />
          <Skeleton className="w-36 h-10 rounded-xl bg-white/5" />
          <Skeleton className="w-28 h-10 rounded-xl bg-white/5" />
        </div>
      </div>

      {/* Grid of 6 Lesson Card Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between gap-5 shadow-xl relative overflow-hidden"
          >
            {/* Top Author Tier */}
            <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="w-28 h-3.5 rounded bg-white/10" />
                  <Skeleton className="w-20 h-2.5 rounded bg-white/5" />
                </div>
              </div>
              <Skeleton className="w-20 h-6 rounded-lg bg-purple-500/10" />
            </div>

            {/* Content Tier */}
            <div className="space-y-3">
              <Skeleton className="w-3/4 h-5 rounded-lg bg-white/10" />
              <Skeleton className="w-full h-3.5 rounded bg-white/5" />
              <Skeleton className="w-5/6 h-3.5 rounded bg-white/5" />
            </div>

            {/* Bottom Actions Tier */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <Skeleton className="w-24 h-6 rounded-md bg-white/5" />
              <Skeleton className="w-9 h-9 rounded-xl bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-4">
        <Skeleton className="w-64 h-10 rounded-xl bg-white/5" />
      </div>

    </div>
  );
};

export default PublicLessonsLoading;
