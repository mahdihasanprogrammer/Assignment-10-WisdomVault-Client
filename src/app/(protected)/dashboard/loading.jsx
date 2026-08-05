"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

const DashboardLoading = () => {
  return (
    <div className="p-4 sm:p-8 bg-[#080418] min-h-screen text-white space-y-8">
      
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <Skeleton className="w-56 sm:w-72 h-8 rounded-xl bg-white/10" />
          <Skeleton className="w-64 h-3.5 rounded bg-white/5" />
        </div>
        <Skeleton className="w-36 h-9 rounded-xl bg-purple-500/20" />
      </div>

      {/* Stats Counter Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1 */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden shadow-xl space-y-3">
          <Skeleton className="w-11 h-11 rounded-xl bg-purple-500/10" />
          <Skeleton className="w-16 h-8 rounded-lg bg-white/10" />
          <Skeleton className="w-36 h-3 rounded bg-white/5" />
          <Skeleton className="w-48 h-3 rounded bg-white/5" />
        </div>

        {/* Card 2 */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden shadow-xl space-y-3">
          <Skeleton className="w-11 h-11 rounded-xl bg-indigo-500/10" />
          <Skeleton className="w-16 h-8 rounded-lg bg-white/10" />
          <Skeleton className="w-36 h-3 rounded bg-white/5" />
          <Skeleton className="w-48 h-3 rounded bg-white/5" />
        </div>

        {/* Card 3 - Navigation Shortcuts */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="w-32 h-4 rounded bg-white/10" />
            <Skeleton className="w-40 h-3 rounded bg-white/5" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Skeleton className="h-14 rounded-xl bg-white/5" />
            <Skeleton className="h-14 rounded-xl bg-white/5" />
          </div>
        </div>

      </div>

      {/* Main Charts & Recent Lessons Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Skeleton (2 cols) */}
        <div className="lg:col-span-2 border border-white/10 bg-white/3 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Skeleton className="w-5 h-5 rounded bg-purple-500/20" />
            <Skeleton className="w-48 h-4 rounded bg-white/10" />
          </div>
          <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-3 px-4 pt-4">
            {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 h-full justify-end">
                <Skeleton className="w-full rounded-t-lg bg-purple-500/15" style={{ height: `${h}%` }} />
                <Skeleton className="w-8 h-3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Recently Added List Skeleton (1 col) */}
        <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <Skeleton className="w-32 h-4 rounded bg-white/10" />
              <Skeleton className="w-16 h-3 rounded bg-purple-400/20" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between gap-3">
                  <div className="space-y-2 min-w-0 flex-1">
                    <Skeleton className="w-3/4 h-3.5 rounded bg-white/10" />
                    <Skeleton className="w-20 h-2.5 rounded bg-white/5" />
                  </div>
                  <Skeleton className="w-14 h-5 rounded bg-emerald-500/10 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardLoading;
