import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!token) {
    // If no token and trying to access protected routes, redirect to login
    if (pathname.startsWith('/checkout') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  } else {
    // If token exists but role is not 'admin', block access to /admin
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout', '/admin'],
};