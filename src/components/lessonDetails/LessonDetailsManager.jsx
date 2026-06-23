"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { FiHeart, FiBookmark, FiEye, FiClock, FiFlag, FiShare2, FiCalendar, FiEdit3 } from "react-icons/fi";
import AuthorCard from "./AuthorCard";
import CommentCard from "./CommentCard";

const LessonDetailsManager = ({ lesson }) => {
    const wordCount = lesson.lessonDescription?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / 200) || 1;
    const viewsCount = Math.floor(Math.random() * 10000);

    const createdDate = lesson.createdAt?.$date || lesson.createdAt;
    const updatedDate = lesson.lastUpdated?.$date || lesson.lastUpdated;
    const isUpdated = updatedDate && new Date(updatedDate).getTime() !== new Date(createdDate).getTime();

    return (
        /* ২-কলাম রেস্পন্সিভ গ্রিড (ডেস্কটপে ৩ ভাগের ২ ভাগ বামে, ১ ভাগ ডানে) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white text-left items-start w-full">
            
            {/* LEFT COLUMN: Main content */}
            <div className="lg:col-span-2 space-y-6 w-full min-w-0">
                
                {/* 1. Lesson Information */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 py-0.5 px-2.5 text-[11px] font-medium uppercase tracking-wider rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <span className="opacity-40">Category:</span> {lesson.category?.replace("-", " ")}
                        </span>
                        <span className="inline-flex items-center gap-1 py-0.5 px-2.5 text-[11px] font-medium uppercase tracking-wider rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
                            <span className="opacity-40">Tone:</span> {lesson.emotionalTone}
                        </span>
                    </div>
                    
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                        {lesson.lessonTitle}
                    </h1>

                    <div className="flex items-center gap-4 text-white/40 text-[11px] uppercase tracking-wider">
                        <span className="flex items-center gap-1"><FiClock className="text-purple-400" /> {readingTime} min read</span>
                        <span className="flex items-center gap-1"><FiEye className="text-purple-400" /> {viewsCount.toLocaleString()} views</span>
                    </div>
                </div>

                {/* Featured Image */}
                {lesson.lessonImage && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/5">
                        <Image 
                            src={lesson.lessonImage} 
                            alt={lesson.lessonTitle} 
                            fill
                            sizes="w-sm"
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-invert max-w-none">
                    <p className="text-sm md:text-base text-white/80 leading-relaxed font-light whitespace-pre-line">
                        {lesson.lessonDescription}
                    </p>
                </article>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                    <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Created</span>
                        <div className="flex items-center gap-1.5 text-xs text-white/80">
                            <FiCalendar className="text-cyan-400" />
                            <span>{new Date(createdDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Last Updated</span>
                        <div className="flex items-center gap-1.5 text-xs">
                            <FiEdit3 className={isUpdated ? "text-amber-400" : "text-white/20"} />
                            <span className={isUpdated ? "text-white/80" : "text-white/30 italic"}>
                                {isUpdated ? new Date(updatedDate).toLocaleDateString() : "Not updated yet"}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Visibility</span>
                        <div className="flex items-center gap-1.5 text-xs text-white/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="capitalize">{lesson.visibility}</span>
                        </div>
                    </div>
                </div>

                {/* Engagement */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-white/5">
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 font-bold"><FiHeart className="text-rose-500 fill-rose-500" /> 1.2K</span>
                        <span className="flex items-center gap-1 font-bold"><FiBookmark className="text-amber-500 fill-amber-500" /> 342</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Button size="sm" className="bg-rose-500/10 text-rose-500 rounded-lg text-xs h-8"><FiHeart /> Like</Button>
                        <Button size="sm" className="bg-amber-500/10 text-amber-500 rounded-lg text-xs h-8"><FiBookmark /> Save</Button>
                        <Button size="sm" variant="flat" className="bg-white/5 text-white rounded-lg text-xs h-8"><FiShare2 /></Button>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Perfect box setup for Author Card & Comments */}
            <div className="lg:col-span-1 space-y-6 w-full lg:border-l lg:border-white/5 lg:pl-5 flex flex-col">
                <AuthorCard lesson={lesson} />
                <CommentCard lesson={lesson} />
            </div>

        </div>
    );
};

export default LessonDetailsManager;