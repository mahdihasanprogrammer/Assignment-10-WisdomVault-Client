"use client";

import React, { useState } from 'react';
import { Avatar } from '@heroui/react';
import { FiMenu, FiX, FiUser, FiLayout, FiLogOut, FiLayers, FiAward, FiZap } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient, useSession } from '@/lib/auth-client';

const MainNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Auth Hook Setup
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isPremium = user?.isPremium;

  // 1. Permanent Public Links
  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Public Lessons", href: "/public-lessons" },

  ];

  // 2. Conditional Protected Links Matrix
  const protectedLinks = user?.role === 'user' ? [
    { label: "Add Lesson", href: "/dashboard/add-lesson" },
    { label: "My Lessons", href: "/dashboard/my-lessons" },
    { label: "Favorites", href: "/dashboard/favorites" }
  ] : [];

  // Dropdown Items Matrix Mapping
  const dropdownItems = [
    { label: "Profile", href: "/dashboard/profile", icon: <FiUser className="text-purple-400" /> },
    { label: "Dashboard", href: "/dashboard", icon: <FiLayout className="text-purple-400" /> },
  ];

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    await authClient.signOut();
    router.push('/signin');
    router.refresh();
  };

  // Base Shared Glassmorphic Styles
  const baseLinkStyle = "transition-all duration-300 font-semibold text-sm tracking-wider py-1.5 px-4 rounded-xl border flex items-center gap-1.5";
  const activeLinkStyle = "bg-linear-to-tr from-purple-500/15 to-indigo-500/15 text-white border-purple-500/40 backdrop-blur-xl shadow-lg shadow-purple-500/10";
  const inactiveLinkStyle = "text-white/90 border-transparent hover:text-purple-300 hover:bg-linear-to-tr hover:from-purple-500/15 hover:to-indigo-500/15 hover:backdrop-blur-md hover:border-purple-500/40";

  return (
    <nav className="border-b border-white/10 sticky top-0 z-50 bg-[#080418]/70 backdrop-blur-xl shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* BRAND IDENTITY */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
            <FiLayers className="text-white text-base" />
          </div>
          <span className="bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent font-black text-lg">
            Wisdom<span className="text-purple-400 font-bold">Vault</span>
          </span>
        </Link>

        {/* CENTRAL NAV PILL */}
        <div className="hidden md:flex gap-1 items-center bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
          {/* Public links always load immediately */}
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${baseLinkStyle} ${pathname === link.href ? activeLinkStyle : inactiveLinkStyle}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Only protected segment observes the loading stream wrapper */}
          {isPending ? (
            <div className="bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-xl text-xs text-purple-400 animate-pulse font-medium tracking-wide">
              loading modules...
            </div>
          ) : (
            protectedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseLinkStyle} ${pathname === link.href ? activeLinkStyle : inactiveLinkStyle}`}
              >
                {link.label}
              </Link>
            ))
          )}
        </div>

        {/* UTILITY ACTION TIER */}
        <div className="hidden md:flex items-center space-x-4">
          {isPending ? (
            /* GLOBAL AUTH LOADING FALLBACK AVATAR */
            <div className="flex items-center gap-3 animate-pulse bg-white/5 border border-white/10 py-1.5 px-3 rounded-2xl backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30" />
              <div className="w-16 h-3 bg-white/10 rounded" />
            </div>
          ) : (
            <>
              {user && (
                <div>
                  {isPremium ? (
                    <span className="text-[10px] font-bold tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/40 backdrop-blur-md px-3.5 py-2 rounded-full uppercase flex items-center gap-1.5 shadow-lg shadow-purple-500/5">
                      Premium <FiAward className="text-purple-400 text-xs" />
                    </span>
                  ) : (
                    <Link href="/pricing" className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3 py-2 rounded-full transition-all border border-white/20 shadow-lg hover:shadow-purple-500/20 active:scale-95 uppercase">
                      Upgrade <FiZap className="text-white text-xs animate-pulse" />
                    </Link>
                  )}
                </div>
              )}

              {user ? (
                /* AUTHENTICATED DROPDOWN CONTAINER */
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center relative p-0.5 rounded-full group active:scale-95 transition-transform cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 opacity-60 blur-[1px]" />
                    <Avatar className="w-9 h-9 border border-white/20 relative z-10">
                      <Avatar.Image src={user?.image} referrerPolicy="no-referrer" alt="Avatar" className="object-cover" />
                      <Avatar.Fallback className="bg-[#100B26] text-purple-300 text-xs font-bold">
                        {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <span className="absolute z-20 right-0 bottom-0 size-2.5 rounded-full bg-green-500 ring-2 ring-[#080418] animate-pulse" />
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute right-0 mt-3 w-60 bg-[#0A051A]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
                        <div className="px-4 py-2.5 border-b border-white/5">
                          <p className="text-lg font-bold text-white truncate">{user?.name || 'User'}</p>
                          <p className="text-xs text-purple-400/70 truncate mt-0.5">{user?.email}</p>
                        </div>

                        {/* Mapped Dropdown System Items */}
                        {dropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 hover:backdrop-blur-md transition-all"
                          >
                            {item.icon} {item.label}
                          </Link>
                        ))}

                        <div className="border-t border-white/5 mt-1 pt-1">
                          <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-all font-medium">
                            <FiLogOut /> Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* GUEST ACCESS INTERACTION CLUSTER */
                <div className="flex items-center gap-4">
                  <Link href="/signin" className="text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
                    Sign In
                  </Link>
                  <Link href="/signup" className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-white/10 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <div className="flex items-center md:hidden gap-3">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 animate-pulse" />
          ) : (
            !user && (
              <div className="flex items-center gap-2">
                <Link href="/signin" className="text-white/80 text-xs font-bold px-2 py-1">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  Sign Up
                </Link>
              </div>
            )
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-purple-300 hover:text-white transition-colors">
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER WINDOW */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#080418]/95 backdrop-blur-xl px-4 py-3 flex flex-col space-y-1 animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Public links on mobile layout */}
          {publicLinks.map((link, index) => (
            <Link key={`public-mob-${index}`} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">
              {link.label}
            </Link>
          ))}

          {/* Protected links with dynamic wrapper check on mobile */}
          {!isPending && protectedLinks.map((link, index) => (
            <Link key={`protected-mob-${index}`} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">
              {link.label}
            </Link>
          ))}

          {!isPending && user && (
            <>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-medium text-white px-3 py-2 rounded-lg hover:bg-white/10">Dashboard</Link>
              <div className="pt-2 mt-1 border-t border-white/10 flex flex-col gap-2">
                {!isPremium ? (
                  <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-xs bg-linear-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl font-bold shadow-md flex items-center justify-center gap-1.5">
                    Upgrade Premium <FiZap className="text-xs text-white" />
                  </Link>
                ) : (
                  <span className="w-full text-center text-xs bg-white/10 border border-purple-500/20 text-purple-300 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5">
                    Premium Subscriber <FiAward className="text-xs text-purple-400" />
                  </span>
                )}
                <button onClick={handleLogout} className="w-full text-center text-xs bg-rose-500/10 text-rose-400 py-2.5 rounded-xl font-medium">
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