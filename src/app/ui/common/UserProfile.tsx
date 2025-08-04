import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { getUserCookieValue } from '@app/lib/utils/get-user-profile-from-cookies';
import { SignOutButton } from './SignOutButton';
import Link from 'next/link';

/**
 * Server Component - User Profile Display 🎯
 * 
 * This component is server-side rendered and reads user profile from cookies.
 * Benefits:
 * - No client-side hydration needed for user info display
 * - Better performance and SEO
 * - User info renders immediately without loading states
 * 
 * The SignOutButton is a separate client component for interactivity.
 */

export async function UserProfileDisplay() {
  const userProfile = await getUserCookieValue(); // getting the cookies info server side
  
  if (!userProfile) {
    return null;
  }

  return (
    <Flex align="center" justify="space-between" gap={{ base: 12, md: 20 }}>
      <HStack gap={{ base: 2, md: 3 }}>
        <Link href="/">
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
          >
            <FaUser color="#553c9a" size={14} />
          </Box>
        </Link>
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
      <SignOutButton />
    </Flex>
  );
} 