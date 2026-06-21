"use server"

import { toast } from "sonner";
import { serverMutation } from "../core/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


// imgBB api and image upload function;
export const uploadLessonImageToImgBB =async (file) =>{
    const formData = new FormData();
    formData.append("image", file)

    const apiKey = process.env.NEXT_PUBLIC_IMG_BB_API_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method:"POST",
        body:formData
    })

    const result = await res.json();

    if(!result.success){
        toast.error("upload failed")
    }
    const url = result.data.url
    
    return url

}

// create a new lesson;
export const createLesson = async (lessonData) =>{
    const result=await serverMutation("/api/create-lesson", lessonData);

    return result
}


// update lesson , 
export const updateLesson = async (lessonId, lessonData) =>{
    const result=await serverMutation(`/api/update-lesson/${lessonId}`, lessonData, "PATCH");

    return result
   

}

