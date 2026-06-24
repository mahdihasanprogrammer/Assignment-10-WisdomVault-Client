import { serverMutation } from "../core/server"

export const createComment = async(lessonId, commentData) =>{
    const result = await serverMutation(`/api/lesson/create-comment/${lessonId}`, commentData);
    return result
}