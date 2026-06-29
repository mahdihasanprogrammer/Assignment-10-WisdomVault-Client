"use client";

import React from 'react';
import { motion } from 'framer-motion';

const LoadingGlobal = () => {
    return (
        <div className="min-h-screen bg-[#030014] flex flex-col justify-center items-center relative select-none">
            
            {/* ব্যাকগ্রাউন্ডে খুব হালকা একটি গ্লো (চোখে লাগবে না) */}
            <div className="absolute w-[300px] h-[300px] bg-purple-600/[0.02] blur-[120px] rounded-full pointer-events-none" />

            {/* ক্লাসিক অথচ প্রিমিয়াম স্পিনার */}
            <div className="relative flex items-center justify-center">
                
                {/* মেইন স্মুথ গ্রেডিয়েন্ট স্পিনার */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1, // ১ সেকেন্ডে একপাক ঘুরবে (খুবই স্মুথ)
                        ease: "linear"
                    }}
                    className="w-14 h-14 rounded-full border-[3px] border-solid border-purple-500/10 border-t-purple-500 border-r-purple-500/40"
                    style={{
                        // একটু গ্লোয়িং ভাইব দেওয়ার জন্য
                        boxShadow: "0 0 15px rgba(168, 85, 247, 0.05)"
                    }}
                />

                {/* স্পিনারের ঠিক মাঝখানে একটি স্থির ডট */}
                <div className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60" />
            </div>

            {/* নিচে একদম হালকা টেক্সট */}
            <motion.p 
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="mt-5 text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase"
            >
                Loading
            </motion.p>
        </div>
    );
};

export default LoadingGlobal;