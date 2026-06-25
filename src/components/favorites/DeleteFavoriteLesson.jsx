"use client";

import { useState } from 'react';
import { deleteFavoriteLesson } from '@/lib/actions/favorites';
import { AlertDialog, Button } from '@heroui/react'; //useDisclosure রিমুভ করা হয়েছে
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { toast } from 'sonner';

const DeleteFavoriteLesson = ({ favoriteData }) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    
    // রিঅ্যাক্টের পিওর স্টেট দিয়ে ওপেন/ক্লোজ কন্ট্রোল (এরর আসবে না)
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteFavoriteLesson = async () => {
        try {
            setIsDeleting(true);
            const result = await deleteFavoriteLesson(favoriteData._id);
            
            if (result?.deletedCount > 0) {
                toast.success('Lesson removed from favorites');
                setIsOpen(false); // মোডাল ক্লোজ হবে
                router.refresh();
            } else {
                toast.error('Failed to remove the lesson');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            {/* ডিলিট ট্রিগার বাটন */}
            <Button 
                onClick={() => setIsOpen(true)} // স্টেট true করে মোডাল ওপেন
                size="sm" 
                isIconOnly 
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl w-8 h-8 flex items-center justify-center transition-all duration-300 active:scale-[0.93] cursor-pointer shadow-md shadow-red-950/20" 
                title="Remove from favorites"
            >
                <FiTrash2 className="w-4 h-4" />
            </Button>

            {/* কন্ডিশনাল রেন্ডারিং: মোডাল ওপেন থাকলে এবং ক্লোজ হলে ব্যাকড্রপ ডম থেকে সম্পূর্ণ ভ্যানিশ হবে */}
            {isOpen && (
                <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    {/* backdrop fixed পজিশন সহ */}
                    <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/40 fixed inset-0 z-[9998]" />
                    
                    <AlertDialog.Container className="fixed inset-0 flex items-center justify-center p-4 z-[9999] mx-auto">
                        <AlertDialog.Dialog className="w-full sm:max-w-md  bg-[#0f0a24] border border-white/10 rounded-2xl overflow-hidden p-1 relative shadow-2xl">
                            {/* ক্লোজ ট্রিগার বাটন */}
                            <AlertDialog.CloseTrigger onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors absolute top-4 right-4 cursor-pointer" />

                            <AlertDialog.Header className="flex items-start gap-3 pt-6 px-6">
                                <AlertDialog.Icon status="danger" className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-2.5 h-11 w-11 flex items-center justify-center shrink-0" />
                                <div>
                                    <AlertDialog.Heading className="text-lg font-bold text-white tracking-tight">
                                        Remove from Favorites?
                                    </AlertDialog.Heading>
                                </div>
                            </AlertDialog.Header>

                            <AlertDialog.Body className="px-6 py-3">
                                <p className="text-sm leading-relaxed text-white/60">
                                    This will remove <strong className="text-white font-semibold">{favoriteData?.lessonInfo?.lessonTitle || 'Untitled Lesson'}</strong> from your bookmarks log.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer className="px-6 pb-6 pt-3 flex items-center justify-end gap-3 border-t border-white/5 mt-2">
                                {/* Cancel Button */}
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    variant="tertiary"
                                    disabled={isDeleting}
                                    className="px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10 disabled:opacity-40 cursor-pointer"
                                >
                                    Cancel
                                </Button>

                                {/* Confirm Delete Button */}
                                <Button
                                    onClick={handleDeleteFavoriteLesson}
                                    variant="danger"
                                    disabled={isDeleting}
                                    className="px-5 py-2 text-sm font-bold bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white rounded-xl transition-all shadow-lg shadow-rose-950/40 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDeleting ? (
                                        <>
                                            <span>Removing...</span>
                                            <FiLoader className="w-3.5 h-3.5 animate-spin" />
                                        </>
                                    ) : (
                                        "Confirm Delete"
                                    )}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog>
            )}
        </div>
    );
};

export default DeleteFavoriteLesson;