

import { getServerClient } from "@app/lib/apollo-server-client";
import { GET_ANIME_PAGE } from "@app/lib/queries";
import { AnimesList } from "@app/ui/animes/AnimesList";
import Pagination from "@app/ui/common/Pagination";
import { ErrorMessage } from "@app/ui/common/ErrorMessage";
import { ANIMES_PER_PAGE } from "@app/lib/utils/constants";
import { Box } from "@chakra-ui/react";

interface AnimesPageProps {
  searchParams: Promise<{
    page?: string;
    perPage?: string;
    query?: string;
  }>;
}

export default async function AnimesPage({ searchParams }: AnimesPageProps) {
  const resolvedSearchParams = await searchParams;
  const perPage = Number(resolvedSearchParams.perPage) || ANIMES_PER_PAGE;
  const searchQuery = resolvedSearchParams.query;
  const pageParam = resolvedSearchParams.page;
  const currentPage = pageParam ? Number(pageParam) : 1;

  // Only search if query is at least 2 characters - additional check here on minimum 2 chars for cases where user may add ?query= manually
  const search = searchQuery && searchQuery.trim().length >= 2 ? searchQuery.trim() : undefined;

  /**
   * Server-side Apollo Client query
   * Benefits:
   * - Server-side rendering with data
   * - Better SEO and performance
   * - Streaming and Suspense support
   * - Still using Apollo Client as required
   */
  try {
    const client = getServerClient();
    const { data } = await client.query({
      query: GET_ANIME_PAGE,
      variables: { page: currentPage, perPage, search },
    });

    if (!data) {
      return (
        <ErrorMessage 
          message="Failed to load anime data: No data received from server"
        />
      );
    }

    const { hasNextPage, lastPage } = data.Page.pageInfo;
    const animes = data.Page.media || [];
    
    /**
     * Note: AniList GraphQL API Behavior ⁉️
     * 
     * The AniList API has a unique pagination behavior where the `lastPage` and `total` 
     * values change dynamically as you navigate through pages. This means:
     * 
     * - When you're on page 1, it might show "Page 1 of 208"
     * - When you navigate to page 208, it updates to "Page 208 of 210" 
     * - This continues indefinitely - there's no true "final" last page
     * 
     * The API appears to dynamically adjust the total count based on the current
     * page context, making it impossible to reach a truly "final" page where
     * the Next button would be disabled.
     * 
     * and I used the GraphQL `lastPage` and `hasNextPage` values directly as they
     * represent the API's authoritative pagination state for the current request.
     */

    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        minH="calc(100vh - 120px)" // Account for header and search bar
        w="100%"
      >
        <Box flex="1">
          <AnimesList data={data} />
        </Box>
        
        {animes.length > 0 && lastPage > 1 && (
          <Box mt="auto" pt={8}>
            <Pagination
              perPage={perPage}
              currentPage={currentPage}
              lastPage={lastPage}
              hasNextPage={hasNextPage}
            />
          </Box>
        )}
      </Box>
    );
  } catch (error: any) {
    return (
      <ErrorMessage 
        message={`Failed to load anime data: ${error.message || 'Server error'}`}
      />
    );
  }
}