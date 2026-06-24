import { serverMutation } from "../core/server"

export const toggleFavorite = async(lessonId, favoriteData) =>{
    const result = await serverMutation(`/api/lessons/${lessonId}/favorite`, favoriteData)
    return result
}