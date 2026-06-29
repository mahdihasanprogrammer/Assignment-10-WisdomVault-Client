"use server"

import { redirect } from "next/navigation";
import { getSessionToken } from "../session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const authHeader = async () => {
    const token = await getSessionToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {}
    return header
}


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json()

}


export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
   headers:{
     ...await authHeader()
   }
  });
  handleStatusCode(res)
  return res.json();
}


export const serverMutation = async (path, data, method = "POST") => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-type": "application/json",
            ... await authHeader()

        },
        body: JSON.stringify(data)
    })
    handleStatusCode(res)
    return res.json()
}


const handleStatusCode = res => {
  if (res.status === 401) {
    redirect('/unauthorized')
  }
  else if (res.status === 403) {
    redirect('/forbidden')
  }

}