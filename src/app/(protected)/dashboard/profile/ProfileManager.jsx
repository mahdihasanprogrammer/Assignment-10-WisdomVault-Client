"use client";

import { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, AlertDialog } from "@heroui/react";
import { FiEdit2, FiAward, FiBookmark, FiPlusCircle, FiLoader } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ProfileManager = ({ user, totalSaved, totalCreated }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    
    // ইনপুট স্টেট
    const [name, setName] = useState(user?.name || "");
    const [image, setImage] = useState(user?.image || "");

    // ধরা যাক আপনার ইউজার অবজেক্টে role বা plan ফিল্ড আছে প্রিমিয়াম চেক করার জন্য
    const isPremium = user?.isPremium === true || false; 

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
            await authClient.updateUser({ name, image });
            toast.success("Profile updated successfully!");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="relative border border-white/10 bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden">
            
            {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* বামদিকের প্রোফাইল ইনফো */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10 w-full md:w-auto">
                <Avatar className="w-20 h-20 rounded-2xl border border-white/10 bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-2xl shrink-0">
                    <Avatar.Image src={user?.image} alt={user?.name} className="rounded-2xl object-cover" />
                    <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                </Avatar>

                <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center justify-center  gap-7">
                        <h1 className="text-2xl font-bold tracking-tight text-white truncate max-w-62.5">{user?.name}</h1>
                        {isPremium && (
                            <span className="bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-lg shadow-amber-950/20 animate-pulse">
                                Premium ⭐
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-white/40 truncate">{user?.email}</p>
                    
                    {/* এডিট প্রোফাইল বাটন */}
                    <Button onClick={() => setIsOpen(true)} size="sm" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-xl text-xs h-8 font-medium transition-all duration-300 active:scale-[0.95] cursor-pointer flex items-center gap-1.5 px-3">
                        <FiEdit2 className="w-3 h-3" /> Edit Profile
                    </Button>
                </div>
            </div>

            {/* ডানদিকের স্ট্যাটস কাউন্টার্স */}
            <div className="flex items-center gap-4 z-10 w-full sm:w-auto justify-center md:justify-end">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 min-w-30 text-center backdrop-blur-sm">
                    <FiPlusCircle className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
                    <span className="block text-xl font-black text-white">{totalCreated}</span>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Created</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 min-w-30 text-center backdrop-blur-sm">
                    <FiBookmark className="w-4 h-4 text-indigo-400 mx-auto mb-1.5" />
                    <span className="block text-xl font-black text-white">{totalSaved}</span>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Saved</span>
                </div>
            </div>

            {/* প্রোফাইল এডিট পপআপ মোডাল (React State Driven) */}
            {isOpen && (
                <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <AlertDialog.Backdrop className="backdrop-blur-md bg-black/60 fixed inset-0 z-[9998]" />
                    <AlertDialog.Container className="fixed inset-0 flex items-center justify-center p-4 z-[9999] mx-auto">
                        <AlertDialog.Dialog className="w-full sm:min-w-sm bg-[#0f0a24] border border-white/10 rounded-2xl overflow-hidden p-6 relative shadow-2xl">
                            <AlertDialog.CloseTrigger onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white absolute top-4 right-4 cursor-pointer" />
                            
                            <AlertDialog.Header>
                                <AlertDialog.Heading className="text-xl font-bold text-white tracking-tight">Update Profile</AlertDialog.Heading>
                                <p className="text-xs text-white/40 mt-1">Modify your public identifier settings</p>
                            </AlertDialog.Header>

                            <form onSubmit={handleUpdateUser} className="space-y-4 py-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Display Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl p-3 text-sm text-white focus:outline-none transition-all" placeholder="Enter your full name" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Photo URL</label>
                                    <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl p-3 text-sm text-white focus:outline-none transition-all" placeholder="https://example.com/photo.jpg" />
                                </div>

                                <AlertDialog.Footer className="flex justify-end gap-3 pt-4 border-t border-white/5">
                                    <Button type="button" onClick={() => setIsOpen(false)} disabled={isUpdating} className="bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 rounded-xl text-xs h-9 px-4 font-medium transition-all disabled:opacity-40 cursor-pointer">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isUpdating} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold h-9 px-5 rounded-xl shadow-lg shadow-purple-600/20 active:scale-[0.97] transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer">
                                        {isUpdating ? (<><FiLoader className="animate-spin w-3.5 h-3.5" /> Saving...</>) : "Save Changes"}
                                    </Button>
                                </AlertDialog.Footer>
                            </form>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog>
            )}
        </div>
    );
};

export default ProfileManager;