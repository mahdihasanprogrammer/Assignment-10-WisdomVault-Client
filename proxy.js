import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }
   else{
    return NextResponse.next()
   }
    
}

export const config = {
    matcher: ['/dashboard/:path*', '/pricing/:path*']
}