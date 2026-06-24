"use client";

import { Avatar, Input, Button } from "@heroui/react";
import { FiMessageCircle, FiSend, FiUser } from "react-icons/fi";

export default function CommentCard({ lesson }) {

  
  return (
    <div className="space-y-6 text-left w-full bg-linear-to-b from-[#0d071f]/60 to-[#060211]/80 border border-white/5 p-5 rounded-3xl backdrop-blur-xl shadow-xl">
      {/* হেডার সেকশন */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <FiMessageCircle className="text-purple-400 w-4 h-4" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-wider text-white/90">
          Comments <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 text-xs ml-1 font-bold">(4)</span>
        </h3>
      </div>

      {/* প্রিমিয়াম ইনপুট বক্স */}
      <div className="flex gap-3 bg-[#0c071d]/90 border border-white/10 p-3 rounded-2xl items-center w-full shadow-inner focus-within:border-purple-500/40 transition-colors duration-300">
        <Avatar className="w-8 h-8 shrink-0 border border-purple-500/30 p-[1px] bg-purple-500/10 rounded-xl">
          <Avatar.Fallback><FiUser className="w-4 h-4 text-purple-300" /></Avatar.Fallback>
        </Avatar>
        <div className="flex-1 relative flex items-center min-w-0">
          <Input 
            placeholder="Add a meaningful comment..." 
            className="w-full bg-transparent text-xs"
            variant="underlined"
            size="sm"
            classNames={{
              input: "text-white/90 placeholder:text-white/30 text-xs",
              inputWrapper: "border-white/5 after:bg-purple-500",
            }}
          />
          <Button isIconOnly size="sm" className="absolute right-0 bottom-0.5 bg-linear-to-r from-purple-600 to-pink-600 w-7 h-7 min-w-7 rounded-xl hover:opacity-90 shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all">
            <FiSend className="text-white w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* থিমড থ্রেড কমেন্টস লিস্ট */}
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
        {[1, 2].map((comment) => (
          <div key={comment} className="flex gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300 group">
            <Avatar className="w-8 h-8 shrink-0 border border-white/10 rounded-xl group-hover:border-purple-500/30 transition-colors">
              <Avatar.Fallback><FiUser className="w-4 h-4 text-white/40" /></Avatar.Fallback>
            </Avatar>
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-xs text-white/90 tracking-wide truncate">Tahmid Rahman</span>
                <span className="text-[9px] text-white/30 font-medium shrink-0">2h ago</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light break-words">
                This blueprint changed my perspective on daily life goals completely. Absolutely fantastic insight!
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}