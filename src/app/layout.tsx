import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@app/lib/providers';
import { Footer } from '@app/ui/common/Footer';
import { Header } from '@app/ui/common/Header';
import { Flex, Box } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: 'Leonardo.Anime',
  description: 'Discover Your Next Favorite Anime & Manga',
};

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box 
            position="relative" 
            minH="100vh" 
            bg="black" 
            overflow="hidden"
            backgroundImage="url('https://leonardo.ai/wp-content/uploads/2024/06/bg-grid-hero-m.svg')"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
            {/* Purple gradient overlay - top right */}
            <Box
              position="absolute"
              top="0"
              right="0"
              width="400px"
              height="400px"
              background="radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 70%)"
              zIndex={0}
              pointerEvents="none"
            />
            
            {/* Pink gradient overlay - bottom left */}
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="500px"
              height="500px"
              background="radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 70%)"
              zIndex={0}
              pointerEvents="none"
            />
            
            {/* Purple-pink gradient overlay - center */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="800px"
              height="600px"
              background="radial-gradient(ellipse, rgba(168, 85, 247, 0.08) 0%, rgba(236, 72, 153, 0.06) 30%, transparent 60%)"
              zIndex={0}
              pointerEvents="none"
            />
            
            {/* Small purple accent - top left */}
            <Box
              position="absolute"
              top="20%"
              left="10%"
              width="200px"
              height="200px"
              background="radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)"
              zIndex={0}
              pointerEvents="none"
            />

            {/* Main layout content */}
            <Flex direction="column" minH="100vh" position="relative" zIndex={1}>
              <Header />
              <Box flex={1}>{children}</Box>
              <Footer />
            </Flex>
          </Box>
        </Providers>
      </body>
    </html>
  );
}