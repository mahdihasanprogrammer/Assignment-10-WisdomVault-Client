import LessonDetailsManager from "@/components/lessonDetails/LessonDetailsManager";
import { getLessonById } from "@/lib/api/lessons";


const LessonDetailsPage = async ({ params }) => {
    const { id } = await params;
    const lesson = await getLessonById(id);

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
                <LessonDetailsManager lesson={lesson} />
            </div>
        </main>
    );
};

export default LessonDetailsPage;