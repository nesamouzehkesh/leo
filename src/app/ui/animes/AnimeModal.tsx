'use client';

import { Box, Button, Image, Text, Badge, Flex, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaTimes, FaStar, FaCalendar, FaClock, FaPlay } from 'react-icons/fa';
import { useEscapeKey } from '@app/lib/hooks/useEscapeKey';
import { formatDate, formatDuration, getStatusColor } from '@app/lib/utils/anime-utils';
import { AnimeModalSkeleton } from './skeletons';
import { AnimeData } from '@app/lib/definitions';

interface AnimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  anime: AnimeData | null;
  isLoading: boolean;
}

export function AnimeModal({ isOpen, onClose, anime, isLoading }: AnimeModalProps) {
  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="blackAlpha.600"
      backdropFilter="blur(10px)"
      onClick={onClose}
    >
      <Box
        bg="gray.900"
        border="1px solid"
        borderColor="gray.700"
        maxW="600px"
        w="90%"
        maxH="85vh"
        overflow="hidden"
        borderRadius="lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="anime-title"
      >
        {isLoading ? (
          <AnimeModalSkeleton onClose={onClose} />
        ) : anime ? (
          <>
            {/* Banner Image */}
            <Box position="relative" height="150px" overflow="hidden">
              <Image
                src={anime.bannerImage || anime.coverImage?.large || ''}
                alt={anime.title?.english || anime.title?.romaji || 'Anime'}
                w="100%"
                h="100%"
                objectFit="cover"
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)"
              />
              <Button
                position="absolute"
                top={2}
                right={2}
                color="white"
                bg="blackAlpha.500"
                borderRadius="full"
                size="sm"
                _hover={{ bg: "blackAlpha.700" }}
                onClick={onClose}
                aria-label="Close modal"
              >
                <Icon as={FaTimes} />
              </Button>
            </Box>

            {/* Header */}
            <Box bg="gray.800" borderBottom="1px solid" borderColor="gray.700" p={3}>
              <VStack align="start" gap={1}>
                <Text id="anime-title" fontSize="lg" fontWeight="bold" color="white">
                  {anime.title?.english || anime.title?.romaji}
                </Text>
                {anime.title?.english && anime.title?.romaji && anime.title.english !== anime.title.romaji && (
                  <Text fontSize="sm" color="gray.400" fontStyle="italic">
                    {anime.title.romaji}
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Content */}
            <Box p={4} maxH="50vh" overflowY="auto">
              <VStack align="start" gap={4}>
                {/* Score and Status */}
                <HStack gap={3} wrap="wrap">
                  {anime.averageScore && (
                    <HStack gap={1}>
                      <Icon as={FaStar} color="yellow.400" boxSize={3} />
                      <Text color="white" fontWeight="semibold" fontSize="sm">
                        {anime.averageScore / 10} / 10
                      </Text>
                    </HStack>
                  )}
                  {anime.status && (
                    <Badge colorScheme={getStatusColor(anime.status)} variant="subtle" fontSize="xs">
                      {anime.status}
                    </Badge>
                  )}
                </HStack>

                {/* Description */}
                {anime.description && (
                  <Box>
                    <Text color="gray.300" lineHeight="1.5" fontSize="sm">
                      {anime.description.replace(/<[^>]*>/g, '').substring(0, 200)}
                      {anime.description.length > 200 && '...'}
                    </Text>
                  </Box>
                )}

                <Box borderTop="1px solid" borderColor="gray.700" w="100%" />

                {/* Details Grid */}
                <Box w="100%">
                  <Text fontSize="md" fontWeight="bold" color="white" mb={3}>
                    Details
                  </Text>
                  <VStack align="start" gap={2}>
                    <HStack gap={3} wrap="wrap">
                      {anime.episodes && (
                        <HStack gap={1}>
                          <Icon as={FaPlay} color="purple.400" boxSize={3} />
                          <Text color="gray.300" fontSize="sm">
                            {anime.episodes} {anime.episodes === 1 ? 'Episode' : 'Episodes'}
                          </Text>
                        </HStack>
                      )}
                      {anime.duration && (
                        <HStack gap={1}>
                          <Icon as={FaClock} color="blue.400" boxSize={3} />
                          <Text color="gray.300" fontSize="sm">
                            {formatDuration(anime.duration)} per episode
                          </Text>
                        </HStack>
                      )}
                    </HStack>

                    <HStack gap={3} wrap="wrap">
                      {anime.startDate && (
                        <HStack gap={1}>
                          <Icon as={FaCalendar} color="green.400" boxSize={3} />
                          <Text color="gray.300" fontSize="sm">
                            {formatDate(anime.startDate)}
                            {anime.endDate && anime.endDate.year && anime.endDate.year !== anime.startDate.year && 
                              ` - ${formatDate(anime.endDate)}`
                            }
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  </VStack>
                </Box>

                {/* Genres */}
                {anime.genres && anime.genres.length > 0 && (
                  <Box w="100%">
                    <Text fontSize="md" fontWeight="bold" color="white" mb={2}>
                      Genres
                    </Text>
                    <Flex wrap="wrap" gap={1}>
                      {anime.genres.slice(0, 6).map((genre, index) => (
                        <Badge
                          key={index}
                          colorScheme="purple"
                          variant="outline"
                          px={2}
                          py={0.5}
                          borderRadius="full"
                          fontSize="xs"
                          borderColor="purple.400"
                          color="purple.200"
                        >
                          {genre}
                        </Badge>
                      ))}
                      {anime.genres.length > 6 && (
                        <Badge
                          colorScheme="purple"
                          variant="outline"
                          px={2}
                          py={0.5}
                          borderRadius="full"
                          fontSize="xs"
                          borderColor="purple.400"
                          color="purple.200"
                        >
                          +{anime.genres.length - 6} more
                        </Badge>
                      )}
                    </Flex>
                  </Box>
                )}
              </VStack>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
} 