import { Box, Flex } from '@chakra-ui/react';
import { Search } from '@app/ui/common/Search';
import { UserProfileDisplay } from '@app/ui/common/UserProfile';

export default function AnimesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      {/* Search Bar and Profile info */}
      <Box 
        bg="rgba(88, 26, 146, 0.15)"
        w="100%" 
        px={0} 
        py={4} 
        borderBottom="1px solid" 
        borderColor="rgba(168, 85, 247, 0.3)"
        backdropFilter="blur(20px)"
        boxShadow="2xl"
        position="relative"
        overflow="visible"
        backgroundImage="radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          zIndex: -1,
          opacity: 0.6,
        }}
      >
        <Flex align="center" maxW="1200px" mx="auto" minH="56px" px={{ base: 4, md: 6 }} justify="space-between" gap={4}>
          <Search />
          <UserProfileDisplay />
        </Flex>
      </Box>
      {children}
    </Box>
  );
} 