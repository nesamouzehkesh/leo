'use client';

import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { client } from '@app/lib/apolloClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        {children}
      </ChakraProvider>
    </ApolloProvider>
  );
}
