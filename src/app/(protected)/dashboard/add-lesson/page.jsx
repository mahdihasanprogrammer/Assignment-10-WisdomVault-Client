import { getUserSession } from "@/lib/session";
import AddLessonForm from "./AddLessonForm";


const AddLessonPage =async () => {
    const user = await getUserSession()
    if (!user?.id) return <div className="text-white p-8">Unauthorized access. Please login.</div>;
    return (
        <div className="py-10">
            <AddLessonForm user ={user}/>
        </div>
    );
};

export default AddLessonPage;