import { getUserSession } from "@/lib/session";
import Link from "next/link";
import Image from "next/image"; // Next.js-এর অফিশিয়াল ইমেজ কম্পোনেন্ট আমদানি করা হলো
import { FiAlertTriangle, FiBookOpen, FiHeart, FiPlusCircle, FiUser, FiUsers } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";

const DashboardSideBar = async () => {
    const userLinks = [
        { label: "Home", href: "/dashboard", icon: IoHome },
        { label: "Add Lesson", href: "/dashboard/add-lesson", icon: FiPlusCircle },
        { label: "My Lessons", href: "/dashboard/my-lessons", icon: FiBookOpen },
        { label: "My Favorites", href: "/dashboard/favorites", icon: FiHeart },
        { label: "Profile", href: "/dashboard/profile", icon: FiUser }
    ];
    const adminLinks = [
        { label: " Home", href: "/dashboard/admin", icon: IoHome },
        { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: FiUsers },
        { label: "Manage Lessons", href: "/dashboard/admin/manage-lessons", icon: FiBookOpen },
        { label: "Reported  Lessons", href: "/dashboard/admin/reported-lessons", icon: FiAlertTriangle },
        { label: " Profile", href: "/dashboard/admin/profile", icon: FiUser }
    ];

    const user = await getUserSession();
    const userAndAdminNavLinks = {
        "user": userLinks, 
        "admin": adminLinks
    };
    
    const navItems = userAndAdminNavLinks[user?.role || "user"] || [];

    return (
        <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-40 bg-linear-to-b from-[#0e0926]/90 to-[#080418]/95 backdrop-blur-2xl border-r border-white/10 p-5 justify-between">
            
            {/* Top Container: Logo and Links */}
            <div className="flex flex-col gap-6 w-full">
                
                {/* Branding Brand Logo Area */}
                <div className="flex items-center gap-3 px-2 py-3 border-b border-white/5">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <LuSparkles className="text-white w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-white font-black text-base tracking-wider leading-none">Wisdom<span className="text-purple-400 font-bold">Vault</span></h2>
                        <span className="text-[10px] text-purple-400/80 font-bold uppercase tracking-widest mt-1 block">
                            {user?.role === 'admin' ? 'Admin Core' : 'User Panel'}
                        </span>
                    </div>
                </div>

                {/* Main Navigation links */}
                <nav className="flex flex-col gap-1.5 w-full">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link 
                                href={item.href}
                                key={item.label}
                                className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-white hover:text-purple-300 bg-transparent hover:bg-white/4 border border-transparent hover:border-white/5 transition-all duration-200 group active:scale-[0.98]"
                            >
                                <Icon className="w-5 h-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Account Card with Larger Text and next/image */}
            <div className="w-full flex flex-col gap-3 pt-4 border-t border-white/5">
                {user && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5">
                        {/* next/image wrapper for Avatar */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-purple-500/20 border border-purple-500/30 flex  shrink-0  items-center justify-center text-white font-bold text-sm">
                            {user.image ? (
                                <Image 
                                    src={user.image} 
                                    alt={user.name || "User profile"} 
                                    fill 
                                    className="object-cover"
                                    sizes="40px"
                                    priority
                                />
                            ) : (
                                user.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                        {/* Text Container with Larger Sizing */}
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-white truncate leading-snug">{user.name}</p>
                            <p className="text-xs text-white/50 truncate mt-0.5">{user.email}</p>
                        </div>
                    </div>
                )}
            </div>

        </aside>
    );
};

export default DashboardSideBar;