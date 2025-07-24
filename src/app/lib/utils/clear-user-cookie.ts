import { USER_INFO_COOKIE_KEY } from './constants';

export function clearUserCookie(): void {
  // Clear the user cookie by setting it to expire in the past
  document.cookie = `${USER_INFO_COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
} 