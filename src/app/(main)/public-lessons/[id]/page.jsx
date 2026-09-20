import LessonDetailsManager from "@/components/lessonDetails/LessonDetailsManager";
import RelatedCategory from "@/components/lessonDetails/RelatedCategory";
import { getFavoritesByLessonId } from "@/lib/api/favorites";
import { getAllLessons, getLessonById } from "@/lib/api/lessons";
import { getUserSession } from "@/lib/session";


const LessonDetailsPage = async ({ params }) => {
    const { id } = await params;
    const lesson = await getLessonById(id);
    const user = await getUserSession();
     const userId = user?.id;
    const {totalFavorite, isFavorite} = await getFavoritesByLessonId(lesson._id, userId);
   
    
   
    if (!lesson) {
        return (
            <div className="min-h-screen bg-[#060211] flex items-center justify-center text-white/50">
                Lesson not found or unavailable.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#060211] py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <LessonDetailsManager lesson={lesson} user={user} totalFavorite={totalFavorite} isFavorite={isFavorite} />

                <RelatedCategory category={lesson.category} currentLessonId={lesson._id} />
            </div>
        </main>
    );
};

export default LessonDetailsPage;

export const generateStaticParams = async() => {
    const {lessons} = await getAllLessons();
    return lessons.map((lesson)=> ({id: lesson._id}) )
};