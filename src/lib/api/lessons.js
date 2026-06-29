
"use server"
import { protectedFetch, serverFetch } from "../core/server"

export const getLessonByCreatorId = async (creatorId) =>{
    const result= protectedFetch(`/api/my-lessons?creatorId=${creatorId}`)
    return result
}

export const getAllLessons = async(query) =>{
    const result = await serverFetch(`/api/all-lessons?${query}`);
    return result
}

export const getFeaturedLessons = async()=>{
    const result = await serverFetch(`/api/featured-lessons`);
    return result
}

export const getLessonById = async (id) =>{
    const result = await serverFetch(`/api/public-lessons/${id}`)
    return result
}

export const getLessonsByAuthor = async(authorId) =>{
    const result = await serverFetch(`/api/author-lessons/${authorId}`)
    return result
}

export const getTopContributorsData = async ()=>{
    const result = await serverFetch(`/api/top-contributors`);
    return result
}

// most saved lesson ; 
export const getMostSavedLessons = async()=>{
    const  result =await serverFetch(`/api/most-saved-lessons`);
    return result
}


// admin api;
export const getAllLessonsForAdmin = async (query)=>{
    const result = await protectedFetch(`/api/all-lessons/admin?${query}`);
    return result
}

export const getAdminDashboardInfo = async () =>{
    const result = await protectedFetch(`/api/admin/dashboard/info`); 
    return result;
}

