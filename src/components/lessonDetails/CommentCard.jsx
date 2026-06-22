"use client";

import { Avatar, Input, Button } from "@heroui/react";
import { FiMessageCircle, FiSend, FiUser } from "react-icons/fi";

export default function CommentCard({ lesson }) {
  return (
    <div className="space-y-6 text-left w-full">
      {/* হেডার */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <FiMessageCircle className="text-purple-400 w-4 h-4" />
        <h3 className="text-sm font-black uppercase tracking-wide text-white/80">
          Comments <span className="text-purple-400 text-xs ml-1">(4)</span>
        </h3>
      </div>

      {/* কমপ্যাক্ট ইনপুট বক্স */}
      <div className="flex gap-3 bg-[#0d071f]/40 border border-white/5 p-3 rounded-2xl items-center w-full">
        <Avatar className="w-8 h-8 shrink-0 border border-white/10 rounded-lg">
          <Avatar.Fallback><FiUser className="w-4 h-4" /></Avatar.Fallback>
        </Avatar>
        <div className="flex-1 relative flex items-center min-w-0">
          <Input 
            placeholder="Add a comment..." 
            className="w-full bg-transparent text-xs"
            variant="underlined"
            size="sm"
          />
          <Button isIconOnly size="sm" className="absolute right-0 bottom-1 bg-purple-600 w-7 h-7 min-w-7 rounded-lg hover:opacity-90">
            <FiSend className="text-white w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* স্লিম থ্রেড কমেন্টস */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {[1, 2].map((comment) => (
          <div key={comment} className="flex gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5">
            <Avatar className="w-8 h-8 shrink-0 border border-white/5 rounded-lg">
              <Avatar.Fallback><FiUser className="w-4 h-4" /></Avatar.Fallback>
            </Avatar>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-white/90 truncate">Tahmid Rahman</span>
                <span className="text-[9px] text-white/30 shrink-0">2h ago</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light break-words">
                This blueprint changed my perspective on daily life goals completely.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}