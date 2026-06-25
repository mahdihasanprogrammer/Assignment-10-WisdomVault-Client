import LessonCard from "@/components/public-lessons/LessonCard";
import { getMyFavoritesLessons } from "@/lib/api/favorites";
import { getLessonsByAuthor } from "@/lib/api/lessons";
import { getUserSession } from "@/lib/session";
import { FiBookOpen } from "react-icons/fi";
import ProfileManager from "./ProfileManager";

const UserProfilePage = async () => {
    const user = await getUserSession();
    if (!user?.id) return <div className="text-white p-8">Unauthorized access. Please login.</div>;

    // প্যারালাল ডাটা ফেচিং
    const [totalSaveLesson, lessonData] = await Promise.all([
        getMyFavoritesLessons(user.id),
        getLessonsByAuthor(user.id)
    ]);

    const { lessons = [], userAllLessonsCount = 0 } = lessonData || {};

    return (
        <div className="p-4 sm:p-8 bg-slate-950 min-h-screen text-white space-y-10">
            
            {/* প্রোফাইল কার্ড ও আপডেট হ্যান্ডেলার (Client Side Component) */}
            <ProfileManager 
                user={user} 
                totalSaved={totalSaveLesson?.length || 0} 
                totalCreated={userAllLessonsCount} 
            />

            {/* ইউজারের তৈরি করা পাবলিক লেসন গ্রিড সেকশন */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                    <FiBookOpen className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-bold tracking-tight">My Published Lessons</h2>
                    <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-2.5 py-0.5 rounded-full font-semibold">{lessons.length}</span>
                </div>

                {lessons.length === 0 ? (
                    <div className="border border-white/5 bg-white/5 backdrop-blur-xl rounded-2xl p-12 text-center text-white/40 text-sm">
                        You haven&apos;t created any public lessons yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map(lesson => (
                            <LessonCard key={lesson._id} lesson={lesson} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;