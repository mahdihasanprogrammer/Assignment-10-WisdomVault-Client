"use client";

import React, { useState } from 'react';
import { Table } from '@heroui/react';
import { FiAlertTriangle, FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'sonner';
import ReportedLessonsModal from '@/components/dashboard/admin/ReportedLessonsModal';
import { deleteReportedLesson, deleteReportsFormLesson } from '@/lib/actions/lessonsReports';
import { useRouter } from 'next/navigation';

const ReportedLessonsTable = ({ reportedLessons = [] }) => {
  console.log('reported', reportedLessons)

  const [Reports, setReports] = useState(reportedLessons);
  const router = useRouter();


  //  Delete Lesson 
  const handleDeleteLesson = async (lessonId) => {
    try {
      const res = await deleteReportedLesson(lessonId);

      if (res.success) {
        setReports((prev) => prev.filter((item) => item.lessonId !== lessonId));
        toast.success("Lesson permanently removed from the platform!");
        router.refresh()
      }

    } catch (error) {
      toast.error("Failed to delete lesson.");
    }
  };

  //  Ignore 
  const handleIgnoreReport = async (lessonId) => {
    try {

      const result = await deleteReportsFormLesson(lessonId)

      if (result.deletedCount > 0) {
        setReports((prev) => prev.filter((item) => item.lessonId !== lessonId));
        toast.success("All reports cleared. Lesson kept live!");
        router.refresh()
      }

    } catch (error) {
      toast.error("Failed to ignore reports.");
    }
  };

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a051a]/60 backdrop-blur-xl shadow-2xl">

      <Table className="min-w-full text-white">
        <Table.ScrollContainer>
          <Table.Content aria-label="Reported lessons directory">

            <Table.Header className="bg-white/5 border-b border-white/10">
              <Table.Column isRowHeader className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">Lesson Title</Table.Column>
              <Table.Column className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">Report Count</Table.Column>
              <Table.Column className="text-center py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">Details</Table.Column>
              <Table.Column className="text-center py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300 w-64">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {Reports.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="py-12 text-center text-white/40">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FiCheckCircle className="w-6 h-6 text-emerald-400/50" />
                      <span className="text-sm font-medium">No reported lessons found. Dashboard is clean!</span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : (
                Reports.map((report, index) => {
                  
                  // এগ্রিগেশনের কারণে এখন report._id ই হচ্ছে আপনার ইউনিক lessonId
                  const lessonId = report?.lessonId;
                  const rowKey = lessonId || `report-row-${index}`;

                  return (
                    <Table.Row key={rowKey} className="border-b border-white/5 hover:bg-white/2 transition-colors">

                      {/* ১. লেসন টাইটেল (ইউনিক) */}
                      <Table.Cell className="py-4 px-6 font-bold text-white/90">
                        {report?.lessonTitle || "Untitled Lesson"}
                      </Table.Cell>

                      {/* ২. এই লেসনের টোটাল রিপোর্ট কাউন্ট */}
                      <Table.Cell className="py-4 px-6">
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-black px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 shadow-lg shadow-rose-950/20">
                          <FiAlertTriangle className="w-3 h-3" /> {report?.countReport || 0} Reports
                        </span>
                      </Table.Cell>

                      {/* ৩. ভিউ রিজন বাটন (মডাল ফিউচার ট্রিগার) */}
                      <Table.Cell className="py-4 px-6 text-center">
                        <ReportedLessonsModal
                          report={report}
                          handleDeleteLesson={handleDeleteLesson}
                          handleIgnoreReport={handleIgnoreReport} />
                      </Table.Cell>

                      {/* ৪. অ্যাকশন বাটনসমূহ (Ignore / Delete) */}
                      <Table.Cell className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">

                          {/* Ignore Button */}
                          <button
                            onClick={() => handleIgnoreReport(lessonId)}
                            title="Keep lesson live & clear all reports"
                            className="px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                          >
                            <FiCheckCircle className="w-3.5 h-3.5" /> Ignore
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteLesson(lessonId)}
                            title="Permanently remove lesson from platform"
                            className="px-3 py-1.5 bg-rose-500/5 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" /> Delete Lesson
                          </button>

                        </div>
                      </Table.Cell>

                    </Table.Row>
                  );
                })
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>
    </div>
  );
};

export default ReportedLessonsTable;