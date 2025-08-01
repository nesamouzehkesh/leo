"use client";

/**
 * TIL: 🎯
 * 
 * This error boundary catches errors that occur during:
 * - React component rendering lifecycle
 * - Server-side rendering (SSR) errors
 * - Client-side hydration errors
 * - Errors in React hooks (useState, useEffect, etc.)
 * - Errors in event handlers (if they bubble up to the component tree)
 * - GraphQL query errors from Apollo Client (network issues, API errors, etc.) - 400, 500 codes for instance
 * 
 * It does NOT catch:
 * - Explicitly thrown errors with `throw new Error()` in client components;
 * (which I tried and it showed but had an error on page!)
 * 
 * Example: Try http://localhost:3000/animes?query=ki&page=277777777 or http://localhost:3000/animes?query=ki&page=2ww
 * GraphQL accepts them as valid page number, but the query fails causing an Apollo error that triggers this error boundary.
 * 
 */
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { LEONARDO_LOGO_URL } from '@app/lib/utils/constants';
import { ErrorMessage } from '@app/ui/common/ErrorMessage';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
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
        
        <ErrorMessage 
          message={error.message || 'An unexpected error occurred while loading animes.'}
          onRetry={reset}
          retryText="Try Again"
          showIcon={false}
        />
        
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