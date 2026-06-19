"use client";

import { signIn } from '@/lib/auth-client';
import { Button, FieldError, Form, Input, Label, Spinner, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { FiCheckCircle, FiShield, FiCpu, FiEye, FiEyeOff, FiLayers, FiLogIn } from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form.entries());
      
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (data) {
        router.push('/');
        toast.success("Welcome back! 🚀");
      }
      if (error) {
        toast.error(error.message);
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
    } catch (err) {
      toast.error("Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Standard Tailwind spacing classes used here
  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-500/60 focus:bg-white/10 transition-all duration-200";
  const labelClass = "text-xs font-semibold tracking-wider text-purple-300 uppercase mb-1 block";

  return (
    // Premium Tailwind Linear Background added across the page layout
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-[#0a051e] to-purple-950 flex items-center justify-center relative overflow-hidden p-4">
      
      {/* Decorative Ambient Glow Elements using standard Tailwind size scaling */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Core Box wrapper */}
      <div className="container mx-auto max-w-5xl flex rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        
        {/* ================= LEFT SIDE: FORM WRAPPER ================= */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center p-8 md:p-12 xl:p-16 relative z-10">
          
          <div className="max-w-md w-full mx-auto">
            {/* Top Decorative Sparkle Tag */}
            <div className="flex items-center gap-2 mb-2">
              <LuSparkles className="text-purple-400 text-sm animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-purple-400/80 uppercase">Welcome Back</span>
            </div>

            <h2 className="bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent font-black text-2xl sm:text-3xl tracking-tight mb-2">
              Sign In
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mb-6">
              Access your secure dashboard and cloud learning modules.
            </p>

            {/* Standard Form Component */}
            <Form className="flex flex-col gap-4 w-full" onSubmit={handleSignIn}>
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className={labelClass}>Email Address</Label>
                <Input placeholder="you@example.com" className={inputClass} />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* Password Container */}
              <TextField
                isRequired
                minLength={8}
                name="password"
                type={showPassword ? "text" : "password"}
                validate={(value) => {
                  if (value.length < 8) return "Password must be at least 8 characters";
                  if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
                  if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter";
                  if (!/[0-9]/.test(value)) return "Password must contain a number";
                  return null;
                }}
              >
                <Label className={labelClass}>Password</Label>
                <div className="relative w-full flex items-center">
                  <Input placeholder="••••••••" className={inputClass} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-white/40 hover:text-purple-400 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* Core Submission Trigger Action */}
              <Button 
                type="submit" 
                disabled={loading || googleLoading}
                className="w-full mt-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold tracking-wider py-3 rounded-xl transition-all duration-300 shadow-xl shadow-purple-500/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Spinner size="sm" color="white" /> Authenticating...</>
                ) : (
                  <>
                    <FiLogIn className="w-4 h-4 text-white/90" />
                    <span>Sign In</span>
                  </>
                )}
              </Button>
            </Form>

            {/* Content Divider Layer */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative bg-[#0d091e]/80 backdrop-blur-md px-3 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                or continue with
              </span>
            </div>

            {/* Google Authentication Module */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50"
            >
              {googleLoading ? <Spinner size="sm" color="current" /> : <><FcGoogle className="w-5 h-5" /><span>Google Authenticate</span></>}
            </Button>

            {/* Navigation Redirect Trigger */}
            <p className="mt-6 text-center text-sm text-white/50">
              Don&apos;t have an account?{" "}
              <Link 
                href="/signup" 
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4 decoration-purple-500/40"
              >
                Sign Up
              </Link>
            </p>
          </div>

        </div>

        {/* ================= RIGHT SIDE: PROJECT INFO DISPLAY (HIDDEN ON MOBILE) ================= */}
        <div className="hidden lg:flex w-2/5 bg-white/2 border-l border-white/10 relative items-center justify-center p-12 overflow-hidden">
          
          {/* Subtle Grid overlay styling matrix */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 max-w-xs flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-Linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <FiLayers className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-white font-black text-xl tracking-wider">Wisdom<span className="text-purple-400 font-bold">Vault</span></h1>
                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Centralized Core</p>
              </div>
            </div>

            <div className="h-px w-full bg-Linear-to-r from-white/10 to-transparent" />

            {/* Fast Features Matrix */}
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-purple-400">
                  <FiCpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs">NextJS Server Core</h4>
                  <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">Fast server execution with responsive state hydrations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-purple-400">
                  <FiShield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs">Protected Tiers</h4>
                  <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">Dynamic RBAC policies filtering layers safely.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-purple-400">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs">Premium Modules</h4>
                  <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">Unlock advanced cloud sync tools instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignInPage;