"use client";

import React from 'react';
import { Table, Button } from '@heroui/react';
import Link from 'next/link';
import { 
    FiEye, FiLock, FiDollarSign, FiUnlock,
    FiInfo, FiEdit3, FiTrash2, FiHeart, FiMessageSquare, FiBookOpen, FiPlus 
} from 'react-icons/fi';
import { EditLessonsFormWithModal } from '@/components/dashboard/EditLessonsFormWithModal';

const LessonsTable = ({ lessons, user }) => {
    
    const renderDate = (createdAt) => {
        const dateStr = createdAt?.$date || createdAt;
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="w-full bg-white/4 border border-white/10 backdrop-blur-2xl rounded-3xl px-6 py-10 shadow-2xl shadow-black/40 overflow-hidden">
            
            {/* টেবিল হেডার, টাইটেল এবং রাইট-সাইড বাটন */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        My Lessons — <span className="text-purple-400">Wisdom Logs</span>
                    </h1>
                    <p className="text-sm text-white/50 mt-1">
                        Auditing and managing your personal experiences.
                    </p>
                </div>
                
                {/* টপ রাইট অ্যাকশন গ্রূপ */}
                <div className="flex items-center gap-3 self-stretch sm:self-center justify-between sm:justify-end">
                    <div className="text-xs px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70">
                        Total: <span className="text-purple-400 font-bold">{lessons.length}</span>
                    </div>
                    {/* + Write New Lesson Button */}
                    <Link 
                        href="/dashboard/add-lesson"
                        size="sm"
                        className="px-4 h-9 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 hover:opacity-95 transition-all active:scale-[0.98] flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                        <FiPlus className="w-3.5 h-3.5" />
                        <span>Write New Lesson</span>
                    </Link>
                </div>
            </div>

            {/* রেসপনসিভ কন্টেইনার ফিক্স */}
            <Table aria-label="Wisdom Vault Records" className="w-full">
                <Table.ScrollContainer className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* ছোট ডিভাইসে টেবিল ভেঙে যাওয়া রোধ করতে min-w-[850px] বাধ্য করা হয়েছে */}
                    <Table.Content className="min-w-212.5">
                        <Table.Header>
                            <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider rounded-l-xl">Lesson Log Info</Table.Column>
                            <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Visibility</Table.Column>
                            <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Access Level</Table.Column>
                            <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Engagement</Table.Column>
                            <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Created At</Table.Column>
                            <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider rounded-r-xl text-right">Actions</Table.Column>
                        </Table.Header>
                        
                        <Table.Body>
                            {lessons.map((lesson, index) => (
                                <Table.Row key={lesson._id?.$oid || lesson._id || index} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    
                                    {/* ১. রো স্টার্ট আইকন, টাইটেল, ক্যাটাগরি ও টোন */}
                                    <Table.Cell className="py-4">
                                        <div className="flex items-start gap-3 max-w-sm">
                                            <div className="mt-1 p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                                                <FiBookOpen className="w-4 h-4" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-bold text-white truncate capitalize">
                                                    {lesson.lessonTitle}
                                                </p>
                                                <p className="text-[11px] text-white/50 font-medium mt-1 flex items-center gap-1.5 flex-wrap">
                                                    <span className="capitalize">{lesson.category?.replace('-', ' ')}</span>
                                                    <span className="text-purple-500/80">•</span>
                                                    <span className="capitalize text-purple-400">{lesson.emotionalTone}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    {/* ২. ভিজিবিলিটি ব্যাজ */}
                                    <Table.Cell>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border bg-white/5 border-white/10 text-white">
                                            {lesson.visibility === 'public' ? (
                                                <>
                                                    <FiEye className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-emerald-400">Public</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiLock className="w-3 h-3 text-amber-400" />
                                                    <span className="text-amber-400">Private</span>
                                                </>
                                            )}
                                        </div>
                                    </Table.Cell>

                                    {/* ৩. অ্যাক্সেস লেভেল ব্যাজ */}
                                    <Table.Cell>
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${lesson.accessLevel === 'premium' ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' : 'bg-white/5 border-white/10 text-white/80'}`}>
                                            {lesson.accessLevel === 'premium' ? (
                                                <>
                                                    <FiDollarSign className="w-3 h-3 text-purple-400" />
                                                    <span className="text-purple-300 font-semibold">Premium</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiUnlock className="w-3 h-3 text-white/50" />
                                                    <span className="text-white/70">Free</span>
                                                </>
                                            )}
                                        </div>
                                    </Table.Cell>

                                    {/* ৪. Engagement (হার্ট ও কমেন্ট) */}
                                    <Table.Cell>
                                        <div className="flex items-center gap-4 text-white/60 text-xs">
                                            <div className="flex items-center gap-1" title="Reactions/Love">
                                                <FiHeart className="w-3.5 h-3.5 text-rose-400/80" />
                                                <span>0</span>
                                            </div>
                                            <div className="flex items-center gap-1" title="Comments">
                                                <FiMessageSquare className="w-3.5 h-3.5 text-sky-400/80" />
                                                <span>0</span>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    {/* ৫. ক্রিয়েটেড ডেট */}
                                    <Table.Cell>
                                        <span className="text-xs text-white/60 font-medium">
                                            {renderDate(lesson.createdAt)}
                                        </span>
                                    </Table.Cell>

                                    {/* ৬. অ্যাকশন বাটনস */}
                                    <Table.Cell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button title="View Details" size="sm" isIconOnly className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl h-8 w-8 cursor-pointer">
                                                <FiInfo className="w-3.5 h-3.5" />
                                            </Button>
                                          
                                            <EditLessonsFormWithModal lesson={lesson} user={user}/>
                                            <Button title="Delete Lesson" size="sm" isIconOnly className="bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-xl h-8 w-8 cursor-pointer">
                                                <FiTrash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default LessonsTable;