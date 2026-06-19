"use client";

import React, { useState } from 'react';
import { Avatar } from '@heroui/react';
import { FiMenu, FiX, FiUser, FiLayout, FiLogOut, FiLayers, FiZap } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavbar = () => {
  const isPremium = false; 
  const user = {
    displayName: "Sabbir Ahmed",
    email: "sabbir@wisdomvault.io",
    photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  };

  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Deep Glass Effects with White Typography
  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `transition-all duration-300 font-semibold text-sm  tracking-wider py-2.5 px-4 rounded-xl border flex items-center gap-1.5 ${
      isActive 
        ? "bg-white/10 text-white border-purple-500/40 backdrop-blur-xl shadow-lg shadow-purple-500/10" 
        : "text-white/90 border-transparent hover:text-purple-300 hover:bg-white/10 hover:backdrop-blur-md"
    }`;
  };

  return (
    <nav className="border-b border-white/10 sticky top-0 z-50 bg-[#080418]/70 backdrop-blur-xl shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* BRAND IDENTITY */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
            <FiLayers className="text-white text-base" />
          </div>
          <span className="bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent font-black tracking-wider text-lg">
            Wisdom<span className="text-purple-400 font-light">Vault</span>
          </span>
        </Link>

        {/* CENTRAL NAV PILL - HIGH INTENSITY GLASS */}
        <div className="hidden md:flex items-center space-x-1 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
          <Link href="/" className={getLinkClass('/')}>Home</Link>
          <Link href="/public-lessons" className={getLinkClass('/public-lessons')}>Public Lessons</Link>
          {user && (
            <>
              <Link href="/dashboard/add-lesson" className={getLinkClass('/dashboard/add-lesson')}>Add Lesson</Link>
              <Link href="/dashboard/my-lessons" className={getLinkClass('/dashboard/my-lessons')}>My Lessons</Link>
            </>
          )}
        </div>

        {/* UTILITY ACTION TIER */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <div>
              {isPremium ? (
                <span className="text-[10px] font-bold tracking-widest bg-white/10 text-purple-300 border border-purple-500/30 backdrop-blur-md px-3.5 py-2 rounded-xl uppercase">
                  Premium ⭐
                </span>
              ) : (
                <Link href="/pricing" className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl transition-all border border-white/20 shadow-lg hover:shadow-purple-500/20 active:scale-95 uppercase">
                  Upgrade Tier <FiZap className="text-white text-xs animate-pulse" />
                </Link>
              )}
            </div>
          )}

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="flex items-center relative p-0.5 rounded-full group active:scale-95 transition-transform"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 opacity-60 blur-[1px]" />
                <Avatar className="w-8 h-8 border border-white/20 relative z-10">
                  <Avatar.Image src={user?.photoURL} alt="Avatar" className="object-cover" />
                  <Avatar.Fallback className="bg-[#100B26] text-purple-300 text-xs font-bold">
                    {user?.displayName?.charAt(0).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </button>
              
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 mt-3 w-60 bg-[#0A051A]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
                    <div className="px-4 py-2.5 border-b border-white/5">
                      <p className="text-xs font-bold text-white truncate">{user?.displayName}</p>
                      <p className="text-[10px] text-purple-400/70 truncate mt-0.5">{user?.email}</p>
                    </div>
                    <Link href="/dashboard/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-xs text-white hover:bg-white/10 hover:backdrop-blur-md transition-all">
                      <FiUser className="text-purple-400" /> Profile
                    </Link>
                    <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-xs text-white hover:bg-white/10 hover:backdrop-blur-md transition-all">
                      <FiLayout className="text-purple-400" /> Dashboard
                    </Link>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button onClick={() => setIsDropdownOpen(false)} className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-all font-medium">
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md">
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <div className="flex items-center md:hidden gap-3">
          {!user && (
            <Link href="/login" className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              Login
            </Link>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-purple-300 hover:text-white transition-colors">
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER WINDOW */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#080418]/95 backdrop-blur-xl px-4 py-3 flex flex-col space-y-1 animate-in fade-in slide-in-from-top-4 duration-200">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">Home</Link>
          <Link href="/public-lessons" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">Public Lessons</Link>
          {user && (
            <>
              <Link href="/dashboard/add-lesson" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">Add Lesson</Link>
              <Link href="/dashboard/my-lessons" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">My Lessons</Link>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">Dashboard</Link>
              <div className="pt-2 mt-1 border-t border-white/10 flex flex-col gap-2">
                {!isPremium ? (
                  <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-xs bg-linear-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl font-bold shadow-md">
                    Upgrade Premium 💎
                  </Link>
                ) : (
                  <span className="w-full text-center text-xs bg-white/10 border border-purple-500/20 text-purple-300 py-1.5 rounded-xl font-bold">
                    Premium Subscriber ⭐
                  </span>
                )}
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-xs bg-rose-500/10 text-rose-400 py-2.5 rounded-xl font-medium">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;