import { getMyFavoritesLessons } from "@/lib/api/favorites";
import { getUserSession } from "@/lib/session";
import { Table, Button, Avatar } from '@heroui/react'; // সঠিক অ্যানাটমি অনুযায়ী ইমপোর্ট
import { FiEye, FiTrash2, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import DeleteFavoriteLesson from "@/components/favorites/DeleteFavoriteLesson";

const MyFavoritesLessonsPage = async () => {
    const user = await getUserSession();
    if (!user?.id) return <div className="text-white p-8">Unauthorized access. Please login.</div>;

    const favorites = await getMyFavoritesLessons(user.id);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="p-4 sm:p-8 bg-slate-950 min-h-screen text-white space-y-6">
            {/* হেডার সেকশন */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-5">
                <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/5">
                    <FiHeart className="w-6 h-6 fill-purple-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">My Favorite Lessons</h1>
                    <p className="text-xs text-white/40 mt-0.5">Manage and revisit your bookmarked study materials</p>
                </div>
            </div>

            {/* ফেভারিট লিস্ট এম্পটি কন্ডিশন */}
            {(!favorites || favorites.length === 0) ? (
                <div className="border border-white/5 bg-white/5 backdrop-blur-xl rounded-2xl p-12 text-center">
                    <p className="text-white/50 text-sm">No favorite lessons saved yet.</p>
                </div>
            ) : (
                /* Hero UI টেবিল কন্টেইনার */
                <Table className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="My favorite lessons table">
                            <Table.Header className="bg-white/5 border-b border-white/10">
                                <Table.Column isRowHeader className="text-xs uppercase font-bold text-purple-400 tracking-wider py-4 px-6 text-left">Lesson Title</Table.Column>
                                <Table.Column className="text-xs uppercase font-bold text-purple-400 tracking-wider py-4 px-6 text-left">Instructor</Table.Column>
                                <Table.Column className="text-xs uppercase font-bold text-purple-400 tracking-wider py-4 px-6 text-left">Saved At</Table.Column>
                                <Table.Column className="text-xs uppercase font-bold text-purple-400 tracking-wider py-4 px-6 text-center w-28">Actions</Table.Column>
                            </Table.Header>

                        <Table.Body>
                            {favorites.map((fav) => {
                                const { _id, lessonId, lessonInfo, savedAt } = fav;
                                return (
                            <Table.Row key={_id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                                
                                {/* লেসন টাইটেল */}
                                <Table.Cell className="py-4 px-6 font-semibold text-white/90 text-sm max-w-xs truncate">
                                    {lessonInfo?.lessonTitle || "Untitled Lesson"}
                                </Table.Cell>
                                {/* ইন্সট্রাক্টর প্রোফাইল — (Hero UI Avatar Anatomy ব্যবহার করে ফিক্সড) */}
                                <Table.Cell className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        
                                        {/* আপনার দেওয়া Avatar Anatomy এখানে যুক্ত করা হয়েছে */}
                                        <Avatar className="w-8 h-8 rounded-lg border border-white/10 bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs">
                                            <Avatar.Image
                                             src={lessonInfo?.creatorImage} 
                                             alt={lessonInfo?.creatorName}
                                             referrerPolicy="no-referrer" className="rounded-lg object-cover" />
                                            <Avatar.Fallback>{lessonInfo?.creatorName?.charAt(0) || "U"}</Avatar.Fallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-white/90 font-medium text-sm leading-none">{lessonInfo?.creatorName || "Unknown"}</span>
                                            <span className="text-white/40 text-xs mt-1 leading-none">{lessonInfo?.creatorEmail || ""}</span>
                                        </div>
                                    </div>
                                </Table.Cell>
                                {/* সেভ ডেট */}
                                <Table.Cell className="py-4 px-6 text-sm text-white/60">
                                    {formatDate(savedAt)}
                                </Table.Cell>
                                {/* অ্যাকশন বাটনস */}
                                <Table.Cell className="py-4 px-6">
                                    <div className="flex items-center justify-center gap-2">
                                        
                                        {/* ভিউ অ্যাকশন */}
                                        <Link href={`/public-lessons/${lessonId}`} className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 rounded-xl w-8 h-8 flex items-center justify-center transition-all duration-300 active:scale-[0.93] cursor-pointer shadow-md shadow-purple-950/20" title="View Details">
                                            <FiEye className="w-4 h-4" />
                                        </Link>
                                   <DeleteFavoriteLesson favoriteData={fav}/>
                                    </div>
                                </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            )}
        </div>
    );
};

export default MyFavoritesLessonsPage;