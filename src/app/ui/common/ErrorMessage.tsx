import { Box, Text, Button } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showIcon?: boolean;
}

export function ErrorMessage({ message, onRetry, showIcon = true }: ErrorMessageProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="calc(100vh - 200px)"
      textAlign="center"
      px={4}
    >
      {showIcon && (
        <Box mb={4}>
          <FaExclamationTriangle size={48} color="#e53e3e" />
        </Box>
      )}
      
      <Text 
        color="red.300" 
        fontSize="lg" 
        fontWeight="medium" 
        mb={4}
        maxW="600px"
      >
        {message}
      </Text>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          colorScheme="red"
          variant="outline"
          size="md"
          _hover={{
            bg: "red.500",
            color: "white"
          }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
} 