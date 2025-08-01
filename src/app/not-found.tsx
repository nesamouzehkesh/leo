'use client';

/**
 * This page is shown when:
 * - User navigates to a route that doesn't exist.
 * 
 * Example: Enter /nesa or /anime and you will see this page!!!
 * 
 * Note: This is different from error.tsx which catches runtime errors.
 * This is for 404 "Page Not Found" scenarios.
 */
import { Box, Flex, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { LEONARDO_LOGO_URL } from '@app/lib/utils/constants';
import { ErrorMessage } from '@app/ui/common/ErrorMessage';

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    // Try to go back in browser history; this is for the case that if for example you are one: http://nesa.com.au/animes?page=210
    // and then you do: http://nesa.com.au/animes?page=210www if you now click the 'Back' button on not found page it will take
    // you back to: http://nesa.com.au/animes?page=210
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to animes page
      router.push('/animes');
    }
  };

  return (
    <Box minH="100vh" bg="gray.900" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" align="center" justify="center" gap={6}>
        <Image
          src={LEONARDO_LOGO_URL}
          alt="Leonardo Logo"
          boxSize="64px"
          borderRadius="full"
          bg="gray.800"
          mb={2}
        />
        
        <ErrorMessage 
          message="404 - Page Not Found"
          onBackClick={handleBack}
          backText="Go Back"
          showIcon={false}
        />
      </Flex>
    </Box>
  );
} 