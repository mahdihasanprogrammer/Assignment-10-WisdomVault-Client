
import { FiAlertTriangle } from 'react-icons/fi';
import { getLessonsReport } from "@/lib/api/lessonReports";
import ReportedLessonsTable from './ReportedLessonsTable';


const ManageReportedLessons = async () => {



  const reportedLessons = await getLessonsReport() || [];

  return (
    <div className="p-4 sm:p-8 bg-[#080418] min-h-screen text-white space-y-6">


      <div className="flex items-center gap-3 border-b border-white/5 pb-5">
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
          <FiAlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Reported & Flagged Lessons
          </h1>
          <p className="text-xs text-white/40 mt-0.5">
            Audit logs of community user flags, spam validations, and material moderation.
          </p>
        </div>
      </div>

    {/* client component */}
      <ReportedLessonsTable reportedLessons={reportedLessons} />

    </div>
  );
};

export default ManageReportedLessons;