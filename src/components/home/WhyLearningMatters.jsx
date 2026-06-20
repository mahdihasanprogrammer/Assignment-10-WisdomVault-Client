import { FiShield, FiTrendingUp, FiGitCommit, FiAward } from "react-icons/fi";

export default function WhyLearningMatters() {
  // ৪টি বেনিফিট কার্ডের স্ট্যাটিক ডাটাসেট
  const benefits = [
    {
      icon: FiShield,
      title: "Retention of Expertise",
      desc: "Never lose a critical breakthrough. Archiving your personal syntax rules, deep logic, and architectural bugs ensures lifetime accessibility.",
    },
    {
      icon: FiTrendingUp,
      title: "Compound Knowledge",
      desc: "Documenting mistakes prevents repeating them. Watch your engineering skills compound over time as you stack proven insights.",
    },
    {
      icon: FiGitCommit,
      title: "Structured Mentorship",
      desc: "Turn your raw experiences into a well-defined roadmap. Share structured vault logs easily with junior developers or teammates.",
    },
    {
      icon: FiAward,
      title: "Accelerated Growth",
      desc: "Bypass the endless loop of re-googling the same errors. Access your tailored wisdom repository instantly and build faster.",
    },
  ];

  return (
    <section className="relative w-full bg-[#080418] py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden border-b border-white/5">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/[0.07] rounded-full blur-3xl pointer-events-none" />

      <div className=" mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center space-y-3">
          <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Core Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Why Learning From Life <span className="text-purple-400">Matters</span>
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Raw experience is chaotic. WisdomVault helps you structure, save, and deploy your lifes technical lessons so you never solve the same problem twice.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/1 hover:bg-white/3 border border-white/10 hover:border-purple-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start text-left shadow-xl shadow-black/40"
              >
                {/* Glow effect inside card on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-600/0 via-purple-600/0 to-purple-600/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Animated Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-5">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white mb-2 tracking-wide group-hover:text-purple-300 transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}