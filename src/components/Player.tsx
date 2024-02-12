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
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import dynamic from 'next/dynamic'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { pxToRem } from '../utils/pxToRem'
import { useTranslation } from 'react-i18next';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export const Player = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  return (
    <Flex
      w='100%'
      alignItems='center'
      justifyContent='center'
      p={['100px 20px', '100px 20px', '100px 20px', '100px 20px', '100px 0']}
    >
      {!isMobile && (
        <Box w='100%' maxW={pxToRem(700)} mr='40px'>
          <ReactPlayer url='https://www.youtube.com/watch?v=5DhUQmYV49o&t=102s' height={pxToRem(533)} width='100%' />
        </Box>
      )}
      <Grid maxW={pxToRem(359)} templateRows='1fr 0.73fr 1fr'>
        <Heading as={'h3'} className='text-white player-titulo' mb={[0, 0]}>
          {t('titulo-video-home')}
        </Heading>
        <Text className='player-descricao' mb={'15px'} mt={'-30%'} textAlign={'justify'}>
          {t('descricao-video-home')}
        </Text>
        {isMobile ? (
          <VStack spacing={pxToRem(20)} alignItems='center'>
            <Button
              w='179px'
              h='50px'
              borderRadius='25px'
              bg='red.600'
              fontSize={pxToRem(20)}
              _hover={{ transition: 'all 0.5s' }}
              onClick={onOpen}
            >
              <Icon as={AiOutlinePlayCircle} mr='10px' />
              Vídeo 1
            </Button>
            <Button
              w='179px'
              h='50px'
              borderRadius='25px'
              bg='red.600'
              fontSize={pxToRem(20)}
              _hover={{ transition: 'all 0.5s' }}
              onClick={onOpen2}
            >
              <Icon as={AiOutlinePlayCircle} mr='10px' />
              Vídeo 2
            </Button>
          </VStack>
        ) : (
          <Box w='100%' maxW='359px' h='195px'>
            <ReactPlayer url='https://www.youtube.com/watch?v=qpcecRYRupg' width='300px' height='195px' />
          </Box>
        )}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color='red' />
          <ModalBody mt='50px'>
            <Flex alignItems='center'>
              <ReactPlayer url='https://www.youtube.com/watch?v=5DhUQmYV49o&t=102s' width='350px' height='195px' />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color='red' />
          <ModalBody mt='50px'>
            <Flex alignItems='center'>
              <ReactPlayer url='https://www.youtube.com/watch?v=qpcecRYRupg' width='350px' height='195px' />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
