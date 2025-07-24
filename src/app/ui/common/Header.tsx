import { Box, Flex, Image } from "@chakra-ui/react";
import { LEONARDO_LOGO_WHITE_URL } from "@app/lib/utils/constants";

export function Header() {
  return (
    <Box position="sticky" top="0" zIndex="sticky">
      <Box bg="purple.500" w="100%" px={0} py={2}>
        <Flex align="center" maxW="1200px" mx="auto">
          <Image
            src={LEONARDO_LOGO_WHITE_URL}
            alt="Leonardo.AI"
            h="36px"
            ml={6}
            mr={3}
            objectFit="contain"
          />
        </Flex>
      </Box>
    </Box>
  );
}