import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Button,
  Text,
  ModalFooter,
  Icon,
  SimpleGrid,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  FaMicrophoneAlt,
  FaMicrophoneSlash,
  FaMicrophone,
} from "react-icons/fa";
import { Card, Flex } from "antd";

const LanguageButtons = () => {
  const languages = [
    { name: "Hindi", code: "hi" },
    { name: "Tamil", code: "ta" },
    { name: "Telugu", code: "te" },
    { name: "Bengali", code: "bg" },
    // Add more languages as needed
  ];

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={4} width="full">
      {languages.map((language) => (
        <Button
          key={language.code}
          width="full"
          colorScheme="teal"
          size={"lg"}
          onFocus={() =>
            SpeechRecognition.startListening({ language: language.code })
          }
        >
          <Text fontSize="lg">{language.name}</Text>
        </Button>
      ))}
    </SimpleGrid>
  );
};

const VoiceButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isListening, setIsListening] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [status, setStatus] = useState("Not Listening");
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const navigate = useNavigate();

  const startListening = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      setIsListening(true);
      setStatus("Listening...");
    }
  };

  const stopListening = () => {
    if (!isListening) {
      return null;
    }
    SpeechRecognition.stopListening();
    setIsListening(false);
    setStatus("");
  };

  useEffect(() => {
    const parsingText = transcript.toLowerCase().replace(/[^\w\s]/gi, "");
    console.log(transcript, parsingText);

    const commands = {
      dashboard: "dashboard",
      job: "jobs",
      home: "",
      login:"signup",
      "sign up":"signup",
      auth:"signup",
      employee: "profile/:name",
      "virtual assistant": "virtualassistant",
      "ai course": "aicourse",
      resume: "resumebuilder",
      blog: "blog",
      speech: "speech",
      web: "web",
      rights: "disabilityrightsinfo",
      video: "aivideo",
      ocr: "ocr",
      community: "community",
      feedback: "feedback",
      browse: "browse",
    };

    for (const [command, link] of Object.entries(commands)) {
      if (parsingText.includes(command)) {
        setCurrentLink(link);
        stopListening();
        break;
      }
    }

    if (currentLink !== null) {
      navigate(`/${currentLink}`);
      const initialSpeech = `Navigation to ${currentLink} completed`;
      const initialUtterance = new SpeechSynthesisUtterance(initialSpeech);
      window.speechSynthesis.speak(initialUtterance);

      if (currentLink === "dashboard") {
        const dashboardUtterance = new SpeechSynthesisUtterance(
          "Dashboard has three sections: Profile, Resume Builder, and Recommended Jobs. What do you want to do?"
        );
        window.speechSynthesis.speak(dashboardUtterance);
      }

      window.location.reload();
      setCurrentLink(null);
    }
  }, [transcript]);

  
  if (!browserSupportsSpeechRecognition) {
    setStatus("Your browser does not support speech recognition.");
  }

  return (
    <Box color="teal.800" aria-label="Voice Assistant">
      <IconButton
        width="full"
        icon={<FaMicrophone />}
        aria-label="Voice Button"
        onClick={() => {
          const initialSpeech = "Voice Assistant, how may I help you today?";
          const initialUtterance = new SpeechSynthesisUtterance(initialSpeech);
          window.speechSynthesis.speak(initialUtterance);

          onOpen();
          initialUtterance.onend = () => {
            startListening();
          };
        }}
        size="lg"
        colorScheme="teal"
        aria-labelledby="voice-assistant"
      />
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Voice Assistant</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" align="center" justify="center">
              <Box>
                <Text fontSize="lg" color="gray.500">
                  {status}
                </Text>
              </Box>
              <Box>
                <Text fontSize="3xl" mt={2} fontWeight="bold" color="teal.500">
                  {transcript}
                </Text>
              </Box>
            </Flex>
          </DrawerBody>
          <ModalFooter>
            {isListening ? (
              <Button
                colorScheme="red"
                aria-label="Stop Listening"
                leftIcon={<Icon as={FaMicrophoneSlash} />}
                width="full"
                onClick={stopListening}
              >
                Stop Listening
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#2234da", color: "white" }}
                aria-label="Start Listening"
                leftIcon={<Icon as={FaMicrophoneAlt} />}
                width="full"
                onClick={startListening}
              >
                Start Listening
              </Button>
            )}
          </ModalFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default VoiceButton;