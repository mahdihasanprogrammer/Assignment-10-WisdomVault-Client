import { getMyFavoritesLessons } from "@/lib/api/favorites";
import { getLessonByCreatorId } from "@/lib/api/lessons";
import { getUserSession } from "@/lib/session";
import Link from "next/link";
import { FiBookOpen, FiHeart, FiPlus, FiGrid, FiArrowRight, FiActivity } from "react-icons/fi";
import { Button } from "@heroui/react";
import DashboardChart from "@/components/dashboard/Dashboard";


const DashboardHomePage = async () => {
    const user = await getUserSession();
    if (!user?.id) return <div className="text-white p-8">Unauthorized access. Please login.</div>;
    if (user?.role !=="user") return <div className="text-white p-8">Forbidden access. Please login.</div>;

    // প্যারালাল ডাটা ফেচিং
    const [totalSaveLesson, lessonsData] = await Promise.all([
        getMyFavoritesLessons(user.id),
        getLessonByCreatorId(user.id)
    ]);

    // ডাটা যদি অ্যারে হিসেবে সরাসরি আসে তা নিশ্চিত করা
    const lessons = Array.isArray(lessonsData) ? lessonsData : [];

    // রিসেন্টলি অ্যাডেড লেসন (সর্বশেষ ৩টি লেসন ফিল্টার)
    const recentLessons =lessons.slice(0, 3);

    return (
        <div className="p-4 sm:p-8 bg-[#080418] min-h-screen text-white space-y-8">
            
            {/* হেডার জোন */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent">
                        Welcome Back, {user?.name || "Learner"}
                    </h1>
                    <p className="text-xs text-white/40 mt-1">Here is your personal workspace and matrix insights.</p>
                </div>
                
                {/* কুইক শর্টকাট অ্যাকশন */}
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/add-lesson">
                        <Button size="sm" className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs h-9 rounded-xl px-4 flex items-center gap-1.5 shadow-lg shadow-purple-600/20 cursor-pointer">
                            <FiPlus className="w-3.5 h-3.5" /> Create Lesson
                        </Button>
                    </Link>
                </div>
            </div>

            {/* কাউন্টার স্ট্যাটস কার্ডস গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden shadow-xl">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl w-fit mb-4">
                        <FiBookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-black block">{lessons.length}</span>
                    <span className="text-xs text-white/40 font-semibold uppercase tracking-wider mt-1 block">Total Lessons Created</span>
                    <p className="text-xs text-white/30 mt-2">Public & private modules compiled</p>
                </div>

                <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden shadow-xl"> 
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl w-fit mb-4">
                        <FiHeart className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-black block">{totalSaveLesson.length}</span>
                    <span className="text-xs text-white/40 font-semibold uppercase tracking-wider mt-1 block">Total Saved (Favorites)</span>
                    <p className="text-xs text-white/30 mt-2">Bookmarked lessons for quick review</p>
                </div>

                {/* কুইক নেভিগেশন শর্টকাট কার্ড */}
                <div className="border border-white/10 bg-linear-to-br from-purple-950/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                    <div>
                        <span className="text-sm font-bold text-white block mb-1">Quick Navigation</span>
                        <p className="text-xs text-white/40">Instantly switch between workspaces.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <Link href="/dashboard/my-lessons" className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-2.5 text-center transition-all group">
                            <FiGrid className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                            <span className="text-[10px] font-bold text-white/70 group-hover:text-white transition-colors">All Lessons</span>
                        </Link>
                        <Link href="/dashboard/favorites" className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-2.5 text-center transition-all group">
                            <FiHeart className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
                            <span className="text-[10px] font-bold text-white/70 group-hover:text-white transition-colors">Favorites</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* চার্ট এবং রিসেন্ট লেসন সেকশন গ্রিড */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recharts অ্যানালিটিক্স চার্ট */}
                <div className="lg:col-span-2 border border-white/10 bg-white/3 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-2">
                        <FiActivity className="w-4 h-4 text-purple-400" />
                        <h3 className="text-sm font-bold">Weekly Contribution Analysis</h3>
                    </div>
                    {/* ক্লায়েন্ট চার্ট কম্পোনেন্টে লেসন অ্যারে পাস করা হলো */}
                    <DashboardChart lessons={lessons} />
                </div>

                {/* রিসেন্টলি অ্যাডেড লেসন লিস্ট */}
                <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                            <h3 className="text-sm font-bold">Recently Added</h3>
                            <Link href="/dashboard/my-lessons" className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors">
                                View All <FiArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {recentLessons.length === 0 ? (
                            <p className="text-xs text-white/40 py-8 text-center">No modules created yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {recentLessons.map((lesson) => {
                                    const lessonId = lesson._id?.$oid || lesson._id;
                                    const dateObj = new Date(lesson.createdAt?.$date || lesson.createdAt);
                                    
                                    // উইন্ডো অবজেক্ট বা ডাটাবেজের ফিল্ড ম্যাচিং (public/private)
                                    const isPublic = lesson.visibility === "public";

                                    return (
                                        <div key={lessonId} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between gap-3 hover:bg-white/10 transition-colors">
                                            <div className="min-w-0">
                                                <span className="text-xs font-bold text-white block truncate">{lesson.lessonTitle || "Untitled Lesson"}</span>
                                                <span className="text-[10px] text-white/40 block mt-0.5">
                                                    {isNaN(dateObj) ? "Recent" : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            {/* ডাইনামিক ভিজিবিলিটি ব্যাজ */}
                                            <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${isPublic ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                {lesson.visibility || "public"}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardHomePage;