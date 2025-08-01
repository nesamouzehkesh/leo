'use client';

import { Box, Input } from '@chakra-ui/react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce } from '@app/lib/hooks/useDebounce';
import { useState, useEffect} from 'react';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
  const debouncedSearchValue = useDebounce({ inputValue: searchValue, delay: 300 });

  // Update URL when debounced value changes
  useEffect(() => {
      const trimmed = debouncedSearchValue?.trim();
      const params = new URLSearchParams(searchParams);
      const currentQuery = searchParams.get('query');
  
      // Only update if the query has actually changed
      if (trimmed.length >= 2) {
        if (currentQuery !== trimmed) {
          params.set('query', trimmed);
          params.delete('page'); // Only delete page when query changes
        }
      } else {
        if (currentQuery) { // delete page and query from URL search params if the currentQuery gets edited to less than 2 chars
          params.delete('query');
          params.delete('page'); 
        }
      }
  
      console.log('✅ URL updated:', `${pathname}?${params.toString()}`);
  
      replace(`${pathname}?${params.toString()}`);
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
