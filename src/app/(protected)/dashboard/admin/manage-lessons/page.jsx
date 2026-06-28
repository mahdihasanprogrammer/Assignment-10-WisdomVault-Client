import React from 'react';
import { getAllLessonsForAdmin } from '@/lib/api/lessons';

// নতুন FiAlertTriangle আইকনটি যুক্ত করা হয়েছে রিপোর্টের জন্য
import { FiBookOpen, FiEye, FiEyeOff, FiAlertTriangle } from 'react-icons/fi';
import ManageAdminLessons from './ManageAdminLessons';

const ManageLessonsPage = async ({ searchParams }) => {
    const params = await searchParams;
    const queryUrl = new URLSearchParams(params);
    const queryStr = queryUrl.toString();

    const { 
        allLessons = [], 
        publicLessonsCount = 0, 
        privateLessonsCount = 0, 
        reportCount = 0 
    } = await getAllLessonsForAdmin(queryStr);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen text-white">
            
            {/* হেডার সেকশন */}
            <div className="mb-8">
                <h1 className="text-2xl font-black text-purple-300 tracking-tight">Manage Lessons</h1>
                <p className="text-xs text-white/50 mt-1">Review, feature, or moderate lessons created across the platform.</p>
            </div>

            {/* স্ট্যাটস কাউন্টার কার্ডসমূহ (Grid 3 থেকে 4 করা হয়েছে) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                
                {/* Total Lessons Card */}
                <div className="border border-white/10 rounded-xl p-4 bg-[#0a051a]/60 backdrop-blur-md flex items-center justify-between shadow-lg hover:border-purple-500/30 transition-all duration-300">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Total Lessons</p>
                        <h3 className="text-2xl font-black mt-1">{allLessons.length}</h3>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                        <FiBookOpen className="w-5 h-5" />
                    </div>
                </div>

                {/* Public Lessons Card */}
                <div className="border border-white/10 rounded-xl p-4 bg-[#0a051a]/60 backdrop-blur-md flex items-center justify-between shadow-lg hover:border-emerald-500/30 transition-all duration-300">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Public Lessons</p>
                        <h3 className="text-2xl font-black mt-1">{publicLessonsCount}</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                        <FiEye className="w-5 h-5" />
                    </div>
                </div>

                {/* Private Lessons Card */}
                <div className="border border-white/10 rounded-xl p-4 bg-[#0a051a]/60 backdrop-blur-md flex items-center justify-between shadow-lg hover:border-amber-500/30 transition-all duration-300">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">Private Lessons</p>
                        <h3 className="text-2xl font-black mt-1">{privateLessonsCount}</h3>
                    </div>
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                        <FiEyeOff className="w-5 h-5" />
                    </div>
                </div>

                {/* Reported Content Card (আপনার র রেন্ডার টেক্সটটিকে এখানে চমৎকার মডার্ন লুক দেওয়া হয়েছে) */}
                <div className={`border rounded-xl p-4 bg-[#0a051a]/60 backdrop-blur-md flex items-center justify-between shadow-lg transition-all duration-300 ${
                    reportCount > 0 
                        ? 'border-rose-500/30 hover:border-rose-500/50 pulse-subtle' 
                        : 'border-white/10 hover:border-rose-500/20'
                }`}>
                    <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${reportCount > 0 ? 'text-rose-400' : 'text-white/40'}`}>
                            Reported Content
                        </p>
                        <h3 className={`text-2xl font-black mt-1 ${reportCount > 0 ? 'text-rose-500' : 'text-white'}`}>
                            {reportCount}
                        </h3>
                    </div>
                    <div className={`p-3 rounded-xl border transition-colors ${
                        reportCount > 0 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 animate-bounce-slow' 
                            : 'bg-white/5 border-white/10 text-white/30'
                    }`}>
                        <FiAlertTriangle className="w-5 h-5" />
                    </div>
                </div>

            </div>

            {/* ক্লায়েন্ট টেবিল কম্পোনেন্ট */}
            <ManageAdminLessons initialLessons={allLessons} />
        </div>
    );
};

export default ManageLessonsPage;