import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  IconButton,
  useBreakpointValue,
  Stack,
  Button,
  Heading,
} from '@chakra-ui/react'
import { Image } from './Image'
import React, { useEffect, useState } from 'react'
import Team from '../assets/images/temnacontemp.png'
import { Typewriter } from 'react-simple-typewriter'
import { pxToRem } from '../utils/pxToRem'
import { SearchBar } from './SearchBar'
import { useWindowSize } from '../utils/useWindowSize'
import BGFavorite from '../assets/banners/Banner2.png'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
// Here we have used react-icons package for the icons
import Slider from 'react-slick'
// And react-slick as our Carousel Lib
// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export function Banner() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null)

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '40px' })

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards: any = [
    {
      subtitle: '',
      title: '',
      text: '',
      image: 'https://contemp.com.br/api/arquivos/bannercontemp.webp',
      links: '#',
    },
  ]

  return (
    <Box
      position={'relative'}
      height={['450px']}
      width={'full'}
      overflow={'hidden'}
      display={['none', 'block']}
      zIndex={2}
    >
      {/* CSS files for react-slick */}
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
      />
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
      />
      {/* Left Icon */}
      <IconButton
        aria-label='left-arrow'
        variant='ghost'
        position='absolute'
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size='40px' />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label='right-arrow'
        variant='ghost'
        position='absolute'
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size='40px' />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card: any, index: any) => (
          <Box
            key={index}
            position='relative'
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundImage={`url(${card.image})`}
          >
            <Link href={`${card.links}`} isExternal>
              {/* This is the block you need to change, to customize the caption */}
              <Container height={['450px']} position='relative'>
                <Stack
                  spacing={5}
                  w={'full'}
                  maxW={'1240px'}
                  position='absolute'
                  top='50%'
                  transform='translate(0, -50%)'
                >
                  <Heading as={'h3'} className='bannerhome-subtitulo negrito text-white centro'>
                    {card.subtitle}
                  </Heading>
                  <Heading as={'h2'} className='bannerhome-titulo negrito text-white centro'>
                    {card.title}
                  </Heading>
                  <Text fontSize={{ base: 'md', lg: 'lg' }} className='bannerhome-descricao text-white centro'>
                    {card.text}
                  </Text>
                </Stack>
              </Container>
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}
