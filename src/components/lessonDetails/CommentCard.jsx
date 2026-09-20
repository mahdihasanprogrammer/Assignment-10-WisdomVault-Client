"use client";

import { createComment } from "@/lib/actions/comment";
import { getCommentsByLessonId } from "@/lib/api/comments";
import { Avatar, TextArea, Button, Form } from "@heroui/react";
import { useEffect, useState } from "react";
import { FiMessageCircle, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { toast } from "sonner";

export default function CommentCard({ lesson, user }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDisabled = text.trim().length === 0;

  // কমেন্ট লোড করা
  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const fetchComments = await getCommentsByLessonId(lesson._id);
        setComments(fetchComments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    if (lesson._id) {
      getComments();
    }
  }, [lesson._id]);

  // নতুন কমেন্ট সাবমিট করা
  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to leave a comment");
      return;
    }
    if (user.userRole !== "user") {
      toast.error("Only users can comment");
      return;
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
      setText("");
      toast.success("Comment added!");
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error("Failed to post comment");
    }
  };

  // ডেট ও টাইম ফরম্যাট
  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Just now";
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="space-y-4 text-left w-full bg-linear-to-b from-[#0f082a]/90 to-[#060211]/90 border border-white/10 p-4.5 rounded-3xl backdrop-blur-2xl shadow-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <FiMessageCircle className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest text-white">
            Discussion Thread
          </h3>
        </div>
        <span className="text-xs font-extrabold bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2.5 py-0.5 rounded-lg shadow-inner">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </span>
      </div>

      {/* Premium Input Form */}
      <div className="bg-[#0b051e]/90 border border-white/10 p-3.5 rounded-2xl w-full shadow-inner focus-within:border-purple-500/50 transition-colors duration-300 space-y-2">
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8 shrink-0 border border-purple-500/40 p-[1px] bg-purple-500/10 rounded-xl mt-0.5">
            {user?.image ? (
              <Avatar.Image src={user.image} alt={user.name || "User"} className="rounded-lg object-cover" />
            ) : (
              <Avatar.Fallback className="bg-[#160c3b] flex items-center justify-center rounded-lg">
                <FiUser className="w-4 h-4 text-purple-300" />
              </Avatar.Fallback>
            )}
          </Avatar>

          <Form onSubmit={handleComment} className="flex-1 flex flex-col gap-2 min-w-0">
            <TextArea
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder={user ? "Share your perspective or key takeaway..." : "Log in to join the conversation..."}
              className="w-full bg-transparent text-xs"
              variant="underlined"
              maxRows={3}
              minRows={1}
              classNames={{
                input: "text-white/90 placeholder:text-white/30 text-xs resize-none py-1 leading-relaxed",
                inputWrapper: "border-white/10 after:bg-purple-500 pb-1",
              }}
            />

            <div className="flex justify-end w-full pt-0.5">
              <Button
                isDisabled={isDisabled}
                type="submit"
                size="sm"
                className={`h-7 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  isDisabled
                    ? "bg-purple-900/20 text-white/30 border border-white/5 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)] active:scale-95"
                }`}
              >
                <span>Comment</span>
                <FiSend className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
        {loading ? (
          <div className="py-8 text-center text-xs text-white/30 animate-pulse">
            Loading discussion...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id || comment.id}
              className="flex gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/25 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <Avatar className="w-8 h-8 shrink-0 border border-white/10 rounded-xl group-hover:border-purple-500/40 transition-colors">
                {comment?.userImage ? (
                  <Avatar.Image src={comment.userImage} alt={comment.userName || "User"} className="rounded-lg object-cover" />
                ) : (
                  <Avatar.Fallback className="bg-[#12082b] flex items-center justify-center rounded-lg">
                    <FiUser className="w-4 h-4 text-white/40" />
                  </Avatar.Fallback>
                )}
              </Avatar>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-xs text-white/90 tracking-wide truncate">
                    {comment?.userName || "Community Member"}
                  </span>
                  <span className="text-[10px] text-white/30 font-medium shrink-0">
                    {formatDate(comment?.createdAt || comment?.date)}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-normal break-words whitespace-pre-wrap">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center flex flex-col items-center justify-center gap-2 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
            <FiMessageSquare className="w-6 h-6 text-white/20" />
            <p className="text-xs text-white/40 font-medium">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}