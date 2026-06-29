"use client";

import Link from 'next/link';
import React from 'react';
import { LuShieldAlert } from 'react-icons/lu'; // 🎯 সঠিক মডিউল থেকে আইকন ইম্পোর্ট
import { FiArrowLeft, FiHome } from 'react-icons/fi';

export default function Forbidden() {
    return (
        <section className="min-h-screen w-full bg-[#030012] flex items-center justify-center p-4 relative overflow-hidden select-none">
            
            {/* 🔮 ব্যাকগ্রাউন্ডে প্রিমিয়াম নিওন গ্লো */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-purple-600/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10">
                
                {/* 🛡️ গ্লোয়িং শিল্ড আইকন */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-8 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative group">
                    <div className="absolute inset-0 bg-red-500/5 rounded-2xl blur-md group-hover:blur-xl transition-all" />
                    <LuShieldAlert className="w-10 h-10 relative z-10 animate-pulse" />
                </div>

                {/* ⛔ এরর কোড ও টেক্সট */}
                <span className="text-[11px] font-mono tracking-[0.4em] text-red-400/80 uppercase font-black block mb-2">
                    Error Code: 403
                </span>
                
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
                    Access <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">Forbidden</span>
                </h1>

                <p className="text-xs sm:text-sm text-white/40 font-medium leading-relaxed max-w-sm mx-auto mb-10">
                    You do not have the necessary permissions to access this secured perimeter. Please verify your credentials or contact administration.
                </p>

                {/* 🛠️ অ্যাকশন বাটন গ্রুপ */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    
                    {/* গো ব্যাক বাটন */}
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/70 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12] text-xs font-bold font-mono uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <FiArrowLeft className="text-sm" />
                        Go Back
                    </button>

                    {/* হোম বাটন */}
                    <Link 
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold font-mono uppercase tracking-wider shadow-lg shadow-purple-500/20 border border-white/10 hover:opacity-95 transition-all active:scale-[0.98]"
                    >
                        <FiHome className="text-sm" />
                        Return Home
                    </Link>

                </div>

                {/* 🔒 ফুটনোট মেটা */}
                <div className="mt-16 text-[9px] font-mono text-white/20 tracking-widest uppercase">
                     WisdomVault Security Protocol Enabled
                </div>

            </div>
        </section>
    );
}