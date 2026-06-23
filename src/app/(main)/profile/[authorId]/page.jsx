import { getLessonsByAuthor } from "@/lib/api/lessons";
import AuthorLessonsTable from "./AuthorLessonsTable";
import { FiMail, FiLayers, FiCheckCircle, FiAward, FiUser } from "react-icons/fi";
import { Avatar } from "@heroui/react";

const AuthorLessons = async ({ params }) => {
  const { authorId } = await params;
  const { total, lessons = [] } = await getLessonsByAuthor(authorId);

  // প্রথম লেসন অবজেক্ট থেকে ক্রিয়েটরের প্রফেশনাল ডাটা এক্সট্র্যাক্ট করা হচ্ছে
  const creatorName = lessons[0]?.creatorName || "Anonymous Creator";
  const creatorEmail = lessons[0]?.creatorEmail || "No email provided";
  const creatorImage = lessons[0]?.creatorImage || "";

  return (
    <div className="w-full mx-auto space-y-8 px-4 md:px-8 py-12 text-white min-h-screen bg-[#060211]">
      
{/* professional dashboard */}
      <div className="w-full bg-linear-to-br from-[#0f0826] via-[#09041a] to-[#050212] border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl relative overflow-hidden text-left">

        {/* প্রিমিয়াম রিফ্লেক্টিভ গ্লো ইফেক্ট */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-60 h-60 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          
          {/* বাম পাশ: প্রোফাইল মেটাডাটা */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
            {/* প্রিমিয়াম বর্ডারসহ লার্জ অ্যাভাটার (HeroUI Anatomy Based) */}
            <div className="relative shrink-0">
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-3 border-purple-500/30 p-1 bg-purple-500/10 rounded-[28px] shadow-lg shadow-purple-950/50">
               
                  <Avatar.Image src={creatorImage} alt={creatorName}
                  referrerPolicy="no-referrer" />
                
                  <Avatar.Fallback>
                    <FiUser className="w-10 h-10 text-purple-400" />
                  </Avatar.Fallback>
             
              </Avatar>
            </div>

            <div className="space-y-2.5 min-w-0">
              {/* ভেরিফাইড কন্ট্রিবিউটর ব্যাজ */}
              <div className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase tracking-widest text-[10px] px-2.5 py-0.5 rounded-md">
                <FiAward className="text-amber-400 w-3 h-3" />
                <span>Verified Contributor</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none truncate">
                {creatorName}
              </h1>

              {/* কন্ট্যাক্ট ইমেইল লিংক */}
              <div className="flex items-center gap-2 text-white/50 text-sm hover:text-purple-300 transition-colors duration-200">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <FiMail className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="truncate font-light select-all">{creatorEmail}</span>
              </div>
            </div>
          </div>

          {/* ডান পাশ: রিক্রুটার স্পেশাল কন্ট্রিবিউশন মেট্রিক্স ড্যাশবোর্ড */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-85">
            
            {/* মেট্রিক ১: টোটাল কন্ট্রিবিউশন */}
            <div className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-purple-500/20 transition-all duration-300 shadow-inner group">
              <div className="flex items-center gap-2 mb-1">
                <FiLayers className="text-purple-400 w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Total Insights</span>
              </div>
              <p className="text-2xl font-black bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
                {String(total).padStart(2, '0')}
              </p>
            </div>

            {/* মেট্রিক ২: অ্যাক্টিভিটি লেভেল */}
            <div className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 shadow-inner group">
              <div className="flex items-center gap-2 mb-2">
                <FiCheckCircle className="text-emerald-400 w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Activity Status</span>
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 tracking-wider uppercase">
                Highly Active
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ২. মাঝখানের হেডিং ও ডেসক্রিপশন সেকশন */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 pb-2 text-left relative">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {/* অ্যানিমেটেড পালস মার্কার */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-white/90">
              Published Portfolio
            </h2>
          </div>
          <p className="text-sm md:text-sm text-white/70 max-w-xl leading-relaxed font-light">
            A comprehensive architectural review of all core blueprints, mental models, and structured insights documented by this user.
          </p>
        </div>

       
        
        {/* বটম গ্রাডিয়েন্ট ডিভাইডার গ্লো */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-500/30 via-white/5 to-transparent" />
      </div>

      {/* ৩. চাইল্ড টেবিল কম্পোনেন্ট কল */}
      <AuthorLessonsTable lessons={lessons} />

    </div>
  );
};

export default AuthorLessons;