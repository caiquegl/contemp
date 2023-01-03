import {
  Box,
  BoxProps,
  Container,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import LogoImage from '../assets/icons/Logo-Contemp.svg'
import ImageNext from 'next/image'
import { useAuth } from '../contextAuth/authContext'
import { SearchBar } from './SearchBar'
import { pxToRem } from '../utils/pxToRem'
import { HeaderMenu } from './HeaderMenu'
import { useRouter } from 'next/router'
import { FiAlertTriangle } from 'react-icons/fi'
import { setContextMenuFalse } from '../utils/setContextMenuFalse'

import {
  AllProductsButton,
  CartBag,
  ContactAndSocialMediaHeader,
  ContempLinks,
  SidebarDrawer
} from './HeaderComponents'

export const HeaderCopy = () => {
  const { setListHeader, cart, totalCart, allCategoryActive } = useAuth()
  const [list, setList] = useState([])
  const { isOpen: open, onOpen: oOpen, onClose: oClose } = useDisclosure()
  const [scrollY, setScrollY] = useState(0)

  const isDrawerSiderbar = useBreakpointValue({
    base: true,
    lg: false
  })

  const listCategory = async () => {
    try {
      let categories: any = allCategoryActive.filter(
        (el: any) => el.is_main === 'true'
      )
      let newList: any = []

      for await (let categ of categories) {
        let list_sub_category: any = []

        allCategoryActive.forEach((el: any) => {
          if (el.sub_categorie === categ.id)
            list_sub_category.push({ ...el, id: el.id })
        })

        let filter: any = []

        list_sub_category.forEach((el: any) => {
          let list_sub_category2: any = []

          allCategoryActive.forEach((c: any) => {
            if (c.sub_categorie === el.id)
              list_sub_category2.push({ ...c, id: c.id })
          })
          filter.push({ ...el, list_sub_category: list_sub_category2 })
        })

        newList.push({
          ...categ,
          id: categ.id,
          list_sub_category: filter
        })
      }
      setList(newList)
      setListHeader(newList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (allCategoryActive.length > 0) listCategory()
  }, [allCategoryActive])

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)

      setScrollY(window.scrollY)
    }

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isDrawerSiderbar) {
    return (
      <>
        <SidebarDrawer totalCart={totalCart} cart={cart} menuItems={list} />
        <NoProductWarningModal isOpen={open} onClose={oClose} />
      </>
    )
  }

  const scrollYIsGreaterThan100 = scrollY >= 100

  // if (scrollYIsGreaterThan100) {
  //   return (
  //     <Box h="250px">
  //       <Box
  //         display="flex"
  //         alignItems="center"
  //         position="fixed"
  //         top="0"
  //         w="100%"
  //         h="70px"
  //         bg="black.800"
  //         zIndex={999}
  //         transition="all 3s"
  //       >
  //         <Container maxW="7xl" p="12px 15px 15px 15px">
  //           <Flex alignItems="center" justifyContent="space-between" h={70}>
  //             <Logo />

  //             <AllProductsButton />

  //             <HeaderMenu menuItems={list} />

  //             <CartBag cart={cart} totalCart={totalCart} onOpen={oOpen} />
  //           </Flex>

  //           <NoProductWarningModal isOpen={open} onClose={oClose} />
  //         </Container>
  //       </Box>
  //     </Box>
  //   )
  // }

  const defaultTransition = 'height 3s ease-out'

  return (
    <>
      <Flex
        width="100%"
        position="sticky"
        top="0"
        h={'auto'}
        zIndex={999}
        p="12px 15px"
        bg="black.800"
      >
        <Container maxW="7xl" w="100%" margin="auto">
          <ContactAndSocialMediaHeader
            opacity={scrollYIsGreaterThan100 ? 0 : 1}
            w={scrollYIsGreaterThan100 ? 0 : '100%'}
            // h={scrollYIsGreaterThan100 ? 0 : 'auto'}
            transition={defaultTransition}
            margin={scrollYIsGreaterThan100 ? 0 : 'auto'}
          />

          <Flex
            alignItems="center"
            justifyContent="space-between"
            h={70}
            mb="0px"
          >
            <Logo
              height={scrollYIsGreaterThan100 ? 'max-content' : 41}
              width={scrollYIsGreaterThan100 ? 60 : 'max-content'}
            />

            <AllProductsButton hasLabel={!scrollYIsGreaterThan100} />

            <ContempLinks
              opacity={scrollYIsGreaterThan100 ? 0 : 1}
              w={scrollYIsGreaterThan100 ? 0 : '100%'}
              transition={defaultTransition}
            />

            <Flex alignItems="center">
              <SearchBar
                containerProps={{
                  w: scrollYIsGreaterThan100 ? 0 : pxToRem(191),
                  h: pxToRem(42),
                  marginRight: scrollYIsGreaterThan100 ? 0 : 5,
                  opacity: scrollYIsGreaterThan100 ? 0 : 1,
                  transition: defaultTransition
                }}
              />

              <CartBag cart={cart} totalCart={totalCart} onOpen={oOpen} />
            </Flex>
          </Flex>

          <HeaderMenu
            menuItems={list}
            style={{
              opacity: scrollYIsGreaterThan100 ? 0 : 1,
              height: scrollYIsGreaterThan100 ? 0 : 'initial',
              width: scrollYIsGreaterThan100 ? 0 : '100%',
              transition: defaultTransition,

            }}
          />

          <NoProductWarningModal isOpen={open} onClose={oClose} />
        </Container>
      </Flex>
      {scrollYIsGreaterThan100 &&
        <Box h="250px"
        >
          <Box
            display="flex"
            alignItems="center"
            position="fixed"
            top="0"
            w="100%"
            h="70px"
            bg="black.800"
            zIndex={999}
            transition="all 3s"
          >
            <Container maxW="7xl" p="12px 15px 15px 15px">
              <Flex alignItems="center" justifyContent="space-between" h={70}>
                <Logo />

                <AllProductsButton />

                <HeaderMenu menuItems={list} />

                <CartBag cart={cart} totalCart={totalCart} onOpen={oOpen} />
              </Flex>

              <NoProductWarningModal isOpen={open} onClose={oClose} />
            </Container>
          </Box>
        </Box>
      }
    </>

  )
}

function Logo({ ...props }: BoxProps) {
  const router = useRouter()

  return (
    <Box
      onClick={() => router.push('/')}
      cursor="pointer"
      height={41}
      mr="20px"
      {...props}
    >
      <ImageNext
        width={160}
        height={41}
        src={LogoImage}
        onContextMenu={setContextMenuFalse}
      />
    </Box>
  )
}

type NoProductWarningModalProps = {
  isOpen: boolean
  onClose(): void
}

function NoProductWarningModal({
  isOpen,
  onClose
}: NoProductWarningModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="red" />
        <ModalBody p="20px" mt="20px">
          <Flex alignItems="center">
            <Flex
              mr="20px"
              alignItems="center"
              justifyContent="center"
              h="60px"
              w="60px"
              borderRadius="30px"
              bg="red.100"
            >
              <Icon as={FiAlertTriangle} color="red.700" fontSize="30px" />
            </Flex>
            <Box>
              <Text fontWeight="bold" fontSize="25px" color="black.800">
                Atenção!
              </Text>
              <Text fontSize="16px" color="black.800" mt="10px" maxW="350px">
                Para poder continuar, é necessário adicionar ao menos um produto
                no carrinho.
              </Text>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
