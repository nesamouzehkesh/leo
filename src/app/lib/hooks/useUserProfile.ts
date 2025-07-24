'use client';

import { useState, useEffect } from 'react';
import { USER_INFO_COOKIE_KEY } from '@app/lib/utils/constants';
import { clearUserCookie } from '@app/lib/utils/clear-user-cookie';
import { UserProfile } from '@app/lib/definitions';

/**
 * Custom hook for managing user profile data from cookies
 * 
 * Note: We can't use the existing getUserCookieValue() utility here because:
 * - getUserCookieValue() uses 'next/headers' which only works in Server Components
 * - This hook is designed for Client Components (marked with 'use client')
 * - Custom hooks run on the client side, so we need client-side cookie reading
 * 
 * Alternative approaches considered:
 * - Server action: Would add unnecessary complexity for simple cookie reading
 * - Shared utility: Would require conditional logic for client/server environments
 * 
 * Current approach: Direct client-side cookie reading using document.cookie
 */
export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = () => {
    try {
      const cookies = document.cookie.split(';');
      const userCookie = cookies.find(cookie => 
        cookie.trim().startsWith(`${USER_INFO_COOKIE_KEY}=`)
      );
      
      if (userCookie) {
        const cookieValue = userCookie.split('=')[1];
        const profile = JSON.parse(decodeURIComponent(cookieValue));
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearUserProfile = () => {
    clearUserCookie();
    setUserProfile(null);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { userProfile, isLoading, fetchUserProfile, clearUserProfile };
} 