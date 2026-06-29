"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { FiHeart, FiEye, FiClock, FiShare2, FiCalendar, FiEdit3, FiFlag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthorCard from "./AuthorCard";
import CommentCard from "./CommentCard";
import { toggleLike } from "@/lib/actions/lessons";
import { toggleFavorite } from "@/lib/actions/favorites";
import ReportModal from "./ReportModal";
import { createLessonReport } from "@/lib/actions/lessonsReports";

const LessonDetailsManager = ({ lesson, user, totalFavorite, isFavorite }) => {
    const router = useRouter();
    const userId = user?.id;
    // 💡 রি-রেন্ডার লকড ভিউ কাউন্ট (প্রতি ক্লিকে চেঞ্জ হবে না)
    const viewsCount = useMemo(() => Math.floor(Math.random() * 10000), []);

    // ⏳ রিডিং টাইম ক্যালকুলেশন
    const wordCount = lesson.lessonDescription?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / 200) || 1;

    // 📅 ডেট ফরম্যাটিং ও আপডেট চেক
    const createdDate = lesson.createdAt?.$date || lesson.createdAt;
    const updatedDate = lesson.lastUpdated?.$date || lesson.lastUpdated;
    const isUpdated = updatedDate && new Date(updatedDate).getTime() !== new Date(createdDate).getTime();

    // 🔄 লাইক এবং ফেভারিট রিয়েল-টাইম স্টেট (আপনার ডাটার likesCount ব্যবহার করা হয়েছে)
    const hasLike = lesson.likes?.includes(userId);
    const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);
    const [isLiked, setIsLiked] = useState(hasLike || false);

    const [favorited, setFavorited] = useState(isFavorite || false);
    const [totalSaved, setTotalSaved] = useState(totalFavorite || 0);

    // ❤️ লাইক হ্যান্ডলার (Optimistic UI Update with prev)
    const handleLike = async (lessonId) => {
        if (!user) {
            toast.error("Please log in to like");
            return
        }
        if(user?.userRole !== "user"){
            toast.error("only users can like");
            return
        }


        // ক্লিক করার সাথে সাথে UI পরিবর্তন
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        const result = await toggleLike(lessonId, { userId });

        if (result?.modifiedCount > 0) {
            router.refresh();
            toast.success(isLiked ? "Removed from likes" : "Liked!");
        } else {
            // এপিআই ফেইল করলে আগের ডাটাতে রোলব্যাক
            setIsLiked(isLiked);
            setLikesCount(lesson.likesCount || 0);
            toast.error("Failed to update like");
        }
    };

    // 🔖 ফেভারিট হ্যান্ডলার (Optimistic UI Update with prev)
    const handleFavorite = async (lessonId) => {
        if (!user) {
            toast.error('Please log in to Saved');
            return
        }
          if(user?.userRole !== "user"){
            toast.error("Only users can saved");
            return
        }

        // ক্লিক করার সাথে সাথে UI পরিবর্তন
        setFavorited(!favorited);
        setTotalSaved(prev => favorited ? prev - 1 : prev + 1);

        const result = await toggleFavorite(lessonId, { userId, lessonId });

        if (result?.success) {
            setTotalSaved(result.total);
            setFavorited(result.isFavorite); // সার্ভার রেসপন্সের সাথে সিঙ্ক
            toast.success(result.message);
        } else {
            // এপিআই ফেইল করলে আগের ডাটাতে রোলব্যাক
            setFavorited(favorited);
            setTotalSaved(totalFavorite);
            toast.error("Failed to update favorite");
        }
    };


    // 🚩 রিপোর্ট হ্যান্ডলার
    const handleReport = async ({ reason, details }) => {

        const reportData = {
            lessonId: lesson._id,
            lessonTitle: lesson.lessonTitle,
            reporterUserId: user?.id,
            reporterUserEmail: user?.email,
            reportReason: reason,
            reportDetails: details || "",

        }
        const result = await createLessonReport(reportData);
        if (result.acknowledged) {
            toast.error("Lesson reported successfully. Our team will review it.");
        }

    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white text-left items-start w-full">

            {/* LEFT COLUMN: Main Content */}
            <div className="lg:col-span-2 space-y-6 w-full min-w-0">

                {/* 1. Header Metadata */}
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

                {/* 2. Banner Image */}
                {lesson.lessonImage && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/5">
                        <Image
                            src={lesson.lessonImage}
                            alt={lesson.lessonTitle}
                            fill
                            sizes="(max-width: 768px) 100vw, 70vw"
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                {/* 3. Description Content */}
                <article className="prose prose-invert max-w-none">
                    <p className="text-sm md:text-base text-white/80 leading-relaxed font-light whitespace-pre-line">
                        {lesson.lessonDescription}
                    </p>
                </article>

                {/* 4. Timeline Information Card */}
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

                {/* 5. Modern Button Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-white/5">

                    {/* Left side actions (Like & Favorite with integrated count) */}
                    <div className="flex flex-wrap items-center gap-2">

                        {/* 👍 Like Button */}
                        <Button
                            onClick={() => handleLike(lesson._id)}
                            size="sm"
                            className={`rounded-xl text-xs h-9 font-bold border transition-all duration-300 ${isLiked
                                    ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20"
                                    : "bg-rose-500/5 text-rose-400 border-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/40"
                                }`}
                        >
                            {isLiked ? <AiFillLike className="w-4 h-4" /> : <AiOutlineLike className="w-4 h-4" />}
                            <span>{isLiked ? "Liked" : "Like"} • {likesCount}</span>
                        </Button>

                        {/* 🔖 Favorite Button */}
                        <Button
                            onClick={() => handleFavorite(lesson._id)}
                            size="sm"
                            className={`rounded-xl text-xs h-9 font-bold border transition-all duration-300 ${favorited
                                    ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20"
                                    : "bg-amber-500/5 text-amber-400 border-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/40"
                                }`}
                        >
                            {favorited ? <FaHeart className="w-3.5 h-3.5" /> : <FiHeart className="w-3.5 h-3.5" />}
                            <span>{favorited ? "Favorited" : "Favorite"} • {totalSaved}</span>
                        </Button>
                    </div>

                    {/* Right side utilities (Share & Report with premium hover effects) */}
                    <div className="flex items-center gap-2">
                        {/* 📤 Share Button */}
                        <Button
                            size="sm"
                            variant="flat"
                            className="bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-xl text-xs h-9 transition-colors duration-200"
                            title="Share Lesson"
                        >
                            <FiShare2 className="w-4 h-4" />
                        </Button>

                        {/* 🚩 Report Button */}
                        <ReportModal user={user} handleReport={handleReport} />
                    </div>

                </div>
            </div>

            {/* RIGHT COLUMN: Sidebar Component Placement */}
            <div className="lg:col-span-1 space-y-6 w-full lg:border-l lg:border-white/5 lg:pl-5 flex flex-col">
                <AuthorCard lesson={lesson} user ={user} />
                <CommentCard lesson={lesson} user={user} />
            </div>

        </div>
    );
};

export default LessonDetailsManager;