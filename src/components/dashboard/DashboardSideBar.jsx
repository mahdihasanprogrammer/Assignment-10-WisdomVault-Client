import { getUserSession } from "@/lib/session";
import Link from "next/link";
import Image from "next/image";
import {
  FiAlertTriangle,
  FiBookOpen,
  FiHeart,
  FiPlusCircle,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";

import SignOutBtn from "../shared/SignOutBtn";

const DashboardSideBar = async () => {
  const userLinks = [
    { label: "Home", href: "/dashboard", icon: IoHome },
    { label: "Add Lesson", href: "/dashboard/add-lesson", icon: FiPlusCircle },
    { label: "My Lessons", href: "/dashboard/my-lessons", icon: FiBookOpen },
    { label: "My Favorites", href: "/dashboard/favorites", icon: FiHeart },
    { label: "Profile", href: "/dashboard/profile", icon: FiUser },
  ];

  const adminLinks = [
    { label: "Home", href: "/dashboard/admin", icon: IoHome },
    {
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: FiUsers,
    },
    {
      label: "Manage Lessons",
      href: "/dashboard/admin/manage-lessons",
      icon: FiBookOpen,
    },
    {
      label: "Reported Lessons",
      href: "/dashboard/admin/reported-lessons",
      icon: FiAlertTriangle,
    },
    {
      label: "Profile",
      href: "/dashboard/admin/profile",
      icon: FiUser,
    },
  ];

  const user = await getUserSession();

  const DashboardNavLinks = {
    user: userLinks,
    admin: adminLinks,
  };

  const navItems = DashboardNavLinks[user?.userRole || "user"] || [];

  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-60 shrink-0 flex-col justify-between bg-linear-to-b from-[#0e0926]/90 to-[#080418]/95 backdrop-blur-xl border-r border-white/10 p-5 overflow-hidden">

      {/* Top */}
      <div className="flex flex-col gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <LuSparkles className="text-white w-4 h-4 animate-pulse" />
          </div>

          <div>
            <h2 className="text-white font-black tracking-wide">
              Wisdom
              <span className="text-purple-400">Vault</span>
            </h2>

            <p className="text-[10px] uppercase tracking-widest text-purple-400 mt-1">
              {user?.userRole === "admin" ? "Admin Core" : "User Panel"}
            </p>
          </div>
        </div>

        {/* Back */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-purple-400 transition"
        >
          <FaArrowLeftLong />
          Back to Home
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 hover:text-purple-300 transition"
              >
                <Icon className="text-purple-400 w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
             <SignOutBtn/>
        </nav>
      </div>
    

      {/* Bottom */}
      <div className="border-t border-white/10 pt-5 space-y-4">

        {user && (
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-purple-500/20 flex items-center justify-center text-white font-bold">

              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}

            </div>

            <div className="min-w-0">
              <p className="truncate text-white font-semibold">
                {user.name}
              </p>

              <p className="truncate text-xs text-white/60">
                {user.email}
              </p>
            </div>
          </div>
        )}

       
      </div>
    </aside>
  );
};

export default DashboardSideBar;