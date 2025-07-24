'use client';

import { Box, Image, Text, AspectRatio } from "@chakra-ui/react";
import '@fontsource/fredoka/600.css';

interface AnimeCardProps {
  anime: {
    id: number;
    title?: {
      english?: string;
      romaji?: string;
    };
    coverImage?: {
      large?: string;
    };
  };
  onClick: (anime: any) => void;
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  return (
    <Box
      bg="gray.900"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "xl", transform: "scale(1.03)" }}
      transition="all 0.2s"
      textAlign="center"
      cursor="pointer"
      onClick={() => onClick(anime)}
    >
      <AspectRatio ratio={3 / 4}>
        <Image
          src={anime.coverImage?.large}
          alt={anime.title?.english || anime.title?.romaji || "Anime"}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </AspectRatio>
      <Text
        mt={2}
        mb={3}
        px={2}
        fontFamily="'Fredoka', 'Comic Neue', 'Quicksand', sans-serif"
        fontWeight="bold"
        fontSize="sm"
        color="white"
        minH="32px"
        maxH="48px"
        overflow="hidden"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
        }}
      >
        {anime.title?.english || anime.title?.romaji}
      </Text>
    </Box>
  );
} 