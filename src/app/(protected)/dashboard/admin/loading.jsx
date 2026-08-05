"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

const AdminDashboardLoading = () => {
  return (
    <div className="space-y-6 container mx-auto px-4 md:px-6 py-8 text-white">
      
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="w-64 sm:w-80 h-8 rounded-xl bg-white/10" />
        <Skeleton className="w-72 h-3.5 rounded bg-white/5" />
      </div>

      {/* 4 Stats Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border border-white/6 rounded-2xl bg-[#070314]/50 backdrop-blur-xl p-5 flex items-center justify-between shadow-xl"
          >
            <div className="space-y-2">
              <Skeleton className="w-28 h-3 rounded bg-white/5" />
              <Skeleton className="w-16 h-7 rounded-lg bg-white/10" />
            </div>
            <Skeleton className="w-11 h-11 rounded-xl bg-purple-500/10" />
          </div>
        ))}
      </div>

      {/* Main Grid: Charts + Top Contributors */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Left Analytics Charts Skeleton (2 cols) */}
        <div className="xl:col-span-2 border border-white/6 rounded-2xl bg-[#070314]/50 backdrop-blur-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/6 pb-4">
            <Skeleton className="w-48 h-4 rounded bg-white/10" />
            <Skeleton className="w-24 h-7 rounded-lg bg-white/5" />
          </div>
          <div className="h-64 sm:h-80 w-full flex items-end justify-between gap-3 px-2">
            {[50, 80, 40, 95, 65, 85, 55, 75, 45, 90].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 h-full justify-end">
                <Skeleton className="w-full rounded-t-lg bg-purple-500/15" style={{ height: `${h}%` }} />
                <Skeleton className="w-6 h-3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Top Contributors Leaderboard Skeleton (1 col) */}
        <div className="border border-white/6 rounded-2xl bg-[#070314]/50 backdrop-blur-xl p-5 shadow-xl h-full space-y-4">
          <div className="flex items-center gap-3 border-b border-white/6 pb-4">
            <Skeleton className="w-5 h-5 rounded bg-amber-500/20" />
            <div className="space-y-1">
              <Skeleton className="w-36 h-4 rounded bg-white/10" />
              <Skeleton className="w-28 h-2.5 rounded bg-white/5" />
            </div>
          </div>

          <div className="space-y-3.5">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/1 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-4 rounded bg-white/10" />
                  <Skeleton className="w-8 h-8 rounded-full bg-purple-500/10 shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="w-28 h-3 rounded bg-white/10" />
                    <Skeleton className="w-36 h-2.5 rounded bg-white/5" />
                  </div>
                </div>
                <Skeleton className="w-16 h-6 rounded-lg bg-purple-500/10 shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardLoading;
