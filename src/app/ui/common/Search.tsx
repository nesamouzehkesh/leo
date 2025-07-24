'use client';

import { Box, Input } from '@chakra-ui/react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce } from '@app/lib/hooks/useDebounce';
import { useState, useEffect, useRef } from 'react';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
  const debouncedSearchValue = useDebounce({ inputValue: searchValue, delay: 300 });
  const lastProcessedValue = useRef(debouncedSearchValue);

  // Update URL when debounced value changes
  useEffect(() => {
    // Only update if the value has actually changed
    if (debouncedSearchValue !== lastProcessedValue.current) {
      const params = new URLSearchParams(searchParams);
      
      if (debouncedSearchValue && debouncedSearchValue.trim().length >= 2) {
        params.set('query', debouncedSearchValue.trim());
      } else {
        params.delete('query');
      }
      
      // Reset to page 1 when searching
      params.delete('page');
      
      replace(`${pathname}?${params.toString()}`);
      lastProcessedValue.current = debouncedSearchValue;
    }
  }, [debouncedSearchValue, pathname, replace, searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Box 
      w="100%" 
      maxW="400px"
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="lg"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.2)"
      p={2}
      backdropFilter="blur(20px)"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
      _hover={{
        borderColor: "rgba(255, 255, 255, 0.3)",
        bg: "rgba(255, 255, 255, 0.15)"
      }}
      _focusWithin={{
        borderColor: "rgba(255, 255, 255, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        bg: "rgba(255, 255, 255, 0.2)"
      }}
      transition="all 0.3s ease"
    >
      <Input
        placeholder="Search anime or manga..."
        size="sm"
        variant="outline"
        borderRadius="lg"
        value={searchValue}
        onChange={handleSearch}
        color="white"
        bg="transparent"
        border="none"
        h="28px"
        _placeholder={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "sm" }}
        _focus={{
          outline: "none",
          bg: "transparent",
          border: "none"
        }}
        _hover={{
          bg: "transparent",
          border: "none"
        }}
      />
    </Box>
  );
}
