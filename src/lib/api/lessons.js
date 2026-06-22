
"use server"
import { serverFetch } from "../core/server"

export const getLessonByCreatorId = async (creatorId) =>{
    return serverFetch(`/api/my-lessons?creatorId=${creatorId}`)
}

export const getAllLessons = async(query) =>{
    const result = await serverFetch(`/api/all-lessons?${query}`);
    return result
}