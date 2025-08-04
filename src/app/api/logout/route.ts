import { NextResponse } from 'next/server';

/**
 * Server-side Logout API 🎯
 * 
 * This API route handles secure logout by clearing the user profile cookie server-side.
 * Benefits:
 * - httpOnly cookies prevent JavaScript access (XSS protection)
 * - Server-side clearing ensures immediate middleware recognition
 * 
 * The client calls this API, then redirects to home page.
 */

export async function POST() {
  console.log('🔐 Logout API called - clearing httpOnly cookie');
  
  const response = NextResponse.json({ success: true });
  
  // Clear the user profile cookie with httpOnly security
  response.cookies.set('user_profile', '', {
    path: '/',
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  
  console.log('✅ Cookie cleared with httpOnly security');
  return response;
} 