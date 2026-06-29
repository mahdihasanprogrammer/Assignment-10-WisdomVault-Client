import React from 'react';
import Image from 'next/image';
import { getAdminDashboardInfo } from '@/lib/api/lessons';
import { Avatar } from '@heroui/react';
import { FiUsers, FiBookOpen, FiAlertTriangle, FiCalendar, FiAward } from 'react-icons/fi';
import AdminDashboardCharts from '@/components/dashboard/admin/AdminDashboardCharts/AdminDashboardCharts';


const DashboardAdminHomePage = async () => {
    const { totalUser, totalPublicLessons, totalReportedLessons, todayNewLesson, topContributors, chartData } = await getAdminDashboardInfo();

    // অ্যানালিটিক্স কার্ড মেটাডাটা অ্যারে
    const stats = [
        {
            title: "Total Users",
            value: totalUser || 0,
            icon: <FiUsers className="w-5 h-5 text-purple-400" />,
            bg: "bg-purple-500/10 border-purple-500/20"
        },
        {
            title: "Total Public Lessons",
            value: totalPublicLessons || 0,
            icon: <FiBookOpen className="w-5 h-5 text-emerald-400" />,
            bg: "bg-emerald-500/10 border-emerald-500/20"
        },
        {
            title: "Reported/Flagged",
            value: totalReportedLessons?.length || 0,
            icon: <FiAlertTriangle className="w-5 h-5 text-rose-400" />,
            bg: "bg-rose-500/10 border-rose-500/20"
        },
        {
            title: "Today's New Lessons",
            value: todayNewLesson.length || 0,
            icon: <FiCalendar className="w-5 h-5 text-blue-400" />,
            bg: "bg-blue-500/10 border-blue-500/20"
        }
    ];

    return (
        <div className="space-y-6 container mx-auto p-1 text-white">
            
            {/* ড্যাশবোর্ড হেডার */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white/95">Admin Dashboard Overview</h1>
                <p className="text-xs text-white/50 font-semibold mt-0.5">Real-time platform metrics and deep contributor analytics.</p>
            </div>

            {/* ৪টি মেইন অ্যানালিটিক্স গ্রিড কার্ডস */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <div 
                        key={i} 
                        className="border border-white/6 rounded-2xl bg-[#070314]/50 backdrop-blur-xl p-5 flex items-center justify-between shadow-[0_0_40px_-15px_rgba(139,92,246,0.1)]"
                    >
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider">{stat.title}</p>
                            <h2 className="text-2xl font-black text-white/95">{stat.value}</h2>
                        </div>
                        <div className={`p-3 rounded-xl border ${stat.bg}`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* সেকেন্ডারি রো: গ্রাফসমূহ এবং মোস্ট একটিভ কন্ট্রিবিউটরস লিডারবোর্ড */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                
                {/* চার্ট সেকশন (২ কলাম জুড়ে থাকবে বড় স্ক্রিনে) */}
                <div className="xl:col-span-2 space-y-0 -mt-6">
                    <AdminDashboardCharts chartData={chartData} />
                </div>

                {/* Most Active Contributors - HeroUI অবতার লিডারবোর্ড */}
                <div className="border border-white/6 rounded-2xl bg-[#070314]/50 backdrop-blur-xl p-5 shadow-[0_0_50px_-12px_rgba(139,92,246,0.05)] h-full">
                    <div className="flex items-center gap-2 border-b border-white/6 pb-4 mb-4">
                        <FiAward className="w-4 h-4 text-amber-400" />
                        <div>
                            <h3 className="text-white font-bold text-sm">Most Active Contributors</h3>
                            <p className="text-[10px] text-white/40 font-semibold mt-0.5">Top creators based on uploads</p>
                        </div>
                    </div>

                    <div className="space-y-3.5">
                        {topContributors && topContributors.length > 0 ? (
                            topContributors.map((contribute, index) => (
                                <div 
                                    key={contribute.creatorId || index} 
                                    className="flex items-center justify-between p-2 rounded-xl bg-white/1 hover:bg-white/3 transition-all border border-transparent hover:border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* র‍্যাংকিং ব্যাজ */}
                                        <span className={`text-xs font-black w-5 text-center ${
                                            index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-300' : index === 2 ? 'text-amber-600' : 'text-white/30'
                                        }`}>
                                            #{index + 1}
                                        </span>

                                        {/* HeroUI Custom Avatar Architecture */}
                                        <Avatar className="w-8 h-8 ring-1 ring-white/10 overflow-hidden rounded-full bg-purple-500/10">
                                            <Avatar.Image
                                                src={contribute.creatorImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"}
                                                alt={contribute.creatorName}
                                                width={32}
                                                height={32}
                                                unoptimized
                                                className="object-cover w-full h-full"
                                            />
                                            <Avatar.Fallback className="text-[10px] text-white font-bold uppercase">
                                                {contribute.creatorName?.substring(0, 2) || "U"}
                                            </Avatar.Fallback>
                                        </Avatar>

                                        {/* ইউজার ইনফো */}
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white/95 line-clamp-1">{contribute.creatorName}</span>
                                            <span className="text-[9px] text-white/40 font-mono font-semibold line-clamp-1 tracking-tight">{contribute.creatorEmail || "creator@platform.com"}</span>
                                        </div>
                                    </div>

                                    {/* কন্ট্রিবিউশন কাউন্ট */}
                                    <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-[10px] font-extrabold tracking-wide">
                                        {contribute.contribute || 0} Lessons
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-white/30 text-center py-6 font-semibold">No contributors found yet.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardAdminHomePage;