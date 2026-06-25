"use client";

import { createComment } from "@/lib/actions/comment";
import { getCommentsByLessonId } from "@/lib/api/comments";
import { Avatar, TextArea, Button, Form } from "@heroui/react"; // TextArea ব্যবহার করা হয়েছে
import { useEffect, useState } from "react";
import { FiMessageCircle, FiSend, FiUser } from "react-icons/fi";
import { toast } from "sonner";

export default function CommentCard({ lesson, user }) {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const isDisabled = text.trim().length === 0;

  // কমেন্ট লোড করা
  useEffect(() => {
    const getComments = async () => {
      try {
        const fetchComments = await getCommentsByLessonId(lesson._id);
        setComments(fetchComments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, [lesson._id]);

  // নতুন কমেন্ট সাবমিট করা
  const handleComment = async (e) => {
    e.preventDefault();
    if(!user){
      toast.error('please logged in to comment')
     return 
    }
    if (isDisabled) return;

    const data = {
      lessonId: lesson._id,
      userId: user?.id,
      userName: user?.name,
      userImage: user?.image,
      text: text,
    };

    try {
      const result = await createComment(lesson._id, data);
      setComments(result);
      setText(''); // সাবমিট শেষে ইনপুট ক্লিয়ার
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // ডেট ও টাইম ফরম্যাট করার ফাংশন
  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-6 text-left w-full bg-linear-to-b from-[#0d071f]/60 to-[#060211]/80 border border-white/5 p-5 rounded-3xl backdrop-blur-xl shadow-xl">
      
      {/* হেডার সেকশন */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <FiMessageCircle className="text-purple-400 w-4 h-4" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-wider text-white/90">
          Comments <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 text-base ml-1 font-bold">({comments.length})</span>
        </h3>
      </div>

      {/* প্রিমিয়াম ইনপুট বক্স */}
      <div className="flex gap-3 bg-[#0c071d]/90 border border-white/10 p-4 rounded-2xl items-start w-full shadow-inner focus-within:border-purple-500/40 transition-colors duration-300">
        
        {/* লগইন করা ইউজারের Avatar */}
        <Avatar className="w-8 h-8 shrink-0 border border-purple-500/30 p-[1px] bg-purple-500/10 rounded-xl mt-1">
          {user?.image && <Avatar.Image src={user.image} alt={user.name || "User"} />}
          <Avatar.Fallback><FiUser className="w-4 h-4 text-purple-300" /></Avatar.Fallback>
        </Avatar>
        
        {/* ফরম এবং বাটন লেআউট আপডেট করা হয়েছে */}
        <Form onSubmit={handleComment} className="flex-1 flex flex-col gap-3 min-w-0">
          <TextArea 
            onChange={(e) => { setText(e.target.value); }}
            value={text}
            placeholder="Add a meaningful comment..." 
            className="w-full bg-transparent text-xs"
            variant="underlined"
           maxRows={4}
           minRows={1}
            
            classNames={{
              input: "text-white/90 placeholder:text-white/30 text-xs resize-none py-1",
              inputWrapper: "border-white/5 after:bg-purple-500 pb-2",
            }}
          />
          
          {/* বাটনটি এখন TextArea এর সম্পূর্ণ বাইরে, নিচে ডানপাশে */}
          <div className="flex justify-end w-full">
            <Button
              isDisabled={isDisabled}
              type="submit"
              isIconOnly 
              size="sm" 
              className="bg-linear-to-r from-purple-600 to-pink-600 w-8 h-8 min-w-8 rounded-xl hover:opacity-90 shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all"
            >
              <FiSend className="text-white w-3.5 h-3.5" />
            </Button>
          </div>
        </Form>
      </div>

      {/* থিমড থ্রেড কমেন্টস লিস্ট */}
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300 group">
            
            {/* কমেন্টকারীর Avatar */}
            <Avatar className="w-8 h-8 shrink-0 border border-white/10 rounded-xl group-hover:border-purple-500/30 transition-colors">
              {comment?.userImage && <Avatar.Image src={comment.userImage} alt={comment.userName || "User"} />}
              <Avatar.Fallback><FiUser className="w-4 h-4 text-white/40" /></Avatar.Fallback>
            </Avatar>

            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4">
                <span className="font-extrabold text-xs text-white/90 tracking-wide truncate">{comment?.userName || "Anonymous"}</span>
                <span className="text-[9px] text-white/30 font-medium shrink-0">
                  {formatDate(comment?.createdAt || comment?.date)}
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light break-words whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}