import { getLessonByCreatorId } from "@/lib/api/lessons";
import { getUserSession } from "@/lib/session";
import LessonsTable from "./LessonsTable";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FiPlus, FiBox } from "react-icons/fi";

const MyLessonsPage = async () => {
    const user = await getUserSession();
    const lessons = await getLessonByCreatorId(user?.id);

    // সেফটি চেক: ডাটা একদম না থাকলে বা লেন্থ ০ হলে এম্পটি লার্জ কার্ড দেখাবে
    if (!lessons || lessons.length === 0) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center p-4 md:p-8">
                {/* কার্ডের উইডথ max-w-md থেকে বাড়িয়ে max-w-2xl করা হয়েছে */}
                <div className="max-w-2xl w-full bg-white/2 border border-white/10 backdrop-blur-3xl rounded-[32px] p-8 md:p-16 text-center shadow-2xl shadow-black/80 flex flex-col items-center group relative overflow-hidden">
                    
                    {/* গ্লোয়িং ব্যাকগ্রাউন্ড ইফেক্ট */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

                    {/* বড় আইকন বক্স */}
                    <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-300 shadow-xl shadow-purple-500/5">
                        <FiBox className="w-10 h-10" />
                    </div>
                    
                    {/* লার্জার টাইপোগ্রাফি */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Your Wisdom Vault is Empty
                    </h2>
                    
                    <p className="text-base text-white/50 mb-10 max-w-xl leading-relaxed">
                        Every experience holds a vital lesson. Document your live project failures, personal breakthroughs, or leadership insights before they fade away. 
                    </p>

                    {/* প্রিমিয়াম অ্যাকশন বাটন */}
                    <Link 
                        href="/dashboard/add-lesson"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold shadow-xl shadow-purple-500/20 hover:opacity-95 hover:shadow-purple-500/30 transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <FiPlus className="w-4 h-4" />
                        <span>Write Your First Wisdom Log</span>
                    </Link>
                </div>
            </div>
        );
    }

    // ডাটা থাকলে টেবিল কম্পোনেন্ট কল হবে
    return (
        <div className="mx-auto w-full p-4 md:p-8">
            <LessonsTable lessons={lessons} user={user} />
        </div>
    );
};

export default MyLessonsPage;