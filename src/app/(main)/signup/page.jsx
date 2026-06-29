"use client";


import { Button, Description, FieldError, Form, Input, Label, Spinner, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { FiCheckCircle, FiShield, FiCpu, FiEye, FiEyeOff, FiLayers } from 'react-icons/fi';
import { LuSparkles, LuUserPlus } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from '@/lib/auth-client';



const SignUpPage = () => {

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle Password visibility state
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form.entries());
      const role = "user";
      
      const { data, error} = await signUp.email({
        name: formData.name,
        image: formData.image,
        email: formData.email,
        password: formData.password,
        userRole: role,
        ...(role === "user" && {isPremium: false})
      });

      console.log('data', data)

      if (data) {
        router.push('/signin');
        toast.success("Registration successful 🚀");
        e.target.reset();
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
      const data =await signIn.social({ provider: "google"});
      console.log('GData', data)
    } catch (err) {
      toast.error("Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-500/60 focus:bg-white/10 transition-all duration-200";
  const labelClass = "text-xs font-semibold tracking-wider text-purple-300 uppercase mb-1 block";

  return (
    <div className="min-h-screen bg-[#080418] flex relative overflow-hidden">
      
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-125 h-125 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ================= LEFT SIDE: FORM CONTAINER ================= */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-16 lg:px-20 xl:px-28 py-12 relative z-10 overflow-y-auto">
        
        {/* Mobile Header -> REMOVED/HIDDEN COMPLETELY via 'hidden' class to clean mobile view */}
        <div className="hidden items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center">
            <FiLayers className="text-white text-sm" />
          </div>
          <span className="text-white font-black text-base tracking-wide">Wisdom<span className="text-purple-400">Vault</span></span>
        </div>

        {/* Form Wrapper Card */}
        <div className="max-w-md w-full mx-auto lg:mx-0 bg-linear-to-b from-white/3 to-white/1 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_0_50px_rgba(139,92,246,0.05)]">
          
          {/* Top Decorative Sparkle Icon Layer */}
          <div className="flex items-center gap-2 mb-2">
            <LuSparkles className="text-purple-400 text-sm animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-purple-400/80 uppercase">Secured Gate</span>
          </div>

          <h2 className="bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent font-black text-2xl sm:text-3xl tracking-tight mb-1.5">
            Get Started
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mb-6">
            Create an account to securely access your cloud modules.
          </p>

          <Form className="flex flex-col gap-4 w-full" onSubmit={handleSignUp}>
            <TextField isRequired name="name" type="text">
              <Label className={labelClass}>Full Name</Label>
              <Input placeholder="Enter your name" className={inputClass} />
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>

            <TextField isRequired name="image" type="url">
              <Label className={labelClass}>Avatar Photo URL</Label>
              <Input placeholder="https://example.com/avatar.jpg" className={inputClass} />
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>

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

            {/* Password Field with Dynamic Eye Visibility Option */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type={showPassword ? "text" : "password"} // Switches securely via state
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
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              <Description className="text-[10px] text-white/40 mt-1 block leading-relaxed">
                Must contain 8+ characters with 1 uppercase, 1 lowercase and 1 number.
              </Description>
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>

            <Button 
              type="submit" 
              disabled={loading || googleLoading}
              className="w-full mt-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold tracking-wider py-3 rounded-xl transition-all duration-300 shadow-xl shadow-purple-500/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Spinner size="sm" color="white" /> Creating Account...</>
              ) : (
                <>
                  <LuUserPlus className="text-sm text-white/90" />
                  <span>Create Account</span>
                </>
              )}
            </Button>
          </Form>

          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <span className="relative bg-[#0d091e] px-3 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
              or continue with
            </span>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50"
          >
            {googleLoading ? <Spinner size="sm" color="current" /> : <><FcGoogle className="text-xl" /><span>Google Authenticate</span></>}
          </Button>

          <p className="mt-6 text-center text-sm text-white/50">
            Already have an account?{" "}
            <Link 
              href="/signin"
              className="font-semibold text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4 decoration-purple-500/40"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: BRAND SHOWCASE BANNER ================= */}
      <div className="hidden lg:flex w-[45%] bg-[#0e0926]/40 border-l border-white/10 relative items-center justify-center p-12 overflow-hidden">
        
        {/* Ambient Tech Glow Backgrounds */}
        <div className="absolute -top-20 -right-20 w-100 h-100 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-10 w-100 h-100 bg-indigo-600/20 rounded-full blur-[100px]" />
        
        {/* Clean Tech Grid Dot Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-linear(to_right,#ffffff03_1px,transparent_1px),linear-linear(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Dynamic Display Presentation Card */}
        <div className="relative z-10 max-w-sm flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <FiLayers className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl tracking-wider">Wisdom<span className="text-purple-400 font-bold">Vault</span></h1>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Centralized Learning Core</p>
            </div>
          </div>

          <div className="h-px w-full bg-linear-to-r from-white/10 to-transparent" />

          {/* Quick Core Tech Bullet Features */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3.5 group">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/40 transition-colors text-purple-400">
                <FiCpu size={18} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">NextJS Server Architecture</h4>
                <p className="text-xs text-white/50 mt-0.5 leading-relaxed">Optimized client states with immediate auth synchronization & hydration.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 group">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/40 transition-colors text-purple-400">
                <FiShield size={18} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Role Based Protected Routes</h4>
                <p className="text-xs text-white/50 mt-0.5 leading-relaxed">Dynamic nav matrices and modules separated perfectly via robust server filters.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 group">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/40 transition-colors text-purple-400">
                <FiCheckCircle size={18} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Premium Ecosystem</h4>
                <p className="text-xs text-white/50 mt-0.5 leading-relaxed">Unlock advanced analytics, private lessons, and secure vault storage tiers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignUpPage;