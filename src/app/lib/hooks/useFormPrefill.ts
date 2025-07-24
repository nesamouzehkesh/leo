'use client';

import { useState, useEffect } from 'react';
import { USER_INFO_COOKIE_KEY } from '@app/lib/utils/constants';

interface FormPrefillData {
  username: string;
  jobTitle: string;
}

export function useFormPrefill() {
  const [formData, setFormData] = useState<FormPrefillData>({
    username: '',
    jobTitle: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExistingProfile = () => {
      try {
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(cookie => 
          cookie.trim().startsWith(`${USER_INFO_COOKIE_KEY}=`)
        );
        
        if (userCookie) {
          const cookieValue = userCookie.split('=')[1];
          const profile = JSON.parse(decodeURIComponent(cookieValue));
          setFormData({
            username: profile.username || '',
            jobTitle: profile.jobTitle || ''
          });
        }
      } catch (error) {
        console.error('Error fetching existing profile for form prefill:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingProfile();
  }, []);

  return { formData, setFormData, isLoading };
} 