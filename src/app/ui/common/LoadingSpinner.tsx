import { Box, Image, Flex } from '@chakra-ui/react';
import { LEONARDO_LOGO_URL } from '@app/lib/utils/constants';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'md', showLogo = true, fullScreen = false }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: { spinner: '60px', logo: '60px' },
    md: { spinner: '120px', logo: '120px' },
    lg: { spinner: '180px', logo: '180px' }
  };

  const { spinner, logo } = sizeMap[size];

  const SpinnerContent = (
    <Box position="relative">
      {/* Spinning colorful square */}
      <Box
        w={spinner}
        h={spinner}
        borderRadius="36%"
        bgGradient="conic-gradient(rgb(23, 38, 44), rgb(250, 85, 96), rgb(177,75,244), rgb(23, 38, 44), rgb(23, 38, 44), rgb(177, 75, 244), rgb(77, 145, 255), rgb(23, 38, 44), rgb(23, 38, 44))"
        animation="spin 2s linear infinite"
      />
      
      {/* Leonardo logo positioned on top */}
      {showLogo && (
        <Flex
          position="absolute"
          inset={0}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={LEONARDO_LOGO_URL}
            alt="Leonardo AI"
            w={logo}
            h={logo}
            opacity={0.9}
          />
        </Flex>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Flex 
        alignItems="center" 
        justifyContent="center" 
        minH="100vh" 
        bg="black"
      >
        {SpinnerContent}
      </Flex>
    );
  }

  return SpinnerContent;
} 