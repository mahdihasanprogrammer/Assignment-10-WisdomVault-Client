"use client";


import { FiCheck, FiX, FiZap, FiShield } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';




const PricingPage = () => {

    // কম্প্যারিসন টেবিলের ৮টি রো ডাটা
    const features = [
        { name: "Number of lessons that can be created", free: "Up to 5 Lessons", premium: "Unlimited Lessons" },
        { name: "Premium lesson creation access", free: false, premium: true },
        { name: "Ad-free experience", free: false, premium: true },
        { name: "Priority listing in public lessons", free: false, premium: true },
        { name: "Access to premium content from others", free: "Read-only (Limited)", premium: "Full Access" },
        { name: "Community badge / verified status", free: false, premium: "Golden Verified Badge" },
        { name: "Advanced Analytics for lessons", free: false, premium: true },
        { name: "24/7 Priority Support", free: "Community Forum", premium: "Dedicated Email & Chat" },
    ];

    return (
        <div className="min-h-screen bg-[#030014] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">
            {/* ব্যাকগ্রাউন্ড মেগা গ্লো ইফেক্ট */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

            {/* হেডার সেকশন */}
            <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Exclusive Premium Tier
                </span>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white/95 mt-4">
                    Unlock <span className="bg-linear-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">Lifetime Access</span>
                </h1>
                <p className="mt-4 text-xs sm:text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
                    Say goodbye to limitations. Elevate your learning and contribution capability with our single premium pass.
                </p>
            </div>

            {/* ফোকাসড একক প্রিমিয়াম কার্ড */}
            <div className="w-full max-w-md mx-auto mb-24 relative z-10">
                <div className="border-2 border-purple-500 bg-[#0c0721]/60 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-[0_0_80px_-15px_rgba(139,92,246,0.4)] relative overflow-hidden">
                    {/* লিনিয়ার লাইট ইফেক্ট কার্ডের ভেতরে */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-purple-400 to-transparent opacity-50" />

                    {/* টপ ব্যাজ */}
                    <div className="absolute -top-3.5 right-8 px-3 py-1 bg-linear-to-r from-amber-500 to-purple-600 rounded-full text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-lg">
                        <FaCrown className="w-3 h-3 text-amber-300" /> Premium Access
                    </div>

                    {/* কার্ড কন্টেন্ট */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                            <FiZap className="fill-purple-400 text-purple-400 w-4 h-4" /> Lifetime Pro
                        </h3>
                        <span className="px-2.5 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-[10px] font-bold text-purple-300 uppercase tracking-wide">One-Time</span>
                    </div>

                    <div className="mb-6 flex items-baseline">
                        <span className="text-5xl font-black bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-transparent">৳1500</span>
                        <span className="text-purple-400 text-xs font-bold ml-2">/ No Renewal Fees</span>
                    </div>

                    <p className="text-xs text-white/60 mb-8 leading-relaxed">
                        Get permanent full access to all features forever. No monthly subscriptions, no hidden fees, pay once and keep it for life.
                    </p>

                    {/* HeroUI প্রিমিয়াম আপগ্রেড বাটন */}
                
                    <form action="/api/checkout_sessions" method="POST">
                        <section>
                            <button type="submit" role="link"
                             className="w-full py-7 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-[size:200%_auto] hover:bg-right transition-all duration-500 rounded-2xl text-xs font-black tracking-wider text-white shadow-[0_8px_30px_rgba(168,85,247,0.4)] uppercase cursor-pointer">
                                 Upgrade to Premium
                            </button>
                        </section>
                    </form>

                    <div className="flex items-center gap-1.5 justify-center mt-5 text-[10px] text-white/40 font-semibold">
                        <FiShield className="text-emerald-500 w-3.5 h-3.5" /> 100% Secure Checkout via Stripe Test Mode
                    </div>
                </div>
            </div>

            {/* ফিচার কম্প্যারিসন টেবিল সেকশন */}
            <div className="w-full max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white/95">Compare Plans & Features</h2>
                    <p className="text-[11px] text-white/40 mt-1 font-medium">Deep-dive look at what you get with each tier</p>
                </div>

                <div className="border border-white/6rounded-2xl bg-[#070314]/20 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/6bg-white/[0.02]">
                                    <th className="p-5 text-xs font-bold text-white/40 uppercase tracking-wider w-1/2">Features</th>
                                    <th className="p-5 text-xs font-bold text-white/40 uppercase tracking-wider text-center w-1/4">Free</th>
                                    <th className="p-5 text-xs font-bold text-purple-400 uppercase tracking-wider text-center w-1/4">Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/4">
                                {features.map((feature, idx) => (
                                    <tr key={idx} className="hover:bg-white/1 transition-colors">
                                        {/* ফিচার নাম */}
                                        <td className="p-5 text-xs font-semibold text-white/80">
                                            {feature.name}
                                        </td>

                                        {/* ফ্রি কলাম */}
                                        <td className="p-5 text-center text-xs">
                                            {typeof feature.free === 'string' ? (
                                                <span className="text-white/50 font-medium">{feature.free}</span>
                                            ) : feature.free ? (
                                                <FiCheck className="w-4 h-4 text-emerald-500 mx-auto" />
                                            ) : (
                                                <FiX className="w-4 h-4 text-white/20 mx-auto" />
                                            )}
                                        </td>

                                        {/* প্রিমিয়াম কলাম */}
                                        <td className="p-5 text-center text-xs bg-purple-500/1">
                                            {typeof feature.premium === 'string' ? (
                                                <span className="text-purple-300 font-black">{feature.premium}</span>
                                            ) : feature.premium ? (
                                                <FiCheck className="w-4 h-4 text-purple-400 mx-auto stroke-3" />
                                            ) : (
                                                <FiX className="w-4 h-4 text-white/20 mx-auto" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;