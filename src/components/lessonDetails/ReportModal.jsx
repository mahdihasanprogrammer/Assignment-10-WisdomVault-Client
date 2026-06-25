"use client";

import { useState } from 'react';
import {
  Button, TextArea, AlertDialog, Select, Label, Description,
  Header, ListBox, Separator
} from '@heroui/react';

import { FiFlag } from 'react-icons/fi';

const ReportModal = ({ handleReport }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // সিলেক্টেড ভ্যালু এবং ডিটেইলসের জন্য স্টেট
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const handleFirstConfirm = () => {
    setIsConfirmOpen(false);
    setIsFormOpen(true);
  };

  const handleFinalSubmit = () => {
    if (handleReport) {
      handleReport({ reason: reportReason, details: reportDetails });
    }
    setIsFormOpen(false);
    setReportReason("");
    setReportDetails("");
  };

  return (
    <div>
      {/* মূল ট্রিগার বাটন */}
      <Button
        onClick={() => setIsConfirmOpen(true)}
        size="sm"
        className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl text-xs h-9 font-semibold transition-all duration-300 active:scale-[0.97] flex items-center gap-2 px-4 shadow-lg shadow-red-950/20 cursor-pointer"
        title="Report This Lesson"
      >
        <FiFlag className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Report</span>
      </Button>

      {/* STEP 1: কনফার্মেশন মোডাল (z-index এবং পজিশনিং ফিক্সড) */}
      {isConfirmOpen && (
        <AlertDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
          <AlertDialog.Backdrop className="backdrop-blur-md bg-black/50 fixed inset-0 z-[9998]" />
          <AlertDialog.Container className="fixed inset-0 flex items-center justify-center p-4 z-[9999] mx-auto">
            <AlertDialog.Dialog className="w-full sm:max-w-[400px] bg-slate-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <AlertDialog.CloseTrigger onClick={() => setIsConfirmOpen(false)} className="text-white/40 hover:text-white transition-colors absolute top-4 right-4 cursor-pointer" />
              
              <AlertDialog.Header className="flex flex-col items-center pt-2">
                <AlertDialog.Icon status="danger" className="bg-red-500/10 text-red-500 border border-red-500/20 p-1 rounded-full mb-4" />
                <AlertDialog.Heading className='text-center'>
                  <h1 className='text-2xl font-bold text-white tracking-tight'>Are you sure?</h1>
                  <p className='text-base text-white/50 mt-1'>You want to report this lesson?</p>
                </AlertDialog.Heading>
              </AlertDialog.Header>
              
              <AlertDialog.Body className="py-4">
                <p className='text-sm text-center text-white/70 leading-relaxed px-2'>
                  Please make sure this content violates our community guidelines before reporting. This process involves manual audit.
                </p>
              </AlertDialog.Body>
              
              <AlertDialog.Footer className="flex justify-end gap-3 pt-2">
                <Button 
                  onClick={() => setIsConfirmOpen(false)} 
                  className="bg-white/5 border border-white/10 text-white/80 hover:text-white rounded-xl text-xs px-4 h-9 font-medium transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleFirstConfirm} 
                  className="bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs px-4 h-9 shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                  Yes, report it!
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      )}

      {/* STEP 2: ডাইনামিক অ্যানাটমি সিলেক্ট সহ দ্বিতীয় মোডাল (z-index এবং পজিশনিং ফিক্সড) */}
      {isFormOpen && (
        <AlertDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <AlertDialog.Backdrop className="backdrop-blur-md bg-black/50 fixed inset-0 z-[9998]" />
          <AlertDialog.Container className="fixed mx-auto inset-0 flex items-center justify-center p-4 z-[9999]">
            <AlertDialog.Dialog className="w-full sm:min-w-100 bg-slate-950 border border-white/10 rounded-2xl shadow-2xl p-6 relative">
              <AlertDialog.CloseTrigger onClick={() => setIsFormOpen(false)} className="text-white/40 hover:text-white transition-colors absolute top-4 right-4 cursor-pointer" />
              
              <AlertDialog.Header className="pt-2">
                <AlertDialog.Heading>
                  <h2 className='text-xl font-bold text-purple-400 tracking-tight'>Report Details</h2>
                  <p className='text-xs text-white/50 mt-1'>Provide more information about the issue</p>
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body className="space-y-5 py-4">
                {/* সিলেক্ট ড্রপডাউন জোন */}
                <div className="flex flex-col gap-1">
                  <Select
                    value={reportReason}
                    onChange={(val) => setReportReason(val)}
                  >
                    <Label className="text-xs font-bold text-white/70 uppercase tracking-wider">Violation Reason</Label>

                    <Select.Trigger className="w-full min-h-10 flex items-center justify-between bg-white/5 border border-white/10 hover:border-purple-500/30 rounded-xl px-3 mt-2 text-sm text-white/90 shadow-inner transition-colors duration-200 cursor-pointer">
                      <Select.Value placeholder="Choose why you are reporting" />
                      <Select.Indicator className="text-white/40 text-xs" />
                    </Select.Trigger>

                    <Description className="text-[11px] text-white/40 mt-1.5">
                      Select the closest match for the violation.
                    </Description>

                    <Select.Popover className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl mt-1.5 overflow-hidden z-[10000]">
                      <ListBox className="p-1.5 text-sm text-white/90">
                        <ListBox.Section>
                          <Header className="text-[10px] uppercase tracking-wider font-extrabold text-purple-400 px-2 py-1.5">Common Issues</Header>
                          <ListBox.Item id="spam" className="hover:bg-purple-600/10 p-2 rounded-lg cursor-pointer flex flex-col items-start transition-colors">
                            <Label className="font-semibold text-white">Spam or Misleading</Label>
                            <Description className="text-xs text-white/50 mt-0.5">Repetitive or fake content</Description>
                          </ListBox.Item>
                          <ListBox.Item id="harassment" className="hover:bg-purple-600/10 p-2 rounded-lg cursor-pointer flex flex-col items-start mt-1 transition-colors">
                            <Label className="font-semibold text-white">Harassment</Label>
                            <Description className="text-xs text-white/50 mt-0.5">Hate speech or aggressive behavior</Description>
                          </ListBox.Item>
                        </ListBox.Section>

                        <Separator className="border-t border-white/10 my-1.5" />

                        <ListBox.Section>
                          <Header className="text-[10px] uppercase tracking-wider font-extrabold text-purple-400 px-2 py-1.5">Legal</Header>
                          <ListBox.Item id="copyright" className="hover:bg-purple-600/10 p-2 rounded-lg cursor-pointer flex flex-col items-start transition-colors">
                            <Label className="font-semibold text-white">Copyright Violation</Label>
                          </ListBox.Item>
                        </ListBox.Section>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* এডিশনাল ডিটেইলস এরিয়া (সঠিক TextArea কম্পোনেন্ট সহ) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Additional Details</label>
                  <TextArea
                    placeholder="Describe the issue in detail..."
                    className="w-full bg-white/5 border border-white/10 hover:border-purple-500/20 focus:border-purple-500/50 rounded-xl p-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 shadow-inner"
                    rows={4}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                  />
                </div>
              </AlertDialog.Body>

              <AlertDialog.Footer className="flex justify-end gap-3 pt-2">
                <Button 
                  onClick={() => setIsFormOpen(false)} 
                  className="bg-white/5 border border-white/10 text-white/80 hover:text-white rounded-xl text-xs px-4 h-9 font-medium transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                  Back
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  isDisabled={!reportReason}
                  className={`px-5 h-9 rounded-xl text-white text-xs font-bold transition-all duration-300 active:scale-[0.97] cursor-pointer flex items-center justify-center
                    ${!reportReason 
                      ? 'bg-purple-900/20 text-white/40 border border-white/5 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20 hover:opacity-95'
                    }`}
                >
                  Submit Report
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      )}
    </div>
  );
};

export default ReportModal;