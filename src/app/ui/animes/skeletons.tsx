import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import {
  SkeletonText,
  HStack,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

export function AnimesLoadingSkeleton() {
  return (
    <Box maxW="1200px" w="100%" mx="auto" px={{ base: 4, md: 6 }} py={8}>
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
        gap={{ base: 3, md: 4 }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <Box key={i} textAlign="center">
            <Skeleton
              height="300px"
              borderRadius="lg"
              mb={2}
              bg="gray.800"
            />
            <Skeleton
              height="20px"
              width="80%"
              mx="auto"
              borderRadius="md"
              bg="gray.800"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

interface AnimeModalSkeletonProps {
  onClose: () => void;
}

export function AnimeModalSkeleton({ onClose }: AnimeModalSkeletonProps) {
  // Note: This log only appears once because React.lazy() caches the component after first load.
  // Subsequent clicks use the cached component, so no new Promise is created and no log appears.
  // This is the intended behavior of lazy loading - cache once, use many times!
  console.log("Lazy loaded Fallback skeleton rendered...");

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
      >
        {/* Loading Header */}
        <Box bg="gray.800" borderBottom="1px solid" borderColor="gray.700" p={3} position="relative">
          <Skeleton height="20px" width="50%" />
          <Button
            position="absolute"
            top={2}
            right={2}
            color="gray.400"
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon as={FaTimes} />
          </Button>
        </Box>
        
        {/* Loading Content */}
        <Box p={0}>
          <Skeleton 
            height="150px" 
            bg="gray.800"
          />
          <Box p={4}>
            <SkeletonText 
              mt={3} 
              noOfLines={2} 
              bg="gray.800"
            />
            <HStack mt={4} gap={3}>
              <Skeleton 
                height="16px" 
                width="60px" 
                bg="gray.800"
              />
              <Skeleton 
                height="16px" 
                width="50px" 
                bg="gray.800"
              />
              <Skeleton 
                height="16px" 
                width="80px" 
                bg="gray.800"
              />
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}