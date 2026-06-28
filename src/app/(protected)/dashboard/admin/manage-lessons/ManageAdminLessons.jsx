"use client";

import React from 'react';
import Image from 'next/image';
import { Table, Chip, Avatar, Tooltip, Button } from '@heroui/react';
import { FiStar, FiCheckCircle, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import { changeLessonFeatured, changeLessonStatus } from '@/lib/actions/lessons';
import { useRouter, useSearchParams } from 'next/navigation';
import PermanentlyDeleteLessonModal from '@/components/dashboard/admin/manage-lessons/PermanentlyDeleteLessonModal';

const categories = [
    { id: "all", label: "All Categories" },
    { id: "personal-growth", label: "Personal Growth" },
    { id: "career", label: "Career" },
    { id: "relationships", label: "Relationships" },
    { id: "mindset", label: "Mindset" },
    { id: "mistakes-learned", label: "Mistakes Learned" },
];

const ManageAdminLessons = ({ initialLessons }) => {
    const lessons = initialLessons;
    const router = useRouter();
    const searchParams = useSearchParams();

    const hasActiveQuery = searchParams.has('category') || searchParams.has('visibility');

    const handleSelectChange = (name, value) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        router.push(`?${params.toString()}`);
    };

    const handleResetFilters = () => {
        router.push('?');
    };

    const handleApprove = async (id) => {
        try {
            const result = await changeLessonStatus(id);
            if (result.success) {
                toast.success("Lesson approved successfully!");
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to approve lesson.");
        }
    };

    const handleToggleFeatured = async (id, isFeatured) => {
        try {
            const currentStatus = !isFeatured;
            const result = await changeLessonFeatured(id, { currentStatus });
            if (result.success) {
                toast.success(isFeatured ? "Removed from featured" : "Marked as Featured!");
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to update featured status.");
        }
    };

    const handleLessonDeleteSuccess = () => {
        toast.success("Lesson deleted successfully!");
        router.refresh();
    };

    return (
        <div className="border border-white/[0.06] rounded-2xl bg-[#070314]/50 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(139,92,246,0.15)]">

            {/* কন্ট্রোল ফিল্টার বার */}
            <div className="flex flex-wrap items-center gap-4 px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
                <div className="relative group">
                    <select
                        name="category"
                        value={searchParams.get('category') || "all"}
                        onChange={(e) => handleSelectChange('category', e.target.value)}
                        className="w-48 bg-[#0d0921] hover:bg-[#130f2e] text-white/90 font-semibold text-xs py-2.5 px-3.5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none transition-all cursor-pointer appearance-none"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id} className="bg-[#0e0a24] text-white/90">
                                {cat.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                </div>

                <div className="relative group">
                    <select
                        name="visibility"
                        value={searchParams.get('visibility') || "all"}
                        onChange={(e) => handleSelectChange('visibility', e.target.value)}
                        className="w-40 bg-[#0d0921] hover:bg-[#130f2e] text-white/90 font-semibold text-xs py-2.5 px-3.5 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none transition-all cursor-pointer appearance-none"
                    >
                        <option value="all" className="bg-[#0e0a24] text-white/90">All visibility</option>
                        <option value="public" className="bg-[#0e0a24] text-white/90">Public</option>
                        <option value="private" className="bg-[#0e0a24] text-white/90">Private</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                </div>

                {hasActiveQuery && (
                    <div
                        onClick={handleResetFilters}
                        className="flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-200 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm select-none hover:bg-purple-500/20"
                    >
                        <span>Clear Filter</span>
                        <FiX className="w-3.5 h-3.5" />
                    </div>
                )}
            </div>

            {/* Table Component */}
            <Table removeWrapper aria-label="Lessons management table" className="text-white">
                <Table.ScrollContainer>
                    <Table.Content>
                        <Table.Header>
                            <Table.Column isRowHeader className="bg-transparent text-white/40 font-bold text-[11px] uppercase tracking-wider py-4 border-b border-white/[0.06] pl-6">LESSON</Table.Column>
                            <Table.Column className="bg-transparent text-white/40 font-bold text-[11px] uppercase tracking-wider py-4 border-b border-white/[0.06]">CREATOR</Table.Column>
                            <Table.Column className="bg-transparent text-white/40 font-bold text-[11px] uppercase tracking-wider py-4 border-b border-white/[0.06]">CATEGORY</Table.Column>
                            <Table.Column className="bg-transparent text-white/40 font-bold text-[11px] uppercase tracking-wider py-4 border-b border-white/[0.06]">VISIBILITY</Table.Column>
                            <Table.Column className="bg-transparent text-white/40 font-bold text-[11px] uppercase tracking-wider py-4 border-b border-white/[0.06]">STATUS</Table.Column>
                            <Table.Column className="bg-transparent text-white/40 font-bold text-[11px] uppercase tracking-wider py-4 text-center border-b border-white/[0.06] pr-6">ACTIONS</Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={<p className="text-xs text-white/30 py-8 font-semibold">No lessons found matching the filters.</p>}>
                            {lessons.map((lesson) => (
                                <Table.Row key={lesson._id} className="border-b border-white/[0.03] hover:bg-white/[0.02] hover:shadow-[inset_4px_0_0_0_#a855f7] transition-all duration-150">

                                    <Table.Cell className="py-4 pl-6">
                                        <div className="flex flex-col max-w-50">
                                            <p className="font-bold text-sm text-white/95 line-clamp-1">{lesson.lessonTitle}</p>
                                            <p className="text-[11px] text-white/50 font-semibold line-clamp-1 mt-0.5">{lesson.lessonDescription}</p>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2.5">
                                            <Avatar className="w-7 h-7 ring-1 ring-white/10 overflow-hidden rounded-full">
                                                <Avatar.Image
                                                    as={Image}
                                                    src={lesson.creatorImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"}
                                                    alt={lesson.creatorName || "User"}
                                                    width={28}
                                                    height={28}
                                                    unoptimized
                                                    className="object-cover w-full h-full"
                                                />
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-white/90">{lesson.creatorName}</span>
                                                <span className="text-[10px] text-white/40 font-mono font-semibold tracking-tight">{lesson.creatorEmail}</span>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="px-2 py-0.5 bg-white/3 border border-white/5 rounded text-[10px] font-bold text-purple-300">
                                            {lesson.category}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="dot"
                                            color={lesson.visibility === 'public' ? 'success' : 'warning'}
                                            className="capitalize text-xs font-bold tracking-wide px-1 h-5 bg-white/5 border-none "
                                        >
                                            {lesson.visibility}
                                        </Chip>
                                    </Table.Cell>

                                    {/* 100% ফিক্সড কন্ডিশনাল স্ট্যাটাস ডিজাইন (variant="bordered" দিয়ে ওভাররাইড করা হয়েছে) */}
                                    <Table.Cell>
                                        {lesson.status === 'Approved' ? (
                                            <Chip
                                                size="sm"
                                                variant="bordered"
                                                className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 h-5.5 rounded-lg"
                                            >
                                                Approved
                                            </Chip>
                                        ) : (
                                            <Chip
                                                size="sm"
                                                variant="bordered"
                                                className="bg-amber-500/15 border-amber-500/40 text-amber-400 text-[10px] font-bold px-2.5 h-5.5 rounded-lg shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                                            >
                                                Pending
                                            </Chip>
                                        )}
                                    </Table.Cell>

                                    <Table.Cell className="pr-6">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* Approve Button */}
                                            {lesson.status !== 'Approved' && (
                                                <Tooltip content="Approve lesson" delay={0} closeDelay={0} size="sm">
                                                    <Button
                                                        aria-label="Approve this lesson"
                                                        className="p-1.5 text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer bg-transparent size-8"
                                                        onClick={() => handleApprove(lesson._id)}
                                                    >
                                                        <FiCheckCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Tooltip.Content>
                                                        <p>This is a tooltip</p>
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            )}
                                            

                                            {/* Featured Button */}
                                            <Tooltip delay={0} closeDelay={0} size="sm">
                                                <Button
                                                    aria-label={lesson.isFeatured ? "Remove from featured" : "Make featured"}
                                                    className={`p-1.5 rounded-lg transition-all cursor-pointer size-8 bg-transparent ${lesson.isFeatured ? 'text-amber-400 bg-amber-500/10' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
                                                    onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                                                >
                                                    <FiStar className={`w-4 h-4 ${lesson.isFeatured ? 'fill-amber-400' : ''}`} />
                                                </Button>
                                                <Tooltip.Content>
                                                    <p>{ lesson.isFeatured ? "Remove Featured" : "Make Featured" }</p>
                                                </Tooltip.Content>
                                            </Tooltip>

                                            {/* ডিলিট বাটন (ডিফল্ট রেড কালার ও নো-ব্যাকগ্রাউন্ড স্কিম) */}
                                            <div className="delete-btn-red-only">
                                                <Tooltip content="Delete Lesson" delay={0} closeDelay={0} size="sm">
                                                    <div>
                                                        <PermanentlyDeleteLessonModal
                                                            lesson={lesson}
                                                            onDeleteSuccess={handleLessonDeleteSuccess}
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            {/* ডিলিট বাটনে নো-ব্যাকগ্রাউন্ড, রেড আইকন এবং রেড হোভার ইফেক্ট গ্লোবাল ইনজেকশন */}
            <style jsx global>{`
                .delete-btn-red-only button {
                    background: transparent !important;
                    border: none !important;
                    padding: 6px !important;
                    color: #ef4444 !important; /* Default Red Icon Color */
                    opacity: 0.9;
                    border-radius: 8px !important;
                    transition: all 0.2s ease-in-out !important;
                }
                .delete-btn-red-only button:hover {
                    opacity: 1;
                    color: #dc2626 !important; /* Darker Red on Hover */
                    background: rgba(239, 68, 68, 0.15) !important; /* Smooth Red Ghost Glow */
                }
                .delete-btn-red-only button span {
                    display: none !important;
                }
            `}</style>
        </div>
    );
};

export default ManageAdminLessons;