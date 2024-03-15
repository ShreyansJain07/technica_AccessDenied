import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Icon,
  Grid,
  GridItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaAccessibleIcon } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  IoContrastOutline,
  IoColorWandOutline,
  IoResize,
  IoText,
  IoPauseOutline,
  IoEyeOffOutline,
  IoReaderOutline,
  IoResizeOutline,
  IoTextOutline,
  IoContrastSharp,
  IoPaperPlane,
  IoEyeOutline,
} from "react-icons/io5";
import { FaQuestion, FaTrash } from "react-icons/fa";
import { Divider } from "antd";
import { ZoomIn, ZoomInSharp, ZoomOutSharp } from "@material-ui/icons";

const AccessibilityGrid = (props) => {
  const { toggleColorMode } = useColorMode();
  const [zoomLevel, setZoomLevel] = useState(
    parseInt(localStorage.getItem('zoomLevel')) || 100
  );
  const [paused, isPaused] = useState(
    localStorage.getItem('paused') === 'true' || false
  );
  const [hidden, setHidden] = useState(
    localStorage.getItem('hidden') === 'true' || false
  );
  const [animation, setAnimation] = useState(
    localStorage.getItem('animation') === 'true' || true
  );
  const [saturation, setSaturation] = useState(
    localStorage.getItem('saturation') === 'true' || true
  );

  // Update local storage when state changes
  useEffect(() => {
    localStorage.setItem('zoomLevel', zoomLevel);
  }, [zoomLevel]);

  useEffect(() => {
    localStorage.setItem('paused', paused);
  }, [paused]);

  useEffect(() => {
    localStorage.setItem('hidden', hidden);
  }, [hidden]);

  useEffect(() => {
    localStorage.setItem('animation', animation);
  }, [animation]);

  useEffect(() => {
    localStorage.setItem('saturation', saturation);
  }, [saturation]);

  // Your component rendering and logic here

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200));
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50));
  };

  const features = [
    {
      icon: <IoContrastOutline />,
      label: "Contrast",
      func: () => {
        toggleColorMode();
      },
    },
    // { icon: <IoColorWandOutline />, label: "Highlight Links" },
    {
      icon: paused ? <IoPaperPlane /> : <IoPauseOutline />,
      label: paused ? "Resume Animations" : "Pause Animations",
      func: () => {
        var elements = document.querySelectorAll(".animated-element");
        elements.forEach(function (element) {
          // Toggle the class to pause or resume animations
          element.classList.toggle("paused-animation");
        });
        setAnimation(!animation);
      },
    },
    {
      icon: <ZoomInSharp />,
      label: "Increase Font Size",
      func: () => {
        zoomIn();
      },
    },
    {
      icon: <ZoomOutSharp />,
      label: "Decrease Font Size",
      func: () => {
        zoomOut();
      },
    },
    {
      icon: <IoText />,
      label: "Text Spacing +",
      func: () => {
        document.body.style.letterSpacing = "3px";
      },
    },
    {
      icon: <IoText />,
      label: "Text Spacing -",
      func: () => {
        document.body.style.letterSpacing = "normal";
      },
    },

    {
      icon: hidden ? <IoEyeOutline /> : <IoEyeOffOutline />,
      label: hidden ? "Show Images" : "Hide Images",
      func: () => {
        let images = document.querySelectorAll("img");
        images.forEach((img) => {
          img.classList.toggle("hidden");
        });
        setHidden(!hidden);
      },
    },
    {
      icon: <IoContrastSharp />,
      label: saturation ? "Saturation Change +" : "Saturation Change -",
      func: () => {
        if (saturation) {
          document.body.style.filter = "saturate(0)";
        } else {
          document.body.style.filter = "saturate(1)";
        }
        setSaturation(!saturation);
      },
    },
    // { icon: <IoReaderOutline />, label: "Dyslexia Friendly" },
    {
      icon: <IoResizeOutline />,
      label: "Line Height +",
      func: () => {
        document.body.style.lineHeight = "2";
      },
    },
    {
      icon: <IoResizeOutline />,
      label: "Line Height -",
      func: () => {
        document.body.style.lineHeight = "1";
      },
    },
    // { icon: <IoTextOutline />, label: "Text Align" },
    
  ];

  useEffect(() => {
    document.body.style.zoom = `${zoomLevel}%`;
  }, [zoomLevel]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {features.map((feature, index) => (
        <GridItem key={index}>
          <Box
            borderRadius={"xl"}
            as="button"
            onClick={() => feature.func()}
            p="4"
            borderWidth="1px"
            shadow="md"
            width={"full"}
            height={"full"}
          >
            <Flex direction="column" align="center" justify="center">
              {feature.icon}
              {/* <Icon as={feature.icon} boxSize={8} mb="2" /> */}
              <Text fontSize="md" fontWeight="bold">
                {feature.label}
              </Text>
            </Flex>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

const AccessibilityMenu = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onToggle = () => {
    const initialSpeech = `Accessibility Menu ${isOpen ? "Closed" : "Opened"} `;
    const initialUtterance = new SpeechSynthesisUtterance(initialSpeech);

    if (isOpen) {
      onClose();
      window.speechSynthesis.speak(initialUtterance);
    } else {
      onOpen();
      window.speechSynthesis.speak(initialUtterance);
    }
  };
  const handlePress = (event) => {
    // Check if Control (Cmd on Mac) key is pressed along with 'U'
    if ((event.metaKey || event.ctrlKey) && event.key === "u") {
      event.preventDefault();
      console.log("Control + U pressed");
      onToggle();
    }
  };

  useEffect(() => {
    // Attach event listener when the component mounts
    window.addEventListener("keydown", handlePress);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, []); // Empty dependency array ensures the effect runs only once during mount and unmount

  return (
    <Box color={useColorModeValue("gray.800", "whiteAlpha.900")}>
      <IconButton
        icon={<FaAccessibleIcon />}
        aria-label="Voice Button"
        onClick={onToggle}
        size="lg"
        colorScheme="teal"
        aria-labelledby="voice-assistant"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onToggle();
        }}
        size={{ base: "full", md: "md" }} // Responsive width based on screen size
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Accessibility Menu</DrawerHeader>
          <DrawerBody bg={useColorModeValue("gray.100", "gray.900")}>
            <VStack spacing={4} my={4}>
              <Button
                as={Link}
                width={"full"}
                colorScheme="teal"
                to={"/help"}
                borderRadius={"xl"}
                size={"lg"}
              >
                {" "}
                <Icon as={FaQuestion} mr={2} /> How to use
              </Button>
              <Button
                as={Link}
                width={"full"}
                colorScheme="red"
                borderRadius={"xl"}
                size={"lg"}
              >
                {" "}
                <Icon as={FaTrash} mr={2} /> Clear All Setttings
              </Button>
            </VStack>
            <Divider />
            <AccessibilityGrid {...props} />
          </DrawerBody>
          {/* <DrawerFooter>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AccessibilityMenu;