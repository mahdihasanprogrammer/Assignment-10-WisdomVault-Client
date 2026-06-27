import { serverFetch } from "../core/server"

export const getLessonsReport = async ()=>{
    const result = await serverFetch(`/api/reported-lessons`);
    return result
}