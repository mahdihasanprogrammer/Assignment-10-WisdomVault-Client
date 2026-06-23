"use client";

import { Table } from "@heroui/react";
import Link from "next/link";
import { FiCalendar, FiLock, FiGlobe, FiEye } from "react-icons/fi";

export default function AuthorLessonsTable({ lessons = [] }) {
  return (
    <div className="w-full bg-linear-to-b from-[#0d071f]/40 to-[#060211]/60 border border-white/5 rounded-3xl  backdrop-blur-xl shadow-2xl text-left">
      <Table.ScrollContainer className="custom-scrollbar">
        <Table className="w-full" aria-label="Author lessons data table">
          <Table.Content>
            
            {/* টেবিল হেডার */}
            <Table.Header>
              <Table.Column className="text-white/50 text-xs font-bold uppercase tracking-wider bg-white/2 py-4">
                Lesson Title
              </Table.Column>
              <Table.Column className="text-white/50 text-xs font-bold uppercase tracking-wider bg-white/2">
                Category
              </Table.Column>
              <Table.Column className="text-white/50 text-xs font-bold uppercase tracking-wider bg-white/2">
                Emotional Tone
              </Table.Column>
              <Table.Column className="text-white/50 text-xs font-bold uppercase tracking-wider bg-white/2">
                Visibility
              </Table.Column>
              <Table.Column className="text-white/50 text-xs font-bold uppercase tracking-wider bg-white/2">
                Created Date
              </Table.Column>
              <Table.Column className="text-white/50 text-xs font-bold uppercase tracking-wider bg-white/2 text-right pr-6">
                Action
              </Table.Column>
            </Table.Header>

            {/* টেবিল বডি লুপ */}
            <Table.Body>
              {lessons.map((lesson) => {
                const isPublic = lesson.visibility === "public";
                const createdDate = lesson.createdAt?.$date || lesson.createdAt;

                return (
                  <Table.Row 
                    key={lesson._id?.$oid || lesson._id} 
                    className="border-b border-white/4 hover:bg-white/2 transition-colors duration-200 group"
                  >
                    {/* লেসন টাইটেল */}
                    <Table.Cell className="py-4 font-semibold text-white/90 max-w-xs truncate">
                      {lesson.lessonTitle}
                    </Table.Cell>

                    {/* ক্যাটাগরি */}
                    <Table.Cell>
                      <span className="px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        {lesson.category?.replace("-", " ")}
                      </span>
                    </Table.Cell>

                    {/* ইমোショナル টোন */}
                    <Table.Cell>
                      <span className="px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide rounded-md bg-pink-500/10 border border-pink-500/20 text-pink-400">
                        {lesson.emotionalTone}
                      </span>
                    </Table.Cell>

                    {/* ভিজিবিলিটি স্ট্যাটাস */}
                    <Table.Cell>
                      <div className="flex items-center gap-1.5 text-xs">
                        {isPublic ? (
                          <>
                            <FiGlobe className="text-emerald-400 w-3.5 h-3.5" />
                            <span className="text-emerald-400/90 font-medium capitalize">{lesson.visibility}</span>
                          </>
                        ) : (
                          <>
                            <FiLock className="text-amber-400 w-3.5 h-3.5" />
                            <span className="text-amber-400/90 font-medium capitalize">{lesson.visibility}</span>
                          </>
                        )}
                      </div>
                    </Table.Cell>

                    {/* ডেট */}
                    <Table.Cell className="text-xs text-white/40">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="w-3.5 h-3.5 text-purple-400/60" />
                        <span>{new Date(createdDate).toLocaleDateString()}</span>
                      </div>
                    </Table.Cell>

                    {/* আইকন অ্যাকশন বাটন */}
                    <Table.Cell className="text-right pr-4">
                      <Link 
                        href={`/public-lessons/${lesson._id?.$oid || lesson._id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 hover:bg-purple-600 border border-purple-500/20 hover:border-purple-500 text-purple-400 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0)] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table>
      </Table.ScrollContainer>

      {/* এম্পটি স্টেট */}
      {lessons.length === 0 && (
        <div className="text-center text-white/20 py-12 text-sm italic">
          No lessons found for this author.
        </div>
      )}
    </div>
  );
}