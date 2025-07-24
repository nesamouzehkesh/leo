'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { USER_INFO_COOKIE_KEY } from '@app/lib/utils/constants';
import { UserProfile } from '@app/lib/definitions';

const profileSchema = z.object({
  username: z.string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters"),
  jobTitle: z.string()
    .nonempty("Job title is required")
    .min(2, "Job title must be at least 2 characters"),
}) satisfies z.ZodType<UserProfile>;

export type ProfileState = {
  errors?: {
    username?: string[];
    jobTitle?: string[];
  };
  message?: string | null;
};

export async function saveProfile(
  _prevState: ProfileState,
  formData: FormData): Promise<ProfileState> {
  // Validate form using Zod
  const validated = profileSchema.safeParse({
    username: formData.get('username'),
    jobTitle: formData.get('jobTitle'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Please fix the errors above.',
    };
  }

  try {
     // Save to cookies
    const cookieStore = await cookies();
    cookieStore.set(USER_INFO_COOKIE_KEY, JSON.stringify(validated.data), {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  } catch (error: unknown) {
    console.error('Error setting user cookie:', error);
  }
 
  // Redirect to /animes
  redirect('/animes');
} 