'use client';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

/**
 * This pagination implementation is inspired by Next.js tutorial docs
 */
export default function Pagination({currentPage, lastPage, hasNextPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (lastPage <= 1) {
    return null;
  }

  return (
    <Box maxW="1200px" w="100%" mx="auto" px={{ base: 4, md: 6 }} py={8}>
      <Flex justify="center" align="center" gap={3}>
        <Link href={createPageURL(Math.max(1, currentPage - 1))} passHref>
          <Button
            disabled={currentPage <= 1}
            size="md"
            height="40px"
            px={6}
            fontSize="sm"
            fontWeight="semibold"
            bg="rgba(147, 51, 234, 0.1)"
            border="1px solid"
            borderColor="rgba(147, 51, 234, 0.3)"
            color="purple.200"
            borderRadius="lg"
            backdropFilter="blur(10px)"
            _hover={{
              bg: "rgba(147, 51, 234, 0.2)",
              borderColor: "rgba(147, 51, 234, 0.5)",
              color: "purple.100",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(147, 51, 234, 0.2)"
            }}
            _disabled={{
              bg: "rgba(88, 28, 135, 0.05)",
              borderColor: "rgba(147, 51, 234, 0.1)",
              color: "gray.500",
              cursor: "not-allowed",
              transform: "none",
              boxShadow: "none"
            }}
            transition="all 0.2s ease"
          >
            Previous
          </Button>
        </Link>

        <Flex gap={2} align="center">
          {(() => {
            const pages = [];
            const showPages = 5; // Show 5 pages around current (2 before, current, 2 after)
            const halfShow = Math.floor(showPages / 2);
            
            let startPage = Math.max(1, currentPage - halfShow);
            const endPage = Math.min(lastPage, startPage + showPages - 1);
            
            // Adjust if we're near the end
            if (endPage - startPage < showPages - 1) {
              startPage = Math.max(1, endPage - showPages + 1);
            }
            
            // Always show first page if not in range
            if (startPage > 1) {
              pages.push(
                <Link key={1} href={createPageURL(1)} passHref>
                  <Text
                    fontSize="sm"
                    color="purple.300"
                    cursor="pointer"
                    _hover={{ color: "purple.100" }}
                    px={2}
                    py={1}
                    borderRadius="md"
                    transition="all 0.2s ease"
                  >
                    1
                  </Text>
                </Link>
              );
              
              // Add ellipsis if there's a gap
              if (startPage > 2) {
                pages.push(
                  <Text key="ellipsis1" color="gray.500" px={2} fontSize="sm">
                    ...
                  </Text>
                );
              }
            }
            
            // Add pages in range
            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <Link key={i} href={createPageURL(i)} passHref>
                  <Text
                    fontSize="sm"
                    fontWeight={i === currentPage ? "bold" : "normal"}
                    color={i === currentPage ? "white" : "purple.300"}
                    cursor="pointer"
                    _hover={{ 
                      color: i === currentPage ? "white" : "purple.100",
                      transform: i === currentPage ? "none" : "translateY(-1px)"
                    }}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    border={i === currentPage ? "1px solid" : "none"}
                    borderColor={i === currentPage ? "rgba(147, 51, 234, 0.5)" : "transparent"}
                    bg={i === currentPage ? "rgba(147, 51, 234, 0.3)" : "transparent"}
                    backdropFilter={i === currentPage ? "blur(10px)" : "none"}
                    transition="all 0.2s ease"
                  >
                    {i}
                  </Text>
                </Link>
              );
            }
            
            // Always show last page if not in range
            if (endPage < lastPage) {
              // Add ellipsis if there's a gap
              if (endPage < lastPage - 1) {
                pages.push(
                  <Text key="ellipsis2" color="gray.500" px={2} fontSize="sm">
                    ...
                  </Text>
                );
              }
              
              pages.push(
                <Link key={lastPage} href={createPageURL(lastPage)} passHref>
                  <Text
                    fontSize="sm"
                    color="purple.300"
                    cursor="pointer"
                    _hover={{ color: "purple.100" }}
                    px={2}
                    py={1}
                    borderRadius="md"
                    transition="all 0.2s ease"
                  >
                    {lastPage}
                  </Text>
                </Link>
              );
            }
            
            /**
             * Note: have a look at this debug in console to see how the gq search query changes the total and lastPage
             * each time you click on the last page! So what is the actual last page? ⁉️
             */
            console.log('Pagination Debug:', {
              currentPage,
              lastPage,
              startPage,
              endPage,
              showPages,
              pagesLength: pages.length
            });
            
            return pages;
          })()}
        </Flex>

        <Link href={createPageURL(Math.min(currentPage + 1, lastPage))} passHref>
          <Button
            disabled={!hasNextPage}
            size="md"
            height="40px"
            px={6}
            fontSize="sm"
            fontWeight="semibold"
            bg="rgba(147, 51, 234, 0.1)"
            border="1px solid"
            borderColor="rgba(147, 51, 234, 0.3)"
            color="purple.200"
            borderRadius="lg"
            backdropFilter="blur(10px)"
            _hover={{
              bg: "rgba(147, 51, 234, 0.2)",
              borderColor: "rgba(147, 51, 234, 0.5)",
              color: "purple.100",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(147, 51, 234, 0.2)"
            }}
            _disabled={{
              bg: "rgba(88, 28, 135, 0.05)",
              borderColor: "rgba(147, 51, 234, 0.1)",
              color: "gray.500",
              cursor: "not-allowed",
              transform: "none",
              boxShadow: "none"
            }}
            transition="all 0.2s ease"
          >
            Next
          </Button>
        </Link>
      </Flex>
      
      <Text textAlign="center" color="purple.300" mt={4} fontSize="sm" fontWeight="medium">
        Page {currentPage} of {lastPage}
      </Text>
    </Box>
  );
} 