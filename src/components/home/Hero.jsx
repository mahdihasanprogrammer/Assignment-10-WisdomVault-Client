"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
    const [swiper, setSwiper] = useState(null);

    const slidesData = [
        {
            tag: "Interactive Modules",
            titleNormal: "Unlock the Next Generation of ",
            titleHighlight: "Learning",
            desc: "Dive into expert-curated lessons, rich tech archives, and personalized progress models designed to scale your technical wisdom seamlessly.",
            ctaText: "Explore Lessons",
            ctaLink: "/public-lessons",
            imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
        },
        {
            tag: "Skill Assessment",
            titleNormal: "Test Your Brain with Smart ",
            titleHighlight: "Quizzes",
            desc: "Challenge your boundaries with automated tracking, dynamic programming evaluations, and instant analytical breakdowns on every submit.",
            ctaText: "Start Quiz",
            ctaLink: "/quizzes",
            imgSrc: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop",
        },
        {
            tag: "Personalized Space",
            titleNormal: "Your Tailored Academic ",
            titleHighlight: "Dashboard",
            desc: "Keep track of your favorites, bookmark advanced modules, add custom lessons, and monitor your engineering roadmap all inside one unified hub.",
            ctaText: "Go to Dashboard",
            ctaLink: "/dashboard",
            imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        },
        {
            tag: "Global Archive",
            titleNormal: "Securely Preserving Tomorrow's ",
            titleHighlight: "Wisdom",
            desc: "From advanced system architectures to foundational syntax rules, stack your knowledge inside a hyper-secure ecosystem protected by WisdomVault.",
            ctaText: "Join Now",
            ctaLink: "/signup",
            imgSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        }
    ];

    // ⬅️ বাম পাশের টেক্সট অ্যানিমেশন
    const leftTextVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 } 
        }
    };

    // ➡️ ডান পাশের ইমেজ অ্যানিমেশন
    const rightImageVariants = {
        hidden: { opacity: 0, x: 60 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 }
        }
    };

    return (
        <section className="relative w-full bg-[#080418] overflow-hidden py-12 md:py-16 border-b border-white/5 px-4 sm:px-6 lg:px-8">
            
            {/* Background Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                onSwiper={setSwiper}
                speed={600}
                pagination={{
                    clickable: true,
                    el: ".custom-swiper-pagination" // এই সিলেক্টরের সাথে নিচের ডিপ ট্যাগ করা
                }}
                className="px-6 md:px-12"
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index} className="w-full">
                        {({ isActive }) => (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-95 overflow-hidden">
                                
                                {/* ⬅️ Left Column: Text */}
                                <motion.div 
                                    className="lg:col-span-6 flex flex-col items-start text-left space-y-4 relative z-10"
                                    initial="hidden"
                                    animate={isActive ? "visible" : "hidden"}
                                    variants={leftTextVariants}
                                >
                                    <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                                        {slide.tag}
                                    </span>

                                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                                        {slide.titleNormal}
                                        <span className="text-purple-400">{slide.titleHighlight}</span>
                                    </h2>

                                    <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                                        {slide.desc}
                                    </p>

                                    <div className="pt-1">
                                        <Link
                                            href={slide.ctaLink}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20 border border-white/10 group"
                                        >
                                            <span>{slide.ctaText}</span>
                                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>

                                {/* ➡️ Right Column: Image */}
                                <div className="lg:col-span-6 w-full flex items-center justify-center relative group/box">
                                    <motion.div 
                                        className="relative w-full aspect-video lg:aspect-square lg:max-w-md rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl p-2 flex items-center justify-center"
                                        initial="hidden"
                                        animate={isActive ? "visible" : "hidden"}
                                        variants={rightImageVariants}
                                    >
                                        <Image
                                            src={slide.imgSrc}
                                            alt={slide.titleNormal}
                                            fill
                                            className="object-cover rounded-2xl grayscale-20 contrast-110 hover:grayscale-0 transition-all duration-300"
                                            sizes="(max-w-7xl) 50vw, 450px"
                                            priority={index === 0}
                                        />

                                        {/* Slider Navigation Buttons */}
                                        <div className="absolute bottom-4 left-0 right-0 z-50 flex items-center justify-center gap-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    swiper?.slidePrev();
                                                }}
                                                className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500/15 to-purple-500/20 hover:from-purple-600 hover:to-indigo-600 border border-purple-500/80 text-white flex items-center justify-center active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
                                            >
                                                <FiChevronLeft className="w-4 h-4" />
                                            </button>
                                            
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    swiper?.slideNext();
                                                }}
                                                className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500/15 to-purple-500/20 hover:from-purple-600 hover:to-indigo-600 border border-purple-500/80 text-white flex items-center justify-center active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
                                            >
                                                <FiChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 🎯 স্লাইডারের নিচের ডট কন্টেইনার (এটি আবার যোগ করা হলো) */}
            <div className="custom-swiper-pagination flex justify-center gap-2 mt-8 relative z-20" />

            {/* গ্লোবাল স্টাইল ওভাররাইড (ডটগুলোর চমৎকার লুকের জন্য) */}
            <style jsx global>{`
                .custom-swiper-pagination .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.2) !important;
                    width: 6px;
                    height: 6px;
                    border-radius: 9999px;
                    opacity: 1;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .custom-swiper-pagination .swiper-pagination-bullet-active {
                    background: #a855f7 !important;
                    width: 20px !important;
                    box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
                }
            `}</style>

        </section>
    );
}