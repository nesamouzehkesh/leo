'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function SignOutButton() {
  const router = useRouter();
  
  /**
   * We need this state to handle the sign-out transition period:
   * 1. User clicks "Sign Out" → button shows loading spinner
   * 2. API call clears server-side cookie
   * 3. Router redirects to home page
   * This ensures users see feedback that their action was registered and prevents multiple clicks! 🧩
   */
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    try {
      // Call server-side logout API to clear httpOnly cookie
      await fetch('/api/logout', { method: 'POST' });
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsSigningOut(false);
    }
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