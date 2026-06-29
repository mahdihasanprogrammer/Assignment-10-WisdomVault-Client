"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const AdminDashboardCharts = ({chartData}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Lesson Growth Chart */}
            <div className="border border-white/6 rounded-2xl bg-[#070314]/50 backdrop-blur-xl p-5 shadow-[0_0_50px_-12px_rgba(139,92,246,0.05)]">
                <div className="mb-4">
                    <h3 className="text-white font-bold text-sm">Lesson Growth</h3>
                    <p className="text-[11px] text-white/40 mt-0.5">Platform total lessons overview</p>
                </div>
                <div className="h-64 w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                            <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tickLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.3)" tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0d0921', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                            <Area type="monotone" dataKey="lessons" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorLessons)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* User Growth Chart */}
            <div className="border border-white/6 rounded-2xl bg-[#070314]/50 backdrop-blur-xl p-5 shadow-[0_0_50px_-12px_rgba(139,92,246,0.05)]">
                <div className="mb-4">
                    <h3 className="text-white font-bold text-sm">User Growth</h3>
                    <p className="text-[11px] text-white/40 mt-0.5">Monthly platform registrations</p>
                </div>
                <div className="h-64 w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                            <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tickLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.3)" tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0d0921', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                            <Area type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardCharts;