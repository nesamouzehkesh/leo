"use client";

import { useActionState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { saveProfile, ProfileState } from '@app/lib/actions';
import { useState } from "react";

const initialState: ProfileState = {
  errors: {},
  message: null,
};

export function ProfileForm() {
  const [state, formAction] = useActionState(saveProfile, initialState);
  const [formData, setFormData] = useState({ username: '', jobTitle: '' });

  const userNameError = state?.errors?.username?.[0] ?? null;
  const jobTitleError = state?.errors?.jobTitle?.[0] ?? null;

  /**
   * Note: useActionState only validates on form submission, not on real-time input changes.
   * This means validation errors persist until the form is submitted again, which creates
   * a poor user experience. To fix this, I implemented real-time validation by:
   * 1. Tracking input values in local state (formData)
   * 2. Only showing errors when the current input is actually invalid
   * 3. Clearing errors immediately when user types valid input
   */
  const shouldShowUsernameError = userNameError && formData.username.length < 2;
  const shouldShowJobTitleError = jobTitleError && formData.jobTitle.length < 2;
  
  // Only show general error message if there are actual field errors
  const shouldShowGeneralError = state?.message && (shouldShowUsernameError || shouldShowJobTitleError);

  return (
    <Box
      bg="rgba(88, 26, 146, 0.15)"
      p={5}
      borderRadius="2xl"
      boxShadow="2xl"
      w="100%"
      maxW="550px"
      position="relative"
      overflow="visible"
      backdropFilter="blur(20px)"
      border="1px solid rgba(168, 85, 247, 0.3)"
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
        borderRadius: '2xl',
        zIndex: -1,
        opacity: 0.6,
      }}
    >
      <Box
        mb={3}
        textAlign="center"
        fontSize="xl"
        fontWeight="bold"
        fontFamily="'Fredoka', 'Comic Neue', 'Quicksand', sans-serif"
        color="#f472b6"
      >
        <span style={{
          background: 'linear-gradient(to right, #f472b6, #c084fc, #e879f9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Create or Edit User Profile
        </span>
      </Box>
      <form action={formAction}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box w="100%">
            <Text mb={1} fontWeight="semibold" color="#bc81d1" fontSize="sm" fontFamily="'Fredoka', 'Comic Neue', 'Quicksand', sans-serif">
              Username
            </Text>
            <Input
              name="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter your username"
              autoComplete="off"
              bg="black"
              color="white"
              borderColor="gray.700"
              _placeholder={{ color: "gray.500", fontSize: "xs" }}
              _focus={{
                borderColor: "#d946ef",
                boxShadow: "0 0 0 2px #d946ef, 0 0 8px #a21caf",
              }}
              _hover={{
                borderColor: "#a21caf",
                boxShadow: "0 0 0 2px #a21caf, 0 0 8px #a21caf",
              }}
              transition="all 0.2s"
            />
            <Box h="16px" mt={1}>
              <Text fontSize="2xs" color={shouldShowUsernameError ? "red.300" : "transparent"}>
                {shouldShowUsernameError ? userNameError : "\u00A0"}
              </Text>
            </Box>
          </Box>
          <Box w="100%">
            <Text mb={1} fontWeight="semibold" color="#bc81d1" fontSize="sm" fontFamily="'Fredoka', 'Comic Neue', 'Quicksand', sans-serif">
              Job Title
            </Text>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
              placeholder="Enter your job title"
              autoComplete="off"
              bg="black"
              color="white"
              borderColor="gray.700"
              _placeholder={{ color: "gray.500", fontSize: "xs" }}
              _focus={{
                borderColor: "#d946ef",
                boxShadow: "0 0 0 2px #d946ef, 0 0 8px #a21caf",
              }}
              _hover={{
                borderColor: "#a21caf",
                boxShadow: "0 0 0 2px #a21caf, 0 0 8px #a21caf",
              }}
              transition="all 0.2s"
            />
            <Box h="16px" mt={1}>
              <Text fontSize="2xs" color={shouldShowJobTitleError ? "red.300" : "transparent"}>
                {shouldShowJobTitleError ? jobTitleError : "\u00A0"}
              </Text>
            </Box>
          </Box>
          <Button
            type="submit"
            w="full"
            fontWeight="bold"
            fontSize="md"
            mt={2}
            bg="purple.700"
            color="#bc81d1"
            _hover={{ bg: "purple.500", color: "white" }}
            _active={{ bg: "purple.600" }}
            _focus={{
              bg: "purple.500",
              boxShadow: "0 0 0 2px purple.300",
            }}
          >
            Continue
          </Button>
          <Box h="18px" mt={2} textAlign="center">
            <Text fontSize="2xs" color={shouldShowGeneralError ? "red.300" : "transparent"} fontWeight="semibold">
              {shouldShowGeneralError ? state.message : "\u00A0"}
            </Text>
          </Box>
        </Box>
      </form>
    </Box>
  );
} 