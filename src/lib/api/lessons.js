
"use server"
import { serverFetch } from "../core/server"

export const getLessonByCreatorId = async (creatorId) =>{
    return serverFetch(`/api/my-lessons?creatorId=${creatorId}`)
}

export const getAllLessons = async(query) =>{
    const result = await serverFetch(`/api/all-lessons?${query}`);
    return result
}

export const getFeaturedLessons = async()=>{
    const result = await serverFetch(`/api/featured-lessons`);
    return result
}