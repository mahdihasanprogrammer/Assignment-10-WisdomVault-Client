import LessonCard from "@/components/public-lessons/LessonCard";
import { getAllLessons } from "@/lib/api/lessons";
import { FiBookOpen } from "react-icons/fi";

const PublicLessons = async () => {
    const allLessons = await getAllLessons() || [];
 
    
    return (
        <div className="px-4 md:px-8 mx-auto py-6 bg-[#060211] min-h-screen text-white flex flex-col gap-15">
            
            {/* Global Header & Description Section with Icon */}
            <div className="flex flex-col items-center text-center mt-8 gap-3 relative z-10 ">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <FiBookOpen className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Explore Public <span className="bg-linear-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Lessons</span>
                </h1>
                <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
                    Dive into community wisdom, expert mental frameworks, and strategic life lessons. Total available logs: <span className="text-purple-400 font-bold">{allLessons.length}</span>
                </p>
            </div>
            
            {/* Responsive Responsive Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {allLessons.map((lesson) => (
                    <LessonCard key={lesson._id} lesson={lesson} />
                ))}
            </div>
        </div>
    );
};

export default PublicLessons;