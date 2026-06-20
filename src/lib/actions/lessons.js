"use server"

import { toast } from "sonner";

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