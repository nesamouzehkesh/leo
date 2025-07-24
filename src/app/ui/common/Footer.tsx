import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { LEONARDO_LOGO_URL } from '@app/lib/utils/constants';

export function Footer() {
  return (
    <Box as="footer" py={8} bg="gray.900" borderTop="1px solid" borderColor="gray.800" w="100%">
      <Flex align="center" justify="center" gap={4}>
        <Image
          src={LEONARDO_LOGO_URL}
          alt="Leonardo Logo"
          boxSize="40px"
          borderRadius="full"
          bg="gray.800"
        />
        <Text color="gray.300" fontSize="md" fontWeight="medium">
          Leonardo Challenge v3.5
        </Text>
      </Flex>
    </Box>
  );
} 