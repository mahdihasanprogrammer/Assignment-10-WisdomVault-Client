import { serverFetch } from "../core/server"

export const getCommentsByLessonId = async(lessonId)=>{
    const result = await serverFetch(`/api/lesson-comments/${lessonId}`);
    return result
}