import React from 'react'
import { Box, Flex, FlexProps, HStack, Link, Text } from '@chakra-ui/react'
import { Image } from '../Image'
import Phone from '../../assets/icons/phone.svg'
import Email from '../../assets/icons/envelope.svg'
import Linkedin from '../../assets/icons/linkedin.svg'
import Instagram from '../../assets/icons/instagram.svg'
import Facebook from '../../assets/icons/facebook-f.svg'
import Youtube from '../../assets/icons/youtube.svg'
import { pxToRem } from '../../utils/pxToRem'

export function ContactAndSocialMediaHeader({ ...props }: FlexProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-evenly"
      marginBottom="22px"
      {...props}
    >
      <Box display="flex" flex={1}>
        <Link
          href="tel:1142235140"
          _hover={{ textDecoration: 'none', color: '#fff' }}
        >
          <Flex alignItems="center" w="max-content" mr={3}>
            <Image src={Phone} minWidth={5} minHeight={15} bgSize={20} />
            <Text fontSize="18px" color="white" ml={pxToRem(10)}>
              (11) 4223-5140
            </Text>
          </Flex>
        </Link>
        <Link
          href="mailto:vendas@contemp.com.br"
          _hover={{ textDecoration: 'none', color: '#fff' }}
        >
          <Flex alignItems="center">
            <Image src={Email} width={20} minHeight={15} flex={0.3} />
            <Text fontSize="18px" color="white" ml={pxToRem(10)}>
              vendas@contemp.com.br
            </Text>
          </Flex>
        </Link>
      </Box>

      <HStack spacing="20px">
        <Link href="https://www.linkedin.com/company/contemp/" isExternal>
          <Box
            w="28px"
            h="28px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Linkedin} width={20} height={20} />
          </Box>
        </Link>
        <Link
          href="https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ"
          isExternal
        >
          <Box
            w="28px"
            h="28px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Youtube} width={20} height={20} />
          </Box>
        </Link>
        <Link href="https://www.instagram.com/contemp.industria/" isExternal>
          <Box
            w="28px"
            h="28px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Instagram} width={20} height={20} />
          </Box>
        </Link>
        <Link
          href="https://www.facebook.com/Contemp-1001000803330302/"
          isExternal
        >
          <Box
            w="28px"
            h="28px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Facebook} width={20} height={20} />
          </Box>
        </Link>
      </HStack>
    </Flex>
  )
}
