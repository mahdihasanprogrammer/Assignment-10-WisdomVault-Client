"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { FiHeart, FiBookmark, FiEye, FiClock, FiFlag, FiShare2, FiCalendar, FiEdit3 } from "react-icons/fi";
import AuthorCard from "./AuthorCard";

import CommentCard from "./CommentCard";

const LessonDetailsManager = ({ lesson }) => {
    // Basic calculations
    const wordCount = lesson.lessonDescription?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / 200) || 1;
    const viewsCount = Math.floor(Math.random() * 10000);

    // Last Update Checking Logic
    const createdDate = lesson.createdAt?.$date || lesson.createdAt;
    const updatedDate = lesson.lastUpdated?.$date || lesson.lastUpdated;
    
    // যদি আপডেটেড ডেট না থাকে অথবা ক্রিয়েশন ডেটের সমান হয়, তবে নোটিফাই করবে
    const isUpdated = updatedDate && new Date(updatedDate).getTime() !== new Date(createdDate).getTime();

    return (
        /* ২-কলাম রেস্পন্সিভ গ্রিড লেআউট (ডেস্কটপে ২ কলাম, মোবাইলে ১ কলাম) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white text-left">
            
            {/* LEFT COLUMN: Takes 2 shares of space on large screens */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Lesson Information */}
                <div className="space-y-6">
                    {/* Clear Visibility Badges */}
                    <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                            <span className="opacity-50 text-[10px]">Category:</span> 
                            {lesson.category?.replace("-", " ")}
                        </span>
                        
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                            <span className="opacity-50 text-[10px]">Tone:</span> 
                            {lesson.emotionalTone}
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                        {lesson.lessonTitle}
                    </h1>

                    <div className="flex items-center gap-5 text-white/40 text-xs tracking-wider uppercase font-medium">
                        <div className="flex items-center gap-1.5">
                            <FiClock className="text-purple-400 w-4 h-4" />
                            <span>{readingTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FiEye className="text-purple-400 w-4 h-4" />
                            <span>{viewsCount.toLocaleString()} views</span>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {lesson.lessonImage && (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                        <Image 
                            src={lesson.lessonImage} 
                            alt={lesson.lessonTitle} 
                            fill
                            sizes="(max-w-4xl) 100vw, 850px"
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060211] via-transparent to-transparent opacity-40" />
                    </div>
                )}

                {/* Full Content Description */}
                <article className="prose prose-invert max-w-none">
                    <p className="text-base md:text-lg text-white/80 leading-relaxed font-light whitespace-pre-line">
                        {lesson.lessonDescription}
                    </p>
                </article>

                {/* 2. Lesson Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl backdrop-blur-md">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Created Date</span>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                            <FiCalendar className="text-cyan-400" />
                            <span>{new Date(createdDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Last Updated</span>
                        <div className="flex items-center gap-2 text-sm">
                            <FiEdit3 className={isUpdated ? "text-amber-400" : "text-white/20"} />
                            {/* Conditional Message Rendering */}
                            <span className={isUpdated ? "text-white/80" : "text-white/30 italic"}>
                                {isUpdated ? new Date(updatedDate).toLocaleDateString() : "Not updated yet"}
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Visibility</span>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                            <span className="capitalize">{lesson.visibility}</span>
                        </div>
                    </div>
                </div>

                {/* Engagement / Action Buttons Area */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-white/5">
                    <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1.5 font-bold"><FiHeart className="text-rose-500 fill-rose-500" /> 1.2K <span className="text-white/30 font-normal">Likes</span></span>
                        <span className="flex items-center gap-1.5 font-bold"><FiBookmark className="text-amber-500 fill-amber-500" /> 342 <span className="text-white/30 font-normal">Favorites</span></span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Button className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl font-bold text-xs"><FiHeart /> Like</Button>
                        <Button className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl font-bold text-xs"><FiBookmark /> Save</Button>
                        <Button variant="flat" className="bg-white/5 hover:bg-white/10 rounded-xl font-bold text-xs"><FiShare2 /> Share</Button>
                        <Button isIconOnly variant="light" className="text-white/30 hover:text-rose-400"><FiFlag /></Button>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Takes 1 share of space, holds Author & Comments */}
            <div className="lg:col-span-1 space-y-6 lg:border-l lg:border-white/5 lg:pl-6">
                {/* Author Card Component */}
                <AuthorCard lesson={lesson} />
                
                {/* Isolated Comment Component */}
                <CommentCard lesson={lesson} />
            </div>

        </div>
    );
};

export default LessonDetailsManager;