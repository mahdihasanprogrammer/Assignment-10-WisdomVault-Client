import { getRelatedLessonsByCategory } from "@/lib/api/lessons";
import LessonCard from "../public-lessons/LessonCard";
import { FiGrid, FiLayers } from "react-icons/fi";

const RelatedCategory = async ({ category, currentLessonId }) => {
  if (!category) return null;

  let relatedLessons = [];
  try {
    const data = await getRelatedLessonsByCategory(category);
    relatedLessons = Array.isArray(data) ? data : data?.lessons || [];
  } catch (error) {
    console.error("Error fetching related lessons:", error);
  }

  // Current lesson টি বাদ দেওয়া
  const filteredLessons = relatedLessons.filter(
    (lesson) => lesson._id !== currentLessonId
  );

  if (filteredLessons.length === 0) return null;

  return (
    <section className="pt-4 border-t border-white/10 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <FiLayers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Related Lessons in{" "}
              <span className="capitalize bg-linear-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {category?.replace("-", " ")}
              </span>
            </h2>
            <p className="text-xs text-white/40 font-light mt-0.5">
              Explore similar wisdom and insights shared by the community
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default RelatedCategory;