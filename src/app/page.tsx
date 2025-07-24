
import { Box, Flex, Image } from "@chakra-ui/react";
import { ProfileForm } from "@app/ui/common/ProfileForm";
import { LEONARDO_LOGO_URL } from '@app/lib/utils/constants';

export default async function HomePage() {
  return (
    <Box 
      position="relative" 
      minH="100vh" 
      overflow="hidden"
    >
      {/* Kitten video attached to the card */}
      <Box
        position="absolute"
        top={{ base: "10vh", md: "15vh" }}
        right={{ base: "10vw", md: "25vw" }}
        zIndex={-1}
        width="clamp(200px, 25vw, 300px)"
        transform="rotate(12deg)"
        opacity={0.92}
        pointerEvents="none"
        filter="drop-shadow(0 0 32px #a21caf)"
      >
        <video
          src="https://leonardo.ai/wp-content/uploads/2024/05/cat-space-med-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", borderRadius: "24px" }}
        />
      </Box>
      {/* Universal Upscaler image bottom left */}
      <Box
        position="absolute"
        bottom={{ base: "5vh", md: "10vh" }}
        left={{ base: "10vw", md: "20vw" }}
        zIndex={-1}
        width="clamp(200px, 25vw, 300px)"
        transform="rotate(-8deg)"
        opacity={0.92}
        pointerEvents="none"
        filter="drop-shadow(0 0 32px #a21caf)"
      >
        <Image
          src="https://leonardo.ai/wp-content/uploads/2025/05/default_insanity-square-2-480x480.jpg.webp"
          alt="Universal Upscaler"
          borderRadius="24px"
          w="100%"
          h="auto"
        />
      </Box>
      {/* Leonardo Logo Background Watermark - Page-specific - though tempting but DO NOT move this to root layout to avoid animes loading skeleton visual overlap! */}
      <Box
        position="absolute"
        top="50%"
        right="20%"
        transform="translateY(-50%)"
        width="120vw"
        height="120vh"
        opacity={0.03}
        pointerEvents="none"
        zIndex={0}
      >
        <Image
          src={LEONARDO_LOGO_URL}
          alt="Leonardo Background"
          w="100%"
          h="100%"
          objectFit="contain"
        />
      </Box>
      
      <Flex minH="100vh" align="center" justify="center" position="relative" zIndex={1}>
        <ProfileForm />
      </Flex>
    </Box>
  );
}