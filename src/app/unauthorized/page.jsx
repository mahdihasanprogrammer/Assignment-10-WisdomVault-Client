"use client";

import Link from 'next/link';
import React from 'react';
import { LuKeyRound } from 'react-icons/lu'; // 🎯 সিকিউর কি লক আইকন
import { FiArrowLeft, FiLogIn } from 'react-icons/fi';

export default function Unauthorized() {
    return (
        <section className="min-h-screen w-full bg-[#030012] flex items-center justify-center p-4 relative overflow-hidden select-none">
            
            {/* 🔮 ব্যাকগ্রাউন্ডে অ্যাম্বিয়েন্ট গোল্ডেন-পার্পল অরা গ্লো */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-purple-500/[0.03] blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10">
                
                {/* 🔑 গ্লোয়িং কি আইকন কন্টেইনার */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8 shadow-[0_0_50px_rgba(245,158,11,0.08)] relative group">
                    <div className="absolute inset-0 bg-amber-500/5 rounded-2xl blur-md group-hover:blur-xl transition-all" />
                    {/* আইকনটি আলতো করে ওপরে-নিচে লুপ অ্যানিমেশন দেবে */}
                    <div className="animate-bounce [animation-duration:3s]">
                        <LuKeyRound className="w-9 h-9 relative z-10" />
                    </div>
                </div>

                {/* ⚠️ এরর কোড মেটা */}
                <span className="text-[11px] font-mono tracking-[0.4em] text-amber-400/80 uppercase font-black block mb-2">
                    Error Code: 401
                </span>
                
                {/* মেইন হেডিং উইথ গ্রেডিয়েন্ট */}
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
                    Identity <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-purple-400 bg-clip-text text-transparent">Required</span>
                </h1>

                {/* ডেসক্রিপশন */}
                <p className="text-xs sm:text-sm text-white/40 font-medium leading-relaxed max-w-sm mx-auto mb-10">
                    Your current session is either missing or unauthenticated. Please sign in with an authorized account to clear this barrier.
                </p>

                {/* 🛠️ অ্যাকশন বাটন গ্রুপ */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    
                    {/* পিছনে যাওয়ার বাটন */}
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/70 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12] text-xs font-bold font-mono uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <FiArrowLeft className="text-sm" />
                        Go Back
                    </button>

                    {/* সাইন ইন করার বাটন */}
                    <Link 
                        href="/signin"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold font-mono uppercase tracking-wider shadow-lg shadow-amber-500/10 border border-white/10 hover:opacity-95 transition-all active:scale-[0.98]"
                    >
                        <FiLogIn className="text-sm" />
                        Sign In Now
                    </Link>

                </div>

                {/* 🔒 সেফটি ট্যাগ */}
                <div className="mt-16 text-[9px] font-mono text-white/20 tracking-widest uppercase">
                     Identity Verification Protocol Layer
                </div>

            </div>
        </section>
    );
}