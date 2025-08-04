'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@app/lib/hooks/useUserProfile';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function SignOutButton() {
  const { clearUserProfile } = useUserProfile();
  const router = useRouter();
  
  /**
   * We need this state to handle the sign-out transition period:
   * 1. User clicks "Sign Out" → button shows loading spinner
   * 2. Router redirects to home page
   * This ensures users see feedback that their action was registered and prevents multiple clicks! 🧩
   */
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = () => {
    setIsSigningOut(true);
    clearUserProfile();
    // Immediately redirect to home page since middleware won't see the change until refresh 🙁
    router.push('/');
  };

  if (isSigningOut) {
    return <LoadingSpinner size="sm" showLogo={true} />;
  }

  return (
    <Button
      size={{ base: "xs", md: "sm" }}
      variant="ghost"
      bg="rgba(45, 45, 45, 0.8)"
      color="white"
      borderRadius="full"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.3)"
      _hover={{
        bg: "rgba(60, 60, 60, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.5)",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)"
      }}
      transition="all 0.2s ease"
      onClick={handleSignOut}
      fontWeight="medium"
      fontSize={{ base: "2xs", md: "xs" }}
      backdropFilter="blur(10px)"
      px={{ base: 3, md: 4 }}
      py={{ base: 1, md: 2 }}
      h={{ base: "24px", md: "28px" }}
    >
      Sign Out
    </Button>
  );
} 