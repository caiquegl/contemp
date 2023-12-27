import React from 'react'
import { Box, Button, Flex, GridItem, Link, Text, useBreakpointValue, Heading } from '@chakra-ui/react'
import { pxToRem } from '../utils/pxToRem'
import splitText from '../utils/splitText'
import Image from 'next/image'

interface IProps {
  bg: string
  color: string
  title: string
  text: string
  img: any
  hrefButton: string
}

export const CardBlog = ({ bg, color, title, text, img, hrefButton }: IProps) => {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  return (
    <Link
      isExternal={true}
      as='a'
      href={hrefButton}
      bg={bg}
      borderRadius='8px'
      minH='350px'
      p={['20px', '20px', '20px', '50px', '50px']}
      alignItems='center'
      justifyContent='space-between'
      display='flex'
      overflow='hidden'
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        w='100%'
        maxW={pxToRem(474)}
        minH={'30rem'}
        borderRadius='8px'
        border='2px solid'
        h={[pxToRem(400), pxToRem(530)]}
        borderColor={color}
        p={[pxToRem(20), pxToRem(20)]}
        display='flex'
        flexDirection={'column'}
        justifyContent='space-between'
      >
        <Box>
          <Box h={['10.625rem', '18.75rem']} w='100%' borderRadius='8px' position='relative'>
            <Image
              src={img}
              alt='Blog da Contemp'
              layout='fill'
              objectFit='cover'
              style={{ borderRadius: 8 }}
              className='borderRadius-8'
            />
          </Box>
          {/* <Image src={img} height={200} width={200}/> */}
          {/* <Image objectFit='cover' h={[pxToRem(170), pxToRem(300)]}  w={['100%']} src={img} borderRadius="8px"/> */}
          <Heading as={'h3'} lineHeight={'1.2rem'} fontWeight='bold' textTransform={'uppercase'} fontSize={'1.15rem'} mt={['5px', '15px']} color={color}>
            {title}
          </Heading>
        </Box>
        {/* <Text fontSize={["14px","18px"]} mt={["5px","15px"]} color={color}>
          <div dangerouslySetInnerHTML={{__html: text}} />
        </Text> */}
        <Link href={hrefButton} _hover={{ textDecoration: 'none' }}>
          <Button
            borderRadius='30px'
            // w="150px"
            width='157px'
            height='50px'
            // h={["40px"]}
            textAlign='center'
            bg='none'
            border='2px solid'
            borderColor={color}
            color={color}
            _hover={{
              bg: color,
              color: bg,
              transition: 'all 0.3s',
            }}
          >
            Ler Conteúdo
          </Button>
        </Link>
      </Box>
    </Link>
  )
}
