import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export function getServerClient() {
  const httpLink = createHttpLink({
    uri: 'https://graphql.anilist.co',
    fetch,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: true, // Important for server-side rendering
  });
} 