"use client";

import { AlertDialog, Button } from '@heroui/react';
import React from 'react';
import { FiEye, FiMail, FiAlertTriangle, FiFileText } from 'react-icons/fi';

const ReportedLessonsModal = ({ report, handleDeleteLesson, handleIgnoreReport }) => {

const ignoreWrapper = ()=>{
    handleIgnoreReport(report?.lessonId)
}

const deleteWrapper = ()=>{
    handleDeleteLesson(report?.lessonId)
}
    return (
        <div>
            <AlertDialog>
                {/* টেবিলের ভেতরের ট্রিগার বাটন */}
                <Button
                    className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                >
                    <FiEye className="w-3.5 h-3.5" /> View Reasons
                </Button>

                <AlertDialog.Backdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <AlertDialog.Container className="w-full max-w-lg">
                        <AlertDialog.Dialog className="bg-[#0f0a24] border border-white/10 text-white rounded-2xl overflow-hidden shadow-2xl w-full relative">
                            
                            {/* কাস্টম ক্লোজ ক্রস বাটন */}
                            <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer text-sm" />
                            
                            {/* মডাল হেডার */}
                            <AlertDialog.Header className="p-6 border-b border-white/5 flex items-center gap-3">
                                <AlertDialog.Icon>
                                    <FiAlertTriangle className="text-rose-400 w-5 h-5" />
                                </AlertDialog.Icon>
                                <div>
                                    <AlertDialog.Heading className="text-xl font-black text-purple-300">
                                        Report Documentation
                                    </AlertDialog.Heading>
                                    <p className="text-xs text-white/40 font-mono mt-0.5">
                                        Lesson ID: {report?.lessonId || "N/A"}
                                    </p>
                                </div>
                            </AlertDialog.Header>

                            {/* মডাল বডি: প্রতিটি কমপ্লেন আলাদা আলাদা কার্ড আকারে দেখাবে */}
                            <AlertDialog.Body className="p-6 space-y-4 max-h-[45vh] overflow-y-auto">
                                {report?.allReports && report.allReports.length > 0 ? (
                                    report.allReports.map((reporter, index) => (
                                        <div 
                                            key={index} 
                                            className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 shadow-inner"
                                        >
                                            {/* রিপোর্টার ইমেইল */}
                                            <div className="flex items-center gap-2 text-xs text-purple-300 font-medium">
                                                <FiMail className="w-3.5 h-3.5 text-purple-400" />
                                                <span className="font-semibold">Reporter:</span>
                                                <span className="text-white/80">{reporter?.reporterUserEmail}</span>
                                            </div>

                                            {/* আপনার রিকোয়ারমেন্ট অনুযায়ী রিজন সেকশন */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-amber-400/80">Reason:</span>
                                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded">
                                                    {reporter?.reportReason || "General Flag"}
                                                </span>
                                            </div>

                                            {/* রিপোর্টের বিস্তারিত বিবরণ */}
                                            <div className="flex gap-2 text-sm text-white/70 bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                                                <FiFileText className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                                <p>{reporter?.reportDetails || "No descriptions provided."}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-white/40 text-center py-4">No individual reports found for this lesson.</p>
                                )}
                            </AlertDialog.Body>

                            {/* মডাল ফুটার: আপনার রিকোয়ারমেন্ট অনুযায়ী দুটি অ্যাকশন বাটন */}
                            <AlertDialog.Footer className="p-4 bg-white/5 border-t border-white/5 flex justify-end gap-2.5">
                                
                                {/* Ignore Button */}
                                <Button 
                                    slot="close" 
                                    onClick={ignoreWrapper}
                                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                                >
                                    Ignore
                                </Button>

                                {/* Delete Lesson Button */}
                                <Button 
                                    slot="close" 
                                    onClick={deleteWrapper}
                                    className="bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                                >
                                    Delete Lesson
                                </Button>

                            </AlertDialog.Footer>

                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default ReportedLessonsModal;