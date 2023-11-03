import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Text,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import Logo from '../../assets/icons/Logo-Contemp.svg'
import ImageNext, { ImageProps } from 'next/image'
import { BsBag, BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram
} from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { pxToRem } from '../../utils/pxToRem'
import { HeaderMenuVertical } from '../HeaderMenu'
import { setContextMenuFalse } from '../../utils/setContextMenuFalse'

export type SidebarDrawerProps = {
  totalCart: number
  cart: any[]
  menuItems: any[]
}

export function SidebarDrawer({
  totalCart,
  cart,
  menuItems
}: SidebarDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      h={pxToRem(70)}
      padding={`0 ${pxToRem(10)}`}
      maxWidth={'inherit'}
      margin={0}
    >
      <Link href="/">
        <NextImageMenuFalse src={Logo} width={160} />
      </Link>

      <HStack spacing="27px">
        <Box
          position="relative"
          cursor="pointer"
          onClick={() => {
            if (totalCart === 0 && !totalCart) {
              onOpen()
              return
            }
            router.push('/orcamento')
          }}
        >
          {cart && cart.length > 0 && (
            <Flex
              p={`${pxToRem(2)} ${pxToRem(5)}`}
              bg="red.600"
              borderRadius={50}
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize={pxToRem(14)}
              position="absolute"
              bottom={4}
              left={4}
            >
              {totalCart}
            </Flex>
          )}
          <Icon as={BsBag} w={30} minHeight={30} bgSize={30} flex={1} />
        </Box>

        <Flex
          borderRadius="5px"
          w="40px"
          h="40px"
          alignItems="center"
          justifyContent="center"
          bg="red.600"
          color="white"
          cursor="pointer"
          onClick={onOpen}
          _hover={{
            transition: 'all 0.4s',
            opacity: 0.6
          }}
        >
          <Icon as={BsThreeDotsVertical} fontSize="20px" />
        </Flex>
      </HStack>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg="black.900" p="12px">
          <DrawerHeader>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Link href="/">
                <NextImageMenuFalse src={Logo} width={160} />
              </Link>
              <Flex
                borderRadius="5px"
                w="40px"
                h="40px"
                alignItems="center"
                justifyContent="center"
                bg="red.600"
                color="white"
                cursor="pointer"
                onClick={onClose}
                _hover={{
                  transition: 'all 0.4s',
                  opacity: 0.6
                }}
              >
                <Icon as={AiOutlineClose} fontSize="20px" />
              </Flex>
            </Flex>
            <Divider bg="white" mt="10px" />
          </DrawerHeader>

          <DrawerBody>
            <Box mb="60px">
              <HeaderMenuVertical menuItems={menuItems} onClose={() => onClose()} />
            </Box>
            <Box>
              <Text m="22px 0" fontSize="20px" fontWeight="bold">
                Institucional
              </Text>
              <Link href="/a-contemp">
                <Text mb="15px" fontSize="18px">
                  A Contemp
                </Text>
              </Link>
              <Link href='https://blog.contemp.com.br'>
                <Text mb='15px' fontSize='18px' >
                  Blog
                </Text>
              </Link>
              <Link href="/suporte-tecnico">
                <Text mb="15px" fontSize="18px">
                  Suporte Técnico
                </Text>
              </Link>
              <Link href="/trabalhe-conosco">
                <Text mb="15px" fontSize="18px">
                  Trabalhe Conosco
                </Text>
              </Link>
              <Link href="/calibracao">
                <Text mb="15px" fontSize="18px">
                  Calibração
                </Text>
              </Link>
              <Link href="https://blog.contemp.com.br/politica-de-privacidade/">
                <Text mb="15px" fontSize="18px">
                  Política de Privacidade
                </Text>
              </Link>
            </Box>
          </DrawerBody>

          <DrawerFooter w="100%">
            <Grid
              templateColumns="repeat(4, 1fr)"
              w="100%"
              maxW={pxToRem(260)}
              margin="auto"
              gridColumnGap={pxToRem(10)}
            >
              <Link href="https://www.linkedin.com/company/contemp/" isExternal>
                <CustomIcon icon={AiFillLinkedin} />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ"
                isExternal
              >
                <CustomIcon icon={AiFillYoutube} />
              </Link>
              <Link
                href="https://www.instagram.com/contemp.industria/"
                isExternal
              >
                <CustomIcon icon={AiOutlineInstagram} />
              </Link>
              <Link
                href="https://www.facebook.com/Contemp-1001000803330302/"
                isExternal
              >
                <CustomIcon icon={FaFacebookF} />
              </Link>
            </Grid>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

function NextImageMenuFalse(props: ImageProps) {
  return <ImageNext {...props} onContextMenu={setContextMenuFalse} />
}

function CustomIcon({ icon }: any) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      w={pxToRem(50)}
      h={pxToRem(50)}
      borderRadius="full"
      bg="white.500"
    >
      <Icon as={icon} fontSize={pxToRem(35)} color="black.200" />
    </Flex>
  )
}
