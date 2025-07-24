import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ANIME_URL } from './utils/constants';

export const client = new ApolloClient({
  uri: ANIME_URL,
  cache: new InMemoryCache(),
});
