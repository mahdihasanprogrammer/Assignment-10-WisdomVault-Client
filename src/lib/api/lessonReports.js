import { protectedFetch } from "../core/server"

export const getLessonsReport = async ()=>{
    const result = await protectedFetch(`/api/reported-lessons`);
    return result
}