import { protectedFetch } from "../core/server"


export const getUsersList = async () => {
   const users = await protectedFetch(`/api/users`)
    return users
}