import { getTopContributorsData } from '@/lib/api/lessons';
import Image from 'next/image';
import React from 'react';
import { FaCrown, FaMedal, FaAward, FaBookOpen, FaEnvelope } from 'react-icons/fa';

const TopContributors = async () => {
    // ব্যাকএন্ড থেকে টপ ৩ কন্ট্রিবিউটরের ডাটা ফেচ করা হচ্ছে
    const topContributors = await getTopContributorsData() || [];

    const getRankStyles = (index) => {
        switch (index) {
            case 0:
                return { 
                    icon: <FaAward className="text-amber-400 w-5 h-5" />, 
                    glow: "from-amber-500/[0.06] to-transparent border-amber-500/30 shadow-[0_20px_50px_rgba(245,158,11,0.05)]",
                    rankText: "text-amber-400"
                };
            case 1:
                return { 
                    icon: <FaMedal className="text-slate-300 w-5 h-5" />, 
                    glow: "from-slate-500/[0.04] to-transparent border-slate-500/20 shadow-[0_20px_50px_rgba(203,213,225,0.02)]",
                    rankText: "text-slate-300"
                };
            case 2:
                return { 
                    icon: <FaMedal className="text-amber-700 w-5 h-5" />, 
                    glow: "from-amber-700/[0.03] to-transparent border-amber-900/20",
                    rankText: "text-amber-600"
                };
            default:
                return { icon: null, glow: "from-white/[0.01] to-transparent border-white/[0.04]", rankText: "text-white/40" };
        }
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030014] w-full">
            {/* ব্যাকগ্রাউন্ড মেগা লাইটিং অরা */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-purple-600/3blur-[180px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* সেকশন হেডার */}
                <div className="text-center mb-20">
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-mono tracking-widest uppercase">
                        Hall of Fame
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mt-4">
                        Top <span className="bg-linear-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Contributors</span>
                    </h2>
                </div>

                {/* লার্জার কার্ড গ্রিড লেআউট */}
                {topContributors.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {topContributors.map((user, idx) => {
                            const rankStyle = getRankStyles(idx);
                            const isPremium = user?.accessLevel === 'premium' || user?.isPremium === true;

                            return (
                                <div 
                                    key={user.creatorId || idx}
                                    className={`relative border rounded-3xl p-8 bg-linear-to-b ${rankStyle.glow} backdrop-blur-xl transition-all duration-500 hover:border-white/15 group flex flex-col justify-between h-full min-h-105`}
                                >
                                    
                                    {/* টপ বার: র্যাঙ্ক মেডেল এবং প্রিমিয়াম স্ট্যাটাস ব্যাজ */}
                                    <div className="flex items-center justify-between w-full mb-8">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/3 border border-white/8 rounded-xl">
                                            {rankStyle.icon}
                                            <span className={`text-xs font-mono font-black ${rankStyle.rankText}`}>
                                                RANK #0{idx + 1}
                                            </span>
                                        </div>

                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase border ${
                                            isPremium 
                                                ? "bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]" 
                                                : "bg-white/5 border-white/10 text-white/40"
                                        }`}>
                                            {isPremium ? (
                                                <>
                                                    <FaCrown className="text-[10px] animate-pulse" /> Premium
                                                </>
                                            ) : (
                                                "Standard"
                                            )}
                                        </div>
                                    </div>

                                    {/* বিশাল বড় এবং স্পষ্ট প্রোফাইল এরিয়া */}
                                    <div className="flex flex-col items-center text-center mb-8">
                                        {/* লার্জ স্কেল প্রোফাইল ইমেজ */}
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-4 bg-linear-to-b from-white/12 to-transparent shadow-2xl mb-5">
                                            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#09051c]">
                                                {user?.creatorImage ? (
                                                    <Image
                                                        src={user.creatorImage} 
                                                        alt={user.creatorName || "Contributor"} 
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        fill
                                                        sizes="(max-w-112px) 100vw, 112px"
                                                        priority
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white/20 font-mono">
                                                        {user?.creatorName?.substring(0, 2).toUpperCase() || 'U'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* নাম এবং ক্রিয়েটর ইমেইল ডিসপ্লে */}
                                        <div className="space-y-1 w-full px-2">
                                            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight truncate">
                                                {user?.creatorName || "Anonymous User"}
                                            </h3>
                                            
                                            {/* ইমেইল এড্রেস ডিসপ্লে */}
                                            <div className="flex items-center justify-center gap-1.5 text-white/40 group-hover:text-white/60 transition-colors">
                                                <FaEnvelope className="text-[10px] text-purple-400/70" />
                                                <span className="text-sm font-medium truncate max-w-55 font-mono">
                                                    {user?.creatorEmail || "no-email@platform.com"}
                                                </span>
                                            </div>

                                            <p className="text-[10px] font-mono text-white/55 pt-1">
                                                ID: {user?.creatorId ? `${user.creatorId}` : "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Shared Lesson মডার্ন ফুল-উইডথ স্লট */}
                                    <div className="w-full bg-white/2border border-white/5 p-4 rounded-2xl flex items-center justify-between group-hover:bg-purple-500/2 group-hover:border-purple-500/20 transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 text-sm">
                                                <FaBookOpen />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-white/80">Lessons Published</p>
                                                <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider">Shared Content</p>
                                            </div>
                                        </div>
                                        
                                        <span className="text-2xl font-black tracking-tight bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent font-mono">
                                            {user?.contribute || 0}
                                        </span>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl text-xs text-white/20 font-mono">
                        No platform contributors recorded yet.
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopContributors;