import { serverMutation } from "../core/server"

export const createLessonReport = async(reportData) =>{
    const result = await serverMutation(`/api/lesson/create-report`, reportData);
    return result
}


// delete all report form single lesson;
export const deleteReportsFormLesson = async (lessonId) => {
    const result = await serverMutation(`/api/delete-reports/${lessonId}`, {}, 'DELETE');
    return result
}

// delete reported Lesson;
export const deleteReportedLesson = async (lessonId) => {
    const result = await serverMutation(`/api/delete-reports/lesson/${lessonId}`, {}, 'DELETE');
    return result
}