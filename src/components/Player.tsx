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
            url="https://www.youtube.com/watch?v=iKF2F4Q-xBU"
            height={pxToRem(533)}
            width="100%"
          />
        </Box>
      )}
      <Grid maxW={pxToRem(359)} templateRows="1fr 0.73fr 1fr">
        <Text fontSize={pxToRem(40)} fontWeight="bold" lineHeight={'2.75rem'}>
          Nova Linha de Controles e Indicadores
        </Text>
        <Text fontSize={pxToRem(20)} mb={"15px"} mt={"-35px"}>
        Estamos muito felizes em ter você aqui no site da Contemp. Vejam nossa nova linha de produtos, a funcionalidade do NFC e as especificações técnicas para aplicações em seus processos.
        </Text>
        {isMobile ? (
          <VStack spacing={pxToRem(20)} alignItems="center">
              <Button
                w="179px"
                h="50px"
                borderRadius="25px"
                bg="red.600"
                fontSize={pxToRem(20)}
                _hover={{ transition: "all 0.5s"}}
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
                _hover={{ transition: "all 0.5s"}}
                onClick={onOpen2}
              >
                <Icon as={AiOutlinePlayCircle} mr="10px" />
                Vídeo 2
              </Button>
          </VStack>
        ) : (
          <Box w="100%" maxW="359px" h="195px">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=qpcecRYRupg"
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
          <ModalBody mt="50px">
            <Flex alignItems="center">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=qpcecRYRupg"
                  width="350px"
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
          <ModalBody mt="50px">
            <Flex alignItems="center">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=_wDK3yVYC7Y"
                  width="350px"
                  height="195px"
                />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Flex>
    
  );
};

