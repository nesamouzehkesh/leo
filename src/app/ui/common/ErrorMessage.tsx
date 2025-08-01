import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onBackClick?: () => void;
  showIcon?: boolean;
  retryText?: string;
  backText?: string;
}

export function ErrorMessage({ 
  message, 
  onRetry, 
  onBackClick, 
  showIcon = true, 
  retryText = "Try Again",
  backText = "Go Back"
}: ErrorMessageProps) {
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
        <Box mb={6}>
          <FaExclamationTriangle size={48} color="#e53e3e" />
        </Box>
      )}
      
      <Text 
        fontSize="2xl" 
        fontWeight="bold" 
        color="white" 
        mb={6}
        maxW="600px"
        lineHeight="1.4"
      >
        {message}
      </Text>
      
      {(onRetry || onBackClick) && (
        <Flex gap={4} justify="center">
          {onBackClick && (
            <Button
              onClick={onBackClick}
              px={8}
              py={4}
              fontSize="md"
              fontWeight="bold"
              color="white"
              bg="gray.700"
              borderRadius="full"
              border="1px solid rgba(255, 255, 255, 0.2)"
              _hover={{
                bg: 'gray.600',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                boxShadow: '0 0 12px 2px rgba(255, 255, 255, 0.1)',
              }}
              transition="all 0.2s"
            >
              {backText}
            </Button>
          )}
          
          {onRetry && (
            <Button
              onClick={onRetry}
              px={8}
              py={4}
              fontSize="md"
              fontWeight="bold"
              color="white"
              bg="gray.700"
              borderRadius="full"
              border="1px solid rgba(255, 255, 255, 0.2)"
              _hover={{
                bg: 'gray.600',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                boxShadow: '0 0 12px 2px rgba(255, 255, 255, 0.1)',
              }}
              transition="all 0.2s"
            >
              {retryText}
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
} 