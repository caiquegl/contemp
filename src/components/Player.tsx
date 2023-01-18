import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { pxToRem } from '../utils/pxToRem'


const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const Player = () => {
  const { isOpen, onOpen, onClose, isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      p={["123px 20px", "123px 20px", "123px 20px", "123px 20px", "123px 0"]}
    >
      {!isMobile && (
        <Box w="100%" maxW={pxToRem(700)} mr="40px">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=_wDK3yVYC7Y"
            height={pxToRem(533)}
            width="100%"
          />
        </Box>
      )}
      <Grid maxW={pxToRem(359)} templateRows="1fr 0.73fr 1fr">
        <Text fontSize={pxToRem(40)} fontWeight="bold">
          Nova Linha de Controles e Indicadores
        </Text>
        <Text fontSize={pxToRem(20)}>
          Logo abaixo nosso vídeo sobre Contemp C504 – Controlador de Processos.
        </Text>
        {isMobile ? (
          <VStack spacing={pxToRem(20)} alignItems="center">
              <Button
                w="179px"
                h="50px"
                borderRadius="25px"
                bg="red.600"
                fontSize={pxToRem(20)}
                _hover={{ transition: "all 0.5s", opacity: 0.7 }}
                onClick={onOpen}
              >
                <Icon as={AiOutlinePlayCircle} mr="10px" />
                Vídeo 1
              </Button>
              <Button
                w="179px"
                h="50px"
                borderRadius="25px"
                bg="red.600"
                fontSize={pxToRem(20)}
                _hover={{ transition: "all 0.5s", opacity: 0.7 }}
                onClick={onOpen2}
              >
                <Icon as={AiOutlinePlayCircle} mr="10px" />
                Vídeo 2
              </Button>
          </VStack>
        ) : (
          <Box w="100%" maxW="359px" h="195px">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=_wDK3yVYC7Y"
              width="300px"
              height="195px"
            />
          </Box>
        )}
      </Grid>
      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="red" />
          <ModalBody p="20px" mt="20px">
            <Flex alignItems="center">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=_wDK3yVYC7Y"
                  height="195px"
                />
              </Flex>
        
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal  isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="red" />
          <ModalBody p="20px" mt="20px">
            <Flex alignItems="center">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=_wDK3yVYC7Y"
                  width="300px"
                  height="195px"
                />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Flex>
    
  );
};

