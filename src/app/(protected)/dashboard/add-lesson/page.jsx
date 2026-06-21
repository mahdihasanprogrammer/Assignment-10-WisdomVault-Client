import { getUserSession } from "@/lib/session";
import AddLessonForm from "./AddLessonForm";


const AddLessonPage =async () => {
    const user = await getUserSession()
    return (
        <div className="py-10">
            <AddLessonForm user ={user}/>
        </div>
    );
};

export default AddLessonPage;