"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

const MyLessonsLoading = () => {
  return (
    <div className="mx-auto w-full p-4 md:p-8 space-y-6">
      {/* Header Tier Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <Skeleton className="w-56 h-8 rounded-xl bg-white/10" />
          <Skeleton className="w-72 h-3.5 rounded bg-white/5" />
        </div>
        <Skeleton className="w-36 h-9 rounded-xl bg-purple-500/20" />
      </div>

      {/* Table Skeleton Container */}
      <div className="w-full bg-[#0d071f]/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <Skeleton className="w-40 h-4 rounded bg-white/10" />
          <Skeleton className="w-24 h-4 rounded bg-white/10" />
        </div>

        {/* Table Rows Skeleton */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between py-4 border-b border-white/5 gap-4"
          >
            <div className="space-y-2 w-1/3">
              <Skeleton className="w-3/4 h-4 rounded bg-white/10" />
              <Skeleton className="w-1/2 h-3 rounded bg-white/5" />
            </div>
            <Skeleton className="w-20 h-6 rounded-md bg-cyan-500/10" />
            <Skeleton className="w-16 h-6 rounded-md bg-emerald-500/10" />
            <Skeleton className="w-24 h-3.5 rounded bg-white/5" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-xl bg-white/10" />
              <Skeleton className="w-8 h-8 rounded-xl bg-rose-500/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLessonsLoading;
