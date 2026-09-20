"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import {
  FiHeart,
  FiEye,
  FiClock,
  FiShare2,
  FiCalendar,
  FiEdit3,
  FiTag,
  FiSmile,
  FiGlobe,
  FiBookOpen,
} from "react-icons/fi";
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

  // 💡 রেন্ডার-সেফ ভিউ কাউন্ট
  const viewsCount = useMemo(() => {
    if (lesson.viewsCount) return lesson.viewsCount;
    let hash = 0;
    const str = lesson._id || "lesson";
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 9000) + 1024;
  }, [lesson._id, lesson.viewsCount]);

  // ⏳ রিডিং টাইম ক্যালকুলেশন
  const wordCount = lesson.lessonDescription?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  // 📅 ডেট ফরম্যাটিং ও আপডেট চেক
  const createdDate = lesson.createdAt?.$date || lesson.createdAt;
  const updatedDate = lesson.lastUpdated?.$date || lesson.lastUpdated;
  const isUpdated =
    updatedDate &&
    new Date(updatedDate).getTime() !== new Date(createdDate).getTime();

  // 🔄 লাইক এবং ফেভারিট রিয়েল-টাইম স্টেট
  const hasLike = lesson.likes?.includes(userId);
  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);
  const [isLiked, setIsLiked] = useState(hasLike || false);

  const [favorited, setFavorited] = useState(isFavorite || false);
  const [totalSaved, setTotalSaved] = useState(totalFavorite || 0);

  // ❤️ লাইক হ্যান্ডলার
  const handleLike = async (lessonId) => {
    if (!user) {
      toast.error("Please log in to like");
      return;
    }
    if (user?.userRole !== "user") {
      toast.error("Only registered users can like lessons");
      return;
    }

    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    const result = await toggleLike(lessonId, { userId });

    if (result?.modifiedCount > 0) {
      router.refresh();
      toast.success(isLiked ? "Removed from likes" : "Liked!");
    } else {
      setIsLiked(isLiked);
      setLikesCount(lesson.likesCount || 0);
      toast.error("Failed to update like");
    }
  };

  // 🔖 ফেভারিট হ্যান্ডলার
  const handleFavorite = async (lessonId) => {
    if (!user) {
      toast.error("Please log in to save lessons");
      return;
    }
    if (user?.userRole !== "user") {
      toast.error("Only registered users can save lessons");
      return;
    }

    setFavorited(!favorited);
    setTotalSaved((prev) => (favorited ? prev - 1 : prev + 1));

    const result = await toggleFavorite(lessonId, { userId, lessonId });

    if (result?.success) {
      setTotalSaved(result.total);
      setFavorited(result.isFavorite);
      toast.success(result.message);
    } else {
      setFavorited(favorited);
      setTotalSaved(totalFavorite);
      toast.error("Failed to update favorite");
    }
  };

  // 📤 শেয়ার হ্যান্ডলার
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lesson link copied to clipboard!");
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
    };
    const result = await createLessonReport(reportData);
    if (result?.acknowledged) {
      toast.success("Lesson reported successfully. Our team will review it.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 text-white text-left items-start w-full">
      {/* LEFT COLUMN: Main Content */}
      <div className="lg:col-span-2 space-y-8 w-full min-w-0">
        
        {/* 1. Side-by-Side Hero Section: Compact Image + Larger Details Column */}
        <div className="bg-linear-to-b from-[#0e0826]/90 to-[#080418]/90 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            
            {/* Small Compact Image (Side Column) */}
            {lesson.lessonImage && (
              <div className="w-full md:w-56 lg:w-64 aspect-[4/3] shrink-0 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e0826]/60 shadow-[0_0_30px_rgba(168,85,247,0.15)] group">
                <Image
                  src={lesson.lessonImage}
                  alt={lesson.lessonTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 260px"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#060211] via-transparent to-transparent opacity-20 pointer-events-none" />
              </div>
            )}

            {/* Larger Details Column next to Image */}
            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 py-1 px-3 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <FiTag className="w-3 h-3 text-cyan-400" />
                  <span>{lesson.category?.replace("-", " ")}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 py-1 px-3 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-pink-500/10 border border-pink-500/25 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                  <FiSmile className="w-3 h-3 text-pink-400" />
                  <span>{lesson.emotionalTone}</span>
                </span>

                {lesson.visibility && (
                  <span className="inline-flex items-center gap-1.5 py-1 px-3 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{lesson.visibility}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.25] text-white">
                {lesson.lessonTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-white/50 text-xs font-medium tracking-wide pt-1">
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                  <FiClock className="text-purple-400 w-3.5 h-3.5" /> {readingTime} min read
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                  <FiEye className="text-cyan-400 w-3.5 h-3.5" /> {viewsCount.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                  <FiCalendar className="text-indigo-400 w-3.5 h-3.5" /> {new Date(createdDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Description Content Card */}
        <div className="bg-linear-to-b from-[#0e0826]/80 to-[#080418]/90 border border-white/10 p-6 md:p-9 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 text-purple-400 text-xs uppercase font-extrabold tracking-widest border-b border-white/5 pb-3">
            <FiBookOpen className="w-4 h-4" />
            <span>Lesson Insights & Wisdom</span>
          </div>

          <article className="prose prose-invert max-w-none">
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-normal whitespace-pre-line tracking-normal">
              {lesson.lessonDescription}
            </p>
          </article>
        </div>

        {/* 3. Timeline & Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-[#0e0828]/80 border border-white/10 p-4.5 rounded-2xl backdrop-blur-xl shadow-lg">
          <div className="space-y-1 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
              Published
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
              <FiCalendar className="text-cyan-400 w-4 h-4" />
              <span>{new Date(createdDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-1 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
              Last Updated
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <FiEdit3
                className={isUpdated ? "text-amber-400 w-4 h-4" : "text-white/30 w-4 h-4"}
              />
              <span
                className={isUpdated ? "text-white/90" : "text-white/40 italic font-normal"}
              >
                {isUpdated
                  ? new Date(updatedDate).toLocaleDateString()
                  : "Not updated yet"}
              </span>
            </div>
          </div>

          <div className="space-y-1 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
              Visibility
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
              <FiGlobe className="text-emerald-400 w-4 h-4" />
              <span className="capitalize">{lesson.visibility || "Public"}</span>
            </div>
          </div>
        </div>

        {/* 4. Interactive Action Row (Like, Favorite, Share, Report) */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md">
          {/* Left side actions (Like & Favorite) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 👍 Like Button */}
            <Button
              onClick={() => handleLike(lesson._id)}
              size="sm"
              className={`rounded-xl text-xs h-10 px-4 font-bold border transition-all duration-300 cursor-pointer ${
                isLiked
                  ? "bg-rose-500 text-white border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.35)] scale-105"
                  : "bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/40"
              }`}
            >
              {isLiked ? (
                <AiFillLike className="w-4 h-4" />
              ) : (
                <AiOutlineLike className="w-4 h-4" />
              )}
              <span>
                {isLiked ? "Liked" : "Like"} • {likesCount}
              </span>
            </Button>

            {/* 🔖 Favorite Button */}
            <Button
              onClick={() => handleFavorite(lesson._id)}
              size="sm"
              className={`rounded-xl text-xs h-10 px-4 font-bold border transition-all duration-300 cursor-pointer ${
                favorited
                  ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-105"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40"
              }`}
            >
              {favorited ? (
                <FaHeart className="w-3.5 h-3.5" />
              ) : (
                <FiHeart className="w-3.5 h-3.5" />
              )}
              <span>
                {favorited ? "Favorited" : "Favorite"} • {totalSaved}
              </span>
            </Button>
          </div>

          {/* Right side utilities (Share & Report) */}
          <div className="flex items-center gap-2.5">
            {/* 📤 Share Button */}
            <Button
              onClick={handleShare}
              size="sm"
              className="bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-xl text-xs h-10 px-3.5 font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              title="Share Lesson Link"
            >
              <FiShare2 className="w-4 h-4 text-purple-300" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            {/* 🚩 Report Button */}
            <ReportModal user={user} handleReport={handleReport} />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar (Author & Comments) */}
      <div className="lg:col-span-1 space-y-6 w-full flex flex-col">
        <AuthorCard lesson={lesson} user={user} />
        <CommentCard lesson={lesson} user={user} />
      </div>
    </div>
  );
};

export default LessonDetailsManager;
