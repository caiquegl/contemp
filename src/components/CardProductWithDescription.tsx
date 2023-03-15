import { Button, Grid, GridProps, Link, Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { pxToRem } from '../utils/pxToRem'
import { Image } from './Image'
import DefaultImg from '../assets/images/image-default.webp'
import { v4 as uuidv4 } from 'uuid'
import { replaceNameToUrl } from '../utils/replaceNameToUrl'

interface IProps {
  img: string
  text: string
  description?: string
  call_product?: string
  alt?: string
  color?: string
  bg?: string
  buttomBottom?: string
  containerProps?: GridProps
}

const CardProductWithDescription = ({
  bg,
  img,
  text,
  alt,
  description,
  call_product,
  color,
  buttomBottom,
  containerProps,
}: IProps) => {
  const router = useRouter()
  const [_, setIsHovering] = useState(false)

  const handleIsHovering = () => setIsHovering((isHovering) => !isHovering)
  const hoverBg: any = {
    'red.600': 'white',
    white: 'black.800',
    'white.500': 'black.800',
    'black.800': 'white',
  }

  const hoverColor: any = {
    'red.600': 'black.800',
    white: 'white',
    'white.500': 'white',
    'black.800': 'black.800',
  }
  return (
    <Grid
      // alignItems='center'
      // gridTemplateRows='max-content 0.7fr 2fr 0.5fr'
      // justifyContent='space-between'
      // rowGap={pxToRem(10)}
      borderRadius='8px'
      cursor='pointer'
      maxW={pxToRem(350)}
      w='100%'
      h={pxToRem(800)}
      mt='20px'
      onMouseOver={handleIsHovering}
      onMouseOut={handleIsHovering}
      border='2px solid'
      borderColor='transparent'
      p='20px'
      _hover={{
        border: '2px solid',
        borderColor: color ?? 'black.800',
      }}
      padding={`${pxToRem(25)} ${pxToRem(20)}`}
      {...containerProps}
    >
      <Link
        href={`/produto/${replaceNameToUrl(text).replaceAll(' ', '_')}`}
        _hover={{ color: 'white', textDecoration: 'none' }}
        display='flex'
        flexDirection='column'
        h='100%'
        alignItems='center'
        justifyContent='space-between'
      >
        <Tooltip label={text} placement='top'>
          <Text
            fontSize={'2.25rem'}
            fontWeight='bold'
            color={color ? color : 'black'}
            textTransform='uppercase'
            width='100%'
            lineHeight='2.7rem'
            gridRow={1}
          >
            {text}
          </Text>
        </Tooltip>
        <Text w='100%' textAlign='left' fontSize={pxToRem(20)} color={color ? color : 'black'} gridRow={2}>
          {call_product &&
            call_product.split('').length > 0 &&
            call_product
              .split('')
              .map((el: any, index: number) => <Fragment key={uuidv4()}>{index < 100 ? el : ''}</Fragment>)}
          {call_product && call_product.split('').length > 100 ? '...' : ''}
        </Text>
        <Image
          src={img ? img : DefaultImg}
          alt={alt}
          h={{
            base: pxToRem(260),
            xl: pxToRem(280),
          }}
          gridRow={3}
          bgSize='contain'
        />
        <Link
          href={`/produto/${replaceNameToUrl(text).replaceAll(' ', '_')}`}
          _hover={{ textDecoration: 'none', color: bg ? hoverColor[bg] : 'white' }}
        >
          <Button
            w={pxToRem(243)}
            h={pxToRem(50)}
            gridRow={4}
            borderRadius='25px'
            margin='auto'
            bg='red.600'
            fontSize={pxToRem(20)}
            borderColor={buttomBottom ? buttomBottom : 'transparent'}
            borderWidth={buttomBottom ? '2px' : '0'}
            _hover={{
              bg: bg ? hoverBg[bg] : 'black.800',
              color: bg ? hoverColor[bg] : 'white',
            }}
          >
            Solicitar orçamento
          </Button>
        </Link>
      </Link>
    </Grid>
  )
}

export default CardProductWithDescription
