import { getFeaturedLessons } from "@/lib/api/lessons";
import LessonCard from "../public-lessons/LessonCard";

const FeaturedLessons = async () => {
    // সরাসরি এপিআই থেকে ডাটা ফেচ করা হচ্ছে (কোনো মক ডাটা নেই)
    const featuredLessons = await getFeaturedLessons() || [];

    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
            {/* প্রিমিয়াম ব্যাকগ্রাউন্ড গ্লো টেক্সচার */}
            <div className="absolute top-0 right-1/4 w-100 h-100 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-75 h-75 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            {/* মেইন লিনিয়ার বর্ডার গ্রিড ডেকোরেশন */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* রিকোয়ার্ড হেডিং সেকশন */}
            <div className="flex flex-col items-center text-center mb-16 gap-4 relative z-10">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white uppercase">
                    Featured Life <span className="bg-linear-to-r from-purple-500 via-pink-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(168,85,247,0.3)]">Lessons</span>
                </h2>
                
                {/* ডিভাইডার লাইন ডিজাইন */}
                <div className="w-24 h-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full" />
                
                <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed font-light tracking-wide">
                    Sift through the most profound realizations and impactful life strategic principles shared by minds worldwide.
                </p>
            </div>

            {/* ডাইনামিক ডেটা গ্রিড লেআউট */}
            {featuredLessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {featuredLessons.map((lesson) => (
                        <div 
                            key={lesson._id} 
                            className="group relative bg-linear-to-b from-white/5 to-transparent p-0.5 rounded-[24px] transition-all duration-500 hover:scale-[1.02]"
                        >
                           
                            {/* মূল কার্ড ধারক */}
                            <div className="relative bg-[#0c071d]/80 rounded-[23px] overflow-hidden backdrop-blur-md border border-white/5 h-full">
                                <LessonCard lesson={lesson} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* ডেটা না থাকলে এম্পটি স্টেট */
                <div className="text-center text-white/20 py-20 border border-dashed border-white/5 rounded-3xl relative z-10 bg-white/1 backdrop-blur-sm max-w-md mx-auto text-sm">
                    No featured insights published yet.
                </div>
            )}
        </section>
    );
};

export default FeaturedLessons;