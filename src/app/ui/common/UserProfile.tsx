'use client';

import { Box, Flex, Text, Button, VStack, HStack } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@app/lib/hooks/useUserProfile';
import { LoadingSpinner } from '@app/ui/common/LoadingSpinner';
import { useState } from 'react';

export function UserProfileDisplay() {
  const { userProfile, isLoading, clearUserProfile } = useUserProfile();
  const router = useRouter();
  
  /**
   * We need this state to handle the sign-out transition period:
   * 1. User clicks "Sign Out" → clearUserProfile() immediately sets userProfile to null
   * 2. Component re-renders → we show nothing (null) till router redirects
   * This state ensures users see a loading spinner instead of empty space during sign-out where
   * user info and sign out button just disappear before user's eyes for few seconds! 🧩
   */
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = () => {
    setIsSigningOut(true);
    clearUserProfile();
    // Immediately redirect to home page since middleware won't see the change until refresh 🙁
    router.push('/');
  };

  return (
    <Flex align="center" justify="space-between" gap={{ base: 12, md: 20 }}>
      {isLoading || isSigningOut ? (
        <LoadingSpinner size="sm" showLogo={true} />
      ) : !userProfile ? null : (
        <>
          <HStack gap={{ base: 2, md: 3 }}>
            <Box 
              w={{ base: "24px", md: "28px" }}
              h={{ base: "24px", md: "28px" }}
              borderRadius="full" 
              bg="purple.200" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              cursor="pointer"
              _hover={{ bg: "purple.300" }}
              transition="all 0.2s ease"
              onClick={() => router.push('/')}
            >
              <FaUser color="#553c9a" size={14} />
            </Box>
            <VStack gap={0} align="start" mt={{ base: "1px", md: "2px" }}>
              <Text 
                color="white" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="medium"
                lineHeight="1"
              >
                {userProfile.username}
              </Text>
              <Text 
                color="gray.400" 
                fontSize={{ base: "2xs", md: "xs" }}
                lineHeight="1"
              >
                {userProfile.jobTitle}
              </Text>
            </VStack>
          </HStack>
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
        </>
      )}
    </Flex>
  );
} 