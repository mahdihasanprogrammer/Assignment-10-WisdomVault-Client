
"use server"
import { serverFetch } from "../core/server"

export const getLessonByCreatorId = async (creatorId) =>{
    return serverFetch(`/api/my-lessons?creatorId=${creatorId}`)
}