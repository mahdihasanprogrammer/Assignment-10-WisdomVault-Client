import { getLessonsByAuthor } from "@/lib/api/lessons";
import AuthorLessonsTable from "./AuthorLessonsTable";
import { FiMail, FiLayers, FiCheckCircle, FiAward, FiUser, FiBookOpen } from "react-icons/fi";
import { Avatar } from "@heroui/react";

const AuthorLessons = async ({ params }) => {
  const { authorId } = await params;
  const { total = 0, lessons = [] } = await getLessonsByAuthor(authorId);

  const creatorName = lessons[0]?.creatorName || "Anonymous Creator";
  const creatorEmail = lessons[0]?.creatorEmail || "No email provided";
  const creatorImage = lessons[0]?.creatorImage || "";

  return (
    <div className="w-full min-h-screen bg-[#060211] text-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Author Header Card */}
        <div className="w-full bg-linear-to-br from-[#0f0826] via-[#09041a] to-[#050212] border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden text-left">
          
          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute left-1/3 -bottom-20 w-60 h-60 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            
            {/* Left side: Avatar & Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
              <div className="relative shrink-0">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-3 border-purple-500/40 p-1 bg-purple-500/10 rounded-3xl shadow-xl shadow-purple-950/50">
                  {creatorImage ? (
                    <Avatar.Image
                      src={creatorImage}
                      alt={creatorName}
                      referrerPolicy="no-referrer"
                      className="rounded-2xl object-cover"
                    />
                  ) : (
                    <Avatar.Fallback className="bg-[#140b36] flex items-center justify-center rounded-2xl">
                      <FiUser className="w-10 h-10 text-purple-400" />
                    </Avatar.Fallback>
                  )}
                </Avatar>
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#09041a] rounded-full" title="Active Author" />
              </div>

              <div className="space-y-2 min-w-0">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold uppercase tracking-widest text-[10px] px-3 py-1 rounded-lg shadow-sm">
                  <FiAward className="text-amber-400 w-3.5 h-3.5" />
                  <span>Verified Creator</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none truncate">
                  {creatorName}
                </h1>

                <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm hover:text-purple-300 transition-colors">
                  <div className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FiMail className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="truncate font-normal select-all">{creatorEmail}</span>
                </div>
              </div>
            </div>

            {/* Right side: Stats Badges */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-85">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-inner group">
                <div className="flex items-center gap-2 mb-1.5">
                  <FiLayers className="text-purple-400 w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50">Published Insights</span>
                </div>
                <p className="text-2xl font-black bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {String(total).padStart(2, '0')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-inner group">
                <div className="flex items-center gap-2 mb-1.5">
                  <FiCheckCircle className="text-emerald-400 w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50">Status</span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 tracking-wider uppercase inline-block">
                  Active Contributor
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Section Divider & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 text-left">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <FiBookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-lg md:text-xl font-extrabold uppercase tracking-wider text-white">
                Published Portfolio
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal pt-1">
              Explore all conceptual frameworks, retrospectives, and wisdom logs authored by {creatorName}.
            </p>
          </div>
        </div>

        {/* Table / Grid Component */}
        <AuthorLessonsTable lessons={lessons} />

      </div>
    </div>
  );
};

export default AuthorLessons;