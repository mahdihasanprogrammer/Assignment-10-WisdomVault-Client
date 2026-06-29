"use client";

import React from 'react';

const LoadingGlobal = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#050212] flex flex-col justify-center items-center select-none">
            
            {/* ব্যাকগ্রাউন্ড রিফাইনড গ্লো (যাতে স্পিনারের কালার পপ করে) */}
            <div className="absolute w-100 h-100 bg-purple-600/6 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute w-62.5 h-62.5bg-cyan-500/[0.04] blur-[100px] rounded-full pointer-events-none" />

            {/* গর্জিয়াস পিওর সিএসএস স্পিনার কন্টেইনার */}
            <div className="relative flex items-center justify-center w-32 h-32">
                
                {/* আউটার নিয়ন রিং */}
                <div 
                    className="absolute w-20 h-20 rounded-full border-2 border-solid border-transparent border-t-purple-500 border-r-pink-500 animate-spin"
                    style={{
                        animationDuration: '1.2s',
                        filter: "drop-shadow(0 0 15px rgba(168, 85, 247, 0.85))"
                    }}
                />

                {/* ইনার কাউন্টার-রোটেটিং রিং (এটি উল্টো দিকে ঘুরবে) */}
                <div 
                    className="absolute w-14 h-14 rounded-full border-[2.5px] border-solid border-transparent border-b-cyan-400 border-l-purple-400 animate-spin"
                    style={{
                        animationDirection: 'reverse',
                        animationDuration: '0.8s',
                        filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.7))"
                    }}
                />

                {/* সেন্ট্রাল কোর ডট (পালস ইফেক্টসহ) */}
                <div 
                    className="absolute w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_20px_#fff] animate-pulse"
                    style={{
                        animationDuration: '1.5s'
                    }}
                />
            </div>

            {/* ক্রিস্টাল ক্লিন টেক্সট সেকশন */}
            <div className="mt-8 text-center space-y-2 relative z-10">
                <h2 
                    className="text-xs font-black uppercase tracking-[0.4em] text-white/90 pl-[0.4em] animate-pulse"
                    style={{ animationDuration: '2s' }}
                >
                    Loading
                </h2>
                
                <p className="text-[10px] font-mono font-bold text-purple-400/50 uppercase tracking-widest">
                    Fetching Details...
                </p>
            </div>
        </div>
    );
};

export default LoadingGlobal;