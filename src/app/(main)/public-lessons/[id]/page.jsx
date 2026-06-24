import LessonDetailsManager from "@/components/lessonDetails/LessonDetailsManager";
import { getFavoritesByLessonId } from "@/lib/api/favorites";
import { getLessonById } from "@/lib/api/lessons";
import { getUserSession } from "@/lib/session";


const LessonDetailsPage = async ({ params }) => {
    const { id } = await params;
    const lesson = await getLessonById(id);
    const user = await getUserSession();
     const userId = user?.id;
    const {totalFavorite, isFavorite} = await getFavoritesByLessonId(lesson._id, userId);
    console.log('isfavo', isFavorite, totalFavorite)
    
   
   

    if (!lesson) {
        return (
            <div className="min-h-screen bg-[#060211] flex items-center justify-center text-white/50">
                Lesson not found or unavailable.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#060211] py-12 px-4 md:px-8">
            <div className=" mx-auto">
                <LessonDetailsManager lesson={lesson} userId = {userId} totalFavorite ={totalFavorite} isFavorite ={isFavorite} />
            </div>
        </main>
    );
};

export default LessonDetailsPage;