"use client";

import React, { useState } from 'react';
import { Form, Input, Button, Avatar } from '@heroui/react';
import { FiUser, FiShield, FiCamera, FiSave, FiLink } from 'react-icons/fi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const AdminProfileClient = ({ initialAdminData }) => {
    const [admin, setAdmin] = useState(initialAdminData);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const displayName = formData.get("displayName");
        const photoUrl = formData.get("photoUrl");

        if (!displayName.trim()) {
            toast.error("Display name cannot be empty!");
            return;
        }

        try {
            setIsLoading(true);

            await authClient.updateUser({
                image: photoUrl,
                name: displayName,
            });

            setAdmin((prev) => ({
                ...prev,
                name: displayName,
                image: photoUrl || prev.image,
            }));

            toast.success("Profile updated successfully!");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* ১. প্রোফাইল ভিজ্যুয়াল কার্ড */}
            <div className="md:col-span-1 border border-white/10 rounded-2xl p-6 bg-[#0a051a]/60 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative">
                    {/* Hero UI Avatar Anatomy */}
                    <Avatar className="w-28 h-28 ring-4 ring-purple-500/20 shadow-xl overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                        <Avatar.Image 
                            src={admin?.image} 
                            alt={admin?.name}
                            referrerPolicy="no-referrer"
                            className="object-cover w-full h-full"
                        />
                        <Avatar.Fallback className="bg-linear-to-br from-purple-900/60 to-slate-900 text-purple-300 font-black text-2xl flex items-center justify-center w-full h-full">
                            {admin?.name ? admin.name.substring(0, 2).toUpperCase() : "AD"}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="absolute bottom-1 right-1 bg-purple-600 border border-white/20 p-2 rounded-full shadow-lg text-white">
                        <FiCamera className="w-3.5 h-3.5" />
                    </div>
                </div>

                <h2 className="text-xl font-black text-white/90 mt-5 tracking-tight bg-linear-to-r from-white to-white/70 bg-clip-text ">
                    {admin?.name}
                </h2>
                <p className="text-xs text-white/40 font-mono mt-1 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    {admin?.email}
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest shadow-inner">
                    <FiShield className="w-3 h-3 text-purple-400" /> {admin?.role || "Admin"}
                </div>
            </div>

            {/* ২. হিরো ইউআই আপডেট ফর্ম সেকশন */}
            <div className="md:col-span-2 border border-white/10 rounded-2xl p-6 bg-[#0a051a]/60 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-black text-purple-300 uppercase tracking-widest mb-6 border-b border-white/5 pb-3">
                        Profile Settings
                    </h3>

                    <Form onSubmit={handleUpdateProfile} className="space-y-6 ">
                        
                        {/* লাইন ১: ডিসপ্লে নেম ইনপুট */}
                        <div className="w-full">
                            <Input
                                isRequired
                                name="displayName"
                                label="Display Name"
                                labelPlacement="outside"
                                placeholder="Enter your full name"
                                defaultValue={admin?.name}
                                variant="bordered"
                               
                            />
                        </div>

                        {/* লাইন ২: লার্জ ফটো ইউআরএল ইনপুট ফিল্ড */}
                        <div className="w-full">
                            <Input
                                name="photoUrl"
                                label="Profile Photo URL"
                                labelPlacement="outside"
                                placeholder="Paste your image URL here..."
                                defaultValue={admin?.image}
                                className='min-w-full sm:min-w-80'
                            />
                        </div>

                        {/* সাবমিট বাটন */}
                        <div className="flex justify-end pt-2">
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs px-7 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-950/50 transform hover:-translate-y-0.5"
                            >
                                {!isLoading && <FiSave className="w-4 h-4" />}
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

        </div>
    );
};

export default AdminProfileClient;