'use client';

import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { LEONARDO_LOGO_URL } from '@app/lib/utils/constants';

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
        <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
          404 - Page Not Found
        </Text>
        <Text fontSize="lg" color="gray.300" mb={6} textAlign="center">
          Sorry, the page you are looking for does not exist.
        </Text>
        <Button
          onClick={handleBack}
          px={8}
          py={6}
          fontSize="lg"
          fontWeight="bold"
          color="white"
          bg="gray.900"
          borderRadius="full"
          border="1px solid #444"
          boxShadow="0 0 0 0 #fff"
          _hover={{
            bg: 'gray.800',
            boxShadow: '0 0 12px 2px #fff',
            color: 'white',
            borderColor: '#fff',
            textDecoration: 'none',
          }}
          transition="all 0.2s"
        >
          Back
        </Button>
      </Flex>
    </Box>
  );
} 