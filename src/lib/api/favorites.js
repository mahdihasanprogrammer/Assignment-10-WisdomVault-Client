import { serverFetch } from "../core/server"

export const getFavoritesByLessonId = async(lessonId, userId)=>{
    const result = await serverFetch(`/api/favorite-lesson/${lessonId}?userId=${userId}`);
    return result
}