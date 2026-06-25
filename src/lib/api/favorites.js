import { serverFetch } from "../core/server"

export const getFavoritesByLessonId = async(lessonId, userId)=>{
    const result = await serverFetch(`/api/favorite-lesson/${lessonId}?userId=${userId}`);
    return result
}

export const getMyFavoritesLessons = async(userId)=>{
    const result =await serverFetch(`/api/my-favorite/lessons/${userId}`);
    return result
}