import { cookies } from 'next/headers';
import { USER_INFO_COOKIE_KEY } from '@app/lib/utils/constants';
import { UserProfile } from '@app/lib/definitions';

export async function getUserCookieValue(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(USER_INFO_COOKIE_KEY)?.value;

  if (!userCookie) return null;

  try {
    const user = JSON.parse(userCookie);
    const username = user?.username;
    const jobTitle = user?.jobTitle;

    return { username, jobTitle };
  } catch {
    console.error('Error parsing user cookie:', userCookie);
    return null;
  }
}
