"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

 const DashboardChart = ({ lessons = [] }) => {
  const [isMounted, setIsMounted] = useState(false);

  // SSR (Server Side Rendering) এরর এড়ানোর জন্য মাউন্ট হওয়া পর্যন্ত অপেক্ষা করা
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-48 w-full bg-white/5 animate-pulse rounded-xl" />;
  }

  // গত ৭ দিনের লেসন তৈরির ডাটা প্রসেস করা (অরজিনাল ডাটাবেজ টাইমস্ট্যাম্প থেকে দিন বের করা)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // ৭ দিনের একটি ডিফোল্ট ম্যাপ তৈরি করা
  const chartMap = daysOfWeek.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  // লেসনের ডাটা লুপ করে কোন বারে কয়টি লেসন তৈরি হয়েছে তা গণনা করা
  lessons.forEach(lesson => {
    if (lesson.createdAt) {
      // MongoDB $date অবজেক্ট বা ISO স্ট্রিং দুইটাই হ্যান্ডেল করার জন্য
      const dateStr = lesson.createdAt.$date || lesson.createdAt;
      const date = new Date(dateStr);
      if (!isNaN(date)) {
        const dayName = daysOfWeek[date.getDay()];
        chartMap[dayName] += 1;
      }
    }
  });

  // Recharts এর ফরম্যাটে ডাটা কনভার্ট করা
  const data = daysOfWeek.map(day => ({
    name: day,
    Lessons: chartMap[day]
  }));

  return (
    <div className="w-full h-52 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#ffffff40" 
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#ffffff40" 
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
            contentStyle={{ 
              backgroundColor: '#0f0b26', 
              borderColor: 'rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px'
            }} 
          />
          <Bar 
            dataKey="Lessons" 
            fill="url(#colorLessons)" 
            radius={[6, 6, 0, 0]} 
            maxBarSize={35}
          >
            {/* গ্রেডিয়েন্ট কালার ইফেক্ট */}
            <defs>
              <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart
