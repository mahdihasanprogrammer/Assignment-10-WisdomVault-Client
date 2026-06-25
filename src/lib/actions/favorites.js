import { serverMutation } from "../core/server"

export const toggleFavorite = async(lessonId, favoriteData) =>{
    const result = await serverMutation(`/api/lessons/${lessonId}/favorite`, favoriteData)
    return result
}

export const deleteFavoriteLesson = async(favoriteLessonId)=>{
    const result = await serverMutation(`/api/lesson/delete-favorite/${favoriteLessonId}`, {}, 'DELETE');
    return result
}