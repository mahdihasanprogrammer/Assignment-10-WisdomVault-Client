import { serverMutation } from "../core/server"

export const createLessonReport = async(reportData) =>{
    const result = await serverMutation(`/api/lesson/create-report`, reportData);
    return result
}