"use client";

import { useQuery } from "@apollo/client";
import { GET_ANIME_PAGE } from "@app/lib/queries";
import { AnimesList } from "@app/ui/animes/AnimesList";
import { AnimesLoadingSkeleton } from "@app/ui/animes/skeletons";
import Pagination from "@app/ui/common/Pagination";
import { ErrorMessage } from "@app/ui/common/ErrorMessage";
import { useSearchParams } from "next/navigation";
import { ANIMES_PER_PAGE } from "@app/lib/utils/constants";
import { notFound } from "next/navigation";
import { Box } from "@chakra-ui/react";

export default function AnimesPage() {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage")) || ANIMES_PER_PAGE;
  const searchQuery = searchParams.get("query");
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Number(pageParam) : 1;
  
  // Trigger not-found for invalid page numbers; so for example this one will show your customised not found
  // page: http://nesa.com.au/animes?page=210www ☔️
  if (pageParam && (isNaN(currentPage) || currentPage < 1)) {
    notFound();
  }

  // Only search if query is at least 2 characters
  const search = searchQuery && searchQuery.trim().length >= 2 ? searchQuery.trim() : undefined;

  const { data, loading, error, refetch } = useQuery(GET_ANIME_PAGE, {
    variables: { page: currentPage, perPage, search },
  });

  if (loading) {
    return <AnimesLoadingSkeleton />;
  }

  // Handle client-side errors with ErrorMessage component
  if (error) {
    return (
      <ErrorMessage 
        message={`Failed to load anime data: ${error.message}`}
        onRetry={() => refetch()}
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
}