"use client";

import { getLessonsByAuthor } from "@/lib/api/lessons";
import { Card, Avatar } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

export default function AuthorCard({ lesson }) {
  const [totalLesson, setTotalLessons] = useState(0);
  useEffect(()=>{
    const fetchAuthorLessons = async()=>{
      const {total} =await getLessonsByAuthor(lesson.creatorId)
      setTotalLessons(total)
    }
    fetchAuthorLessons()
  },[lesson.creatorId])
  return (
    <Card className="bg-linear-to-b from-[#0d071f] to-[#060211] border border-white/5 p-5 rounded-3xl shadow-xl text-left w-full">
      <div className="flex flex-col gap-4 items-start">
        <span className="text-[10px] uppercase font-bold text-purple-400 tracking-widest block">
          Author 
        </span>
        
        {/* টপ লেআউট: অ্যাভাটার এবং টেক্সট */}
        <div className="flex items-center gap-4 w-full">
          <Avatar className="w-16 h-16 border-2 border-purple-500/30 p-1 bg-purple-500/5 rounded-2xl shrink-0">
            {lesson.creatorImage ? (
              <Avatar.Image src={lesson.creatorImage} alt={lesson.creatorName}
              referrerPolicy="no-no-referrer" />
            ) : (
              <Avatar.Fallback><FiUser className="w-6 h-6 text-purple-400" /></Avatar.Fallback>
            )}
          </Avatar>
          
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black text-white tracking-tight truncate">{lesson.creatorName}</h2>
            <p className="text-white/40 text-xs truncate font-light">{lesson.creatorEmail}</p>
          </div>
        </div>

        {/* টোটাল লেসন কাউন্টার */}
        <div className="w-full bg-white/2 border border-white/5 p-3 rounded-xl flex items-center justify-between text-xs">
          <span className="text-white/40">Contributions:</span>
          <span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">{totalLesson} Lessons</span>
        </div>

        {/* লিঙ্ক বাটন - ফুল উইথ */}
        <Link 
          href={`/profile/${lesson.creatorId}`}
          className="w-full text-center py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-semibold tracking-wide transition-all duration-300 active:scale-[0.98]"
        >
          View all lessons
        </Link>
      </div>
    </Card>
  );
}