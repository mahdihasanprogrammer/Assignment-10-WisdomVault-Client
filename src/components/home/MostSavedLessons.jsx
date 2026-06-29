import { getMostSavedLessons } from '@/lib/api/lessons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiBookmark, FiUser, FiFolder, FiArrowUpRight } from 'react-icons/fi';

const MostSavedLessons = async () => {
    // ডাটা ফেচিং
    const savedLessons = await getMostSavedLessons() || [];

    return (
        <section className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-[#030012] w-full relative overflow-hidden">
            {/* ব্যাকগ্রাউন্ড অরা গ্লো */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/[0.02] blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* 🎯 সেন্টার-অ্যালাইনড সেকশন হেডার */}
                <div className="text-center mb-20 max-w-xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase font-bold block">
                         Community Favorites
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                        Most Saved <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Lessons</span>
                    </h2>
                    <p className="text-xs text-white/40 font-medium leading-relaxed pt-1">
                        Explore the highest-rated resources bookmarked by students and creators worldwide.
                    </p>
                </div>

                {/* লেসন গ্রিড লেআউট */}
                {savedLessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedLessons.map((lesson) => (
                            <div 
                                key={lesson._id}
                                className="relative border border-white/[0.05] rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-md p-5 flex flex-col justify-between group hover:border-white/[0.12] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] h-full"
                            >
                                <div>
                                    {/* টপ বার: ক্যাটাগরি ও নিওন বুকমার্ক কাউন্টার */}
                                    <div className="flex items-center justify-between mb-5 w-full">
                                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 uppercase">
                                            <FiFolder className="text-[11px]" /> {lesson.category || "General"}
                                        </span>

                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-xs font-mono font-black shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                            <FiBookmark className="fill-amber-400 text-[11px]" /> 
                                            <span>{lesson.saveCount || 0} Saves</span>
                                        </div>
                                    </div>

                                    {/* লেসন থাম্বনেইল কভার ইমেজ */}
                                    {lesson.thumbnail && (
                                        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/[0.06] mb-4 bg-white/5">
                                            <Image 
                                                src={lesson.thumbnail} 
                                                alt={lesson.title || "Lesson Thumbnail"}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-w-768px) 100vw, 350px"
                                            />
                                        </div>
                                    )}

                                    {/* লেসন টাইটেল */}
                                    <h3 className="text-base font-bold text-white/90 line-clamp-2 group-hover:text-white transition-colors tracking-tight mb-4 font-sans">
                                        {lesson.title}
                                    </h3>
                                </div>

                                {/* বটম বার: ক্রিয়েটর প্রোফাইল এবং ডিটেইলস লিংক */}
                                <div className="space-y-4 pt-4 border-t border-white/[0.04] mt-auto">
                                    <div className="flex items-center justify-between w-full">
                                        
                                        {/* ক্রিয়েটর পড */}
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/[0.1] bg-white/5 flex-shrink-0">
                                                {lesson.creatorImage ? (
                                                    <Image
                                                        src={lesson.creatorImage}
                                                        alt={lesson.creatorName || "Creator"}
                                                        fill
                                                        sizes="28px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold bg-white/5 text-white/40 font-mono">
                                                        {lesson.creatorName?.substring(0, 1).toUpperCase() || 'U'}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-white/50 truncate max-w-[120px]">
                                                by {lesson.creatorName || "Anonymous"}
                                            </span>
                                        </div>

                                        {/* ডিটেইলস বাটন লিংক */}
                                        <Link href={`/public-lessons/${lesson._id}`} className="flex items-center gap-1 text-[11px] font-mono font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-wider">
                                            View Details
                                            <FiArrowUpRight className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Link>

                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-white/[0.05] rounded-3xl text-xs text-white/20 font-mono">
                        No highly saved lessons recorded yet.
                    </div>
                )}
            </div>
        </section>
    );
};

export default MostSavedLessons;