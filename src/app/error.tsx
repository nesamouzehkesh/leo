"use client";
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { LEONARDO_LOGO_URL } from '@app/lib/utils/constants';

export default function Error({ error }: { error: Error; reset: () => void }) {
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
          Something went wrong
        </Text>
        <Text fontSize="lg" color="gray.300" mb={6} textAlign="center">
          {error.message || 'An unexpected error occurred while loading animes.'}
        </Text>
        <Link href="/animes">
          <Button
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
            }}
            transition="all 0.2s"
          >
            Back
          </Button>
        </Link>
      </Flex>
    </Box>
  );
} 