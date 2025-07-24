'use client';

import { Box, Text, SimpleGrid, VStack, Icon } from "@chakra-ui/react";
import '@fontsource/fredoka/600.css';
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { AnimeModal } from "@app/ui/animes/AnimeModal";
import { AnimeCard } from "@app/ui/animes/AnimeCard";

export function AnimesList({ data }: { data: any }) {
  const animes = data?.Page?.media || [];
  const searchQuery = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('query') : null;
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnimeClick = (anime: any) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
    setIsLoading(true);
    
    // for better demo purposes - REMOVE FOR PRODUCTION!🚫
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnime(null);
    setIsLoading(false);
  };

  if (animes.length === 0) {
    return (
      <Box maxW="1200px" w="100%" mx="auto" px={{ base: 4, md: 6 }} py={16}>
        <VStack gap={6} textAlign="center">
          <Icon as={FaSearch} boxSize={16} color="gray.500" />
          <VStack gap={2}>
            <Text fontSize="xl" fontWeight="bold" color="gray.300">
              {searchQuery ? `No anime found for "${searchQuery}"` : "No anime found"}
            </Text>
            <Text color="gray.500" fontSize="md">
              {searchQuery 
                ? "Try adjusting your search terms or browse our popular anime collection."
                : "There seems to be an issue loading the anime data."
              }
            </Text>
            {searchQuery && (
              <Text color="gray.600" fontSize="sm" mt={2}>
                You can try searching for different keywords or clear your search to see all anime.
              </Text>
            )}
          </VStack>
        </VStack>
      </Box>
    );
  }

  return (
    <>
      <Box maxW="1200px" w="100%" mx="auto" px={{ base: 4, md: 6 }} py={8}>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
          gap={{ base: 3, md: 4 }}
        >
          {animes.map((anime: any) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={handleAnimeClick}
            />
          ))}
        </SimpleGrid>
      </Box>

      <AnimeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        anime={selectedAnime}
        isLoading={isLoading}
      />
    </>
  );
}
