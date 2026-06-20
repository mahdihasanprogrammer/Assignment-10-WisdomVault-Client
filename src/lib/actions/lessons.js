"use server"

import { toast } from "sonner";
import { serverMutation } from "../core/server";
import { redirect } from "next/navigation";

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

export const createLesson = async (lessonData) =>{
    const result= serverMutation("/api/create-lesson", lessonData);

    if(result.insertedId){
        toast.success('lesson created successful!')
        redirect(`/dashboard/my-lessons`)
    }
}