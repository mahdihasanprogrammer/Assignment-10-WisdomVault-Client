"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#080418] relative flex items-center justify-center overflow-hidden p-4">
      
      {/* Background Neon Glowing Orbs (থিম গ্লো ইফেক্ট) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 md:w-125 h-75 md:h-125 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-62.5 h-62.5 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <div className="max-w-md w-full text-center relative z-10 bg-white/2 border border-white/10 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/80 flex flex-col items-center">
        
        {/* Animated Warning Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 shadow-inner">
          <FiAlertCircle className="w-8 h-8 animate-pulse" />
        </div>

        {/* 404 Header Text with linear */}
        <h1 className="text-7xl md:text-8xl font-black tracking-tight bg-linear-to-b from-white via-white to-white/30 bg-clip-text text-transparent leading-none mb-2">
          404
        </h1>

        <h2 className="text-xl font-bold text-white mb-3">
          Page Lost in Space
        </h2>

        <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-sm">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons Row */}
        <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center">
          
          {/* Go Back Button (Custom Glass Style) */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all active:scale-[0.98]"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {/* Go Home Button (Premium Purple linear) */}
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20 border border-white/10"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>

        </div>

        {/* Brand Bottom Meta */}
        <div className="mt-8 pt-6 border-t border-white/5 w-full">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
            WisdomVault Gateway Security
          </p>
        </div>

      </div>
    </div>
  );
}