import { getUserSession } from "@/lib/session";
import AddLessonForm from "./AddLessonForm";


const AddLessonPage =async () => {
    const user = await getUserSession()
    return (
        <div>
            <AddLessonForm user ={user}/>
        </div>
    );
};

export default AddLessonPage;