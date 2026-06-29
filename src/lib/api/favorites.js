import { protectedFetch } from "../core/server"

export const getFavoritesByLessonId = async(lessonId, userId)=>{
    const result = await protectedFetch(`/api/favorite-lesson/${lessonId}?userId=${userId}`);
    return result
}

export const getMyFavoritesLessons = async(userId)=>{
    const result =await protectedFetch(`/api/my-favorite/lessons/${userId}`);
    return result
}