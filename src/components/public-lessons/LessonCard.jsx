"use client";

import { useSession } from "@/lib/auth-client";
import { Card, Button, Avatar } from "@heroui/react";
import Link from "next/link";
import { FiSmile, FiEye, FiGrid, FiCalendar, FiLock, FiArrowRight } from "react-icons/fi";

const LessonCard = ({ lesson }) => {
    if (!lesson) return null;

    const isPremium = lesson.accessLevel === "premium";
    const creatorName = lesson.creatorName || "Anonymous";

    const { data: session } = useSession();
    const user = session?.user;
    const premiumUser = user?.isPremium;
   
    // ULTRA PREMIUM LOCKED STATE WITH REDUCED SLICK BORDER SIZE
    if (isPremium && premiumUser !== true) {
        return (
            <Card className="relative bg-[#090416]/80 border border-white/4 rounded-2xl p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl min-h-72.5 flex flex-col justify-between overflow-hidden group">
                
                {/* 1. Optimized Animated Border Ray Effect */}
                <div className="absolute inset-0 max-w-full rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                    <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_45%,#f59e0b_50%,transparent_55%)] animate-[spin_4s_linear_infinite]" />
                </div>
                {/* Inner Card Mask - Set to 1.5px for an ultra-thin line */}
                <div className="absolute inset-[1.5px] bg-[#0c061a] rounded-[15px] z-0" />

                {/* 2. Pulsing Luxury Background Glow */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-40 h-40 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/15 group-hover:scale-110 transition-all duration-700 pointer-events-none z-0" />
                
                {/* Content Container */}
                <div className="relative z-10 flex flex-col gap-4">
                    {/* Glassy Premium Badge Header */}
                    <div className="flex items-center justify-between w-full">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse">
                            <FiLock className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-[0.2em] px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg backdrop-blur-md">
                            PRO EXCLUSIVE
                        </span>
                    </div>

                    <div className="space-y-2 text-center pt-2">
                        <h1 className="text-xl font-extrabold tracking-wide bg-linear-to-r from-white via-white to-amber-200 bg-clip-text text-transparent">
                            Premium Lesson
                        </h1>
                        <p className="text-sm text-white/50 leading-relaxed max-w-[95%] mx-auto">
                            Unlock this high-tier conceptual breakdown. Gain access to advanced resources, frameworks, and expert strategies.
                        </p>
                    </div>
                </div>

                {/* Bottom Premium Action Button */}
                <div className="relative z-10 pt-4 border-t border-white/5">
                    <Link href="/pricing" className="block">
                        <Button className="w-full bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 font-bold text-base h-11 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2 border border-white/20">
                            <span>Upgrade to Premium</span>
                            <FiArrowRight className="w-4 h-4 stroke-3" />
                        </Button>
                    </Link>
                </div>
            </Card>
        );
    }

    // REGULAR CARD STATE
    return (
        <Card className="relative group bg-[#0d071f]/60 border border-white/6 hover:border-purple-500/40 rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-xl overflow-hidden">

            {/* Hover premium ambient light effect */}
            <div className="absolute -inset-px bg-linear-to-r from-purple-500/0 via-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Badges Area */}
            <div className="flex items-center justify-between w-full mb-3.5 relative z-10">
                {/* Category Badge: Cyan Glass Style */}
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 bg-cyan-500/6 border border-cyan-400/20 text-cyan-300 rounded-xl backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <FiGrid className="w-3 h-3 text-cyan-400 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]" />
                    <span>{lesson.category || "General"}</span>
                </div>

                {/* Access Level Badge */}
                <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${
                    isPremium
                        ? "bg-amber-500/6 border-amber-400/20 text-amber-300 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.2)]"
                        : "bg-emerald-500/6 border-emerald-400/20 text-emerald-300"
                }`}>
                    {lesson.accessLevel || "Free"}
                </span>
            </div>

            {/* Header + Content */}
            <div className="flex flex-col gap-1.5 relative z-10">
                <Card.Title className="text-lg font-bold text-white tracking-wide leading-tight group-hover:text-purple-200 transition-colors line-clamp-1">
                    {lesson.lessonTitle}
                </Card.Title>

                <p className="text-sm text-white/60 leading-relaxed tracking-wide line-clamp-2">
                    {lesson.lessonDescription || "No description provided for this lesson log."}
                </p>
            </div>

            {/* Monochromatic Glass Style Emotional Tone Badge */}
            <div className="mt-3.5 mb-1 relative z-10">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/4 border border-white/10 w-fit px-2.5 py-1.5 rounded-xl backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                    <FiSmile className="w-3.5 h-3.5 text-purple-400 filter drop-shadow-[0_0_3px_rgba(168,85,247,0.4)]" />
                    <span className="capitalize tracking-wide">{lesson.emotionalTone || "Reflective"}</span>
                </div>
            </div>

            {/* Footer Area */}
            <Card.Footer className="p-0 pt-4 mt-4 border-t border-white/6 flex items-center justify-between w-full relative z-10">

                {/* Creator Profile & Date Info */}
                <div className="flex items-center gap-2.5">
                    <Avatar className="w-10 h-10 rounded-full border border-white/10 bg-white/5 overflow-hidden">
                        <Avatar.Image
                            src={lesson.creatorImage || "/avatar-placeholder.png"}
                            alt={creatorName}
                            className="w-full h-full object-cover"
                        />
                        <Avatar.Fallback
                            className="text-[10px] font-bold text-white/80 bg-linear-to-br from-purple-600/30 to-indigo-600/30 w-full h-full flex items-center justify-center"
                        >
                            {creatorName.charAt(0).toUpperCase()}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] uppercase font-semibold tracking-wider text-white/30">
                            Posted by
                        </span>
                        <span className="text-base font-bold text-white/90 line-clamp-1 max-w-28 tracking-wide">
                            {creatorName}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-white/40 font-medium mt-0.5">
                            <FiCalendar className="w-3 h-3 text-purple-400/70" />
                            <span>
                                {lesson.createdAt
                                    ? new Date(lesson.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                                    : "Recent"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details Button */}
                <Link href={`/lessons/${lesson._id}`}>
                    <Button
                        size="sm"
                        className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all active:scale-[0.97] flex items-center gap-1.5 cursor-pointer border border-white/10 shadow-lg shadow-purple-950/40"
                    >
                        <span>Details</span>
                        <FiEye className="w-3.5 h-3.5" />
                    </Button>
                </Link>
            </Card.Footer>

        </Card>
    );
};

export default LessonCard;