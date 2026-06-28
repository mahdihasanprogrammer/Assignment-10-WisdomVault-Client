"use client";

import { deleteLessonPermanently } from "@/lib/actions/lessons";
import { AlertDialog, Button, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

const PermanentlyDeleteLessonModal = ({ lesson, onDeleteSuccess }) => {
    const router = useRouter();
    const [isDelete, setIsDelete] = useState(false);
    
    const handleDeleteConfirm = async (currentLessonId) => {
        try {
            setIsDelete(true);
            const result = await deleteLessonPermanently(currentLessonId);
            
            if (result?.deletedCount > 0) {
                toast.success("Lesson deleted permanently!");
                // ১. প্যারেন্ট স্টেট থেকে ডিলিট করা আইডি রিমুভ করবে (UI ইনস্ট্যান্ট রিলোড ছাড়া আপডেট হবে)
                if (onDeleteSuccess) {
                    onDeleteSuccess(currentLessonId);
                }
                // ২. সার্ভার কম্পোনেন্টের ক্যাশ ব্যাকএন্ডে রিফ্রেশ করবে
                router.refresh(); 
            } else {
                toast.error("Lesson not found or already deleted.");
            }
        } catch (error) {
            toast.error("Failed to delete lesson.");
        } finally {
            setIsDelete(false);
        }
    };

    return (
        <div>
            <AlertDialog>
                <Tooltip delay={0}>
                    <Button 
                        isIconOnly // Added for HeroUI icons
                        aria-label="Open delete confirmation dialog" // Fixed aria-label
                        className='rounded-full' 
                        variant="danger"
                    >
                        <FiTrash2 />
                    </Button>
                    <Tooltip.Content>
                        <p>Delete Lesson</p>
                    </Tooltip.Content>
                </Tooltip>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger aria-label="Close dialog" /> {/* Fixed aria-label */}
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete Lesson permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete <strong>{lesson.lessonTitle}</strong> and all of its
                                    data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button
                                    isDisabled={isDelete}
                                    onClick={() => handleDeleteConfirm(lesson._id)}
                                    slot="close" 
                                    variant="danger"
                                    aria-label="Confirm delete lesson" // Fixed aria-label
                                >
                                    {isDelete ? "Deleting..." : "Delete Lesson"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default PermanentlyDeleteLessonModal;