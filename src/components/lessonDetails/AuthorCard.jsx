"use client";

import { getLessonsByAuthor } from "@/lib/api/lessons";
import { Card, Avatar } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser, FiAward, FiBookOpen, FiArrowRight } from "react-icons/fi";

export default function AuthorCard({ lesson, user }) {
  const [totalLesson, setTotalLessons] = useState(0);

  useEffect(() => {
    const fetchAuthorLessons = async () => {
      try {
        const res = await getLessonsByAuthor(lesson.creatorId);
        if (res?.total !== undefined) {
          setTotalLessons(res.total);
        }
      } catch (err) {
        console.error("Error fetching author lessons count:", err);
      }
    };
    if (lesson.creatorId) {
      fetchAuthorLessons();
    }
  }, [lesson.creatorId]);

  return (
    <Card className="bg-linear-to-b from-[#10082a] via-[#0b051f] to-[#060211] border border-purple-500/20 p-6 rounded-3xl shadow-2xl text-left w-full relative overflow-hidden backdrop-blur-xl">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col gap-4 items-start relative z-10">
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] uppercase font-extrabold text-purple-400 tracking-widest flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg">
            <FiAward className="w-3 h-3 text-purple-400" /> Lesson Creator
          </span>
        </div>

        {/* Top Layout: Avatar & Metadata */}
        <div className="flex items-center gap-4 w-full">
          <div className="relative shrink-0">
            <Avatar className="w-16 h-16 border-2 border-purple-500/40 p-1 bg-purple-500/10 rounded-2xl shadow-lg shadow-purple-500/10">
              {lesson.creatorImage ? (
                <Avatar.Image
                  src={lesson.creatorImage}
                  alt={lesson.creatorName || "Author"}
                  referrerPolicy="no-referrer"
                  className="rounded-xl object-cover"
                />
              ) : (
                <Avatar.Fallback className="bg-[#150c38] rounded-xl flex items-center justify-center">
                  <FiUser className="w-7 h-7 text-purple-300" />
                </Avatar.Fallback>
              )}
            </Avatar>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#090418] rounded-full" title="Active Contributor" />
          </div>

          <div className="min-w-0 flex-1 space-y-0.5">
            <h2 className="text-lg font-black text-white tracking-tight truncate leading-tight">
              {lesson.creatorName || "Anonymous Creator"}
            </h2>
            <p className="text-white/40 text-xs truncate font-light">
              {lesson.creatorEmail || "Author Profile"}
            </p>
          </div>
        </div>

        {/* Total Lessons Counter Pill */}
        <div className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-2xl flex items-center justify-between text-xs backdrop-blur-md">
          <span className="text-white/50 font-medium flex items-center gap-1.5">
            <FiBookOpen className="text-purple-400 w-3.5 h-3.5" /> Published Wisdom:
          </span>
          <span className="font-black text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 rounded-lg shadow-inner">
            {totalLesson} {totalLesson === 1 ? "Lesson" : "Lessons"}
          </span>
        </div>

        {/* View Profile Action Link */}
        <Link
          href={`/profile/${lesson.creatorId}`}
          className="w-full py-3 rounded-2xl bg-linear-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 border border-purple-500/30 text-white text-xs font-bold tracking-wide transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-md"
        >
          <span>View Author Profile</span>
          <FiArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  );
}