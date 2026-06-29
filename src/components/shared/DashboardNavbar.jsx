"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; 
import { FiAlertTriangle, FiBookOpen, FiHeart, FiPlusCircle, FiUser, FiUsers, FiX } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";

const DashboardNavbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    const userLinks = [
        { label: "Home", href: "/dashboard", icon: IoHome },
        { label: "Add Lesson", href: "/dashboard/add-lesson", icon: FiPlusCircle },
        { label: "My Lessons", href: "/dashboard/my-lessons", icon: FiBookOpen },
        { label: "My Favorites", href: "/dashboard/favorites", icon: FiHeart },
        { label: "Profile", href: "/dashboard/profile", icon: FiUser }
    ];

    const adminLinks = [
        { label: "Admin Dashboard Home", href: "/dashboard/admin", icon: IoHome },
        { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: FiUsers },
        { label: "Manage Lessons", href: "/dashboard/admin/manage-lessons", icon: FiBookOpen },
        { label: "Reported / Flagged Lessons", href: "/dashboard/admin/reported-lessons", icon: FiAlertTriangle },
        { label: "Admin Profile", href: "/dashboard/admin/profile", icon: FiUser }
    ];

    const userAndAdminNavLinks = {
        "user": userLinks,
        "admin": adminLinks
    };

    const navItems = userAndAdminNavLinks[user?.userRole || "user"] || [];

    return (
        <div className="md:hidden w-full bg-[#0e0926]/85 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-50">

            {/* Brand Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center">
                    <LuSparkles className="text-white w-4 h-4 animate-pulse" />
                </div>
                <span className="text-white font-black text-sm tracking-wide">
                    Wisdom<span className="text-purple-400">Vault</span>
                </span>
            </div>

            {/* Custom Dynamic Navbar Trigger Toggle Wrapper */}
            <div className="relative">
                {/* Conditionals Icon Trigger Button with absolute flat view */}
                <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-white/80 hover:text-white bg-white/5 border border-white/10 rounded-xl w-9 h-9 flex items-center justify-center active:scale-95 transition-all"
                    aria-label={showMenu ? "Close Menu" : "Open Menu"}
                >
                    {showMenu ? (
                        <FiX className="w-5 h-5 text-purple-400 transition-none" /> // Close button without rotation animations
                    ) : (
                        <FaBars className="w-4 h-4 transition-none" /> // Standard 3-line static icon
                    )}
                </button>

                {/* Dropdown Menu Container List */}
                {showMenu && (
                    <nav className="flex flex-col gap-1 p-1.5 w-55 absolute -right-2 top-12 z-50 bg-[#0e0926]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link 
                                    href={item.href}
                                    key={item.label}
                                    onClick={() => setShowMenu(false)} // Auto hides dropdown on path execution
                                    className="flex items-center gap-3.5 rounded-xl px-3 py-2.5 font-semibold tracking-wide text-white/60 hover:text-white bg-transparent hover:bg-white/4 border border-transparent hover:border-white/5 transition-all duration-150 group active:scale-[0.98] text-sm"
                                >
                                    <Icon className="w-5 h-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                                    <span className="truncate">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                )}
            </div>

        </div>
    );
};

export default DashboardNavbar;