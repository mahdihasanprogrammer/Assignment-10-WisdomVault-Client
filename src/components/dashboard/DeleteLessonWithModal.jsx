"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { deleteLesson } from "@/lib/actions/lessons";

export function DeleteLessonWithModal({ lesson }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteLesson(lesson._id);
      
      if (result?.deletedCount > 0) {
        // Updated deep charcoal-black premium background toast
        toast.success("Lesson deleted successfully", {
          icon: <FiTrash2 className="w-4 h-4 text-rose-400" />,
          className: "bg-[#0a050c] border border-rose-500/30 text-rose-100 rounded-xl px-4 py-3 shadow-xl flex items-center gap-2 text-sm font-medium tracking-wide",
        });
        
        router.refresh();
      } else {
        toast.error("Failed to delete the lesson.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* Trigger Button */}
      <Button 
        title="Delete Lesson" 
        size="sm" 
        isIconOnly 
        className="bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-xl h-8 w-8 cursor-pointer transition-colors"
      >
        <FiTrash2 className="w-3.5 h-3.5" />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-md bg-[#0f0a24] border border-white/10 rounded-2xl overflow-hidden p-1">
            <AlertDialog.CloseTrigger />
            
            <AlertDialog.Header className="flex items-start gap-3 pt-6 px-6">
              <AlertDialog.Icon status="danger" className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-2.5 h-11 w-11 flex items-center justify-center shrink-0" />
              <div>
                <AlertDialog.Heading className="text-lg font-bold text-white">
                  Delete lesson permanently?
                </AlertDialog.Heading>
              </div>
            </AlertDialog.Header>
            
            <AlertDialog.Body className="px-6 py-3">
              <p className="text-sm leading-relaxed text-white/60">
                This will permanently delete your lesson log 
                <strong className="text-white font-semibold"> {lesson.lessonTitle || 'Untitled Lesson'}</strong> 
                and all related analytical contents. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            
            <AlertDialog.Footer className="px-6 pb-6 pt-3 flex items-center justify-end gap-3 border-t border-white/5 mt-2">
              <Button 
                slot="close" 
                variant="tertiary"
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10"
              >
                Cancel
              </Button>
              
              <Button 
                onClick={handleDelete}
                slot={isDeleting ? undefined : "close"} 
                variant="danger"
                disabled={isDeleting}
                className="px-5 py-2 text-sm font-bold bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white rounded-xl transition-all shadow-lg shadow-rose-950/40 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <span>Deleting...</span>
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  </>
                ) : (
                  "Delete Lesson"
                )}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}