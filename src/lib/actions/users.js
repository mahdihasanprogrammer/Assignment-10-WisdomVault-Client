import { serverMutation } from "../core/server"

export const changeRole = async(userId, updateRole) =>{
    const result = await serverMutation(`/api/user/${userId}`, updateRole, "PATCH");
    return result
}