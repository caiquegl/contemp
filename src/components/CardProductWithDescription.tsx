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
  ocultBottom?: boolean
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
  ocultBottom
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
      h={pxToRem(ocultBottom ? 600 : 340)}
      onMouseOver={handleIsHovering}
      onMouseOut={handleIsHovering}
      {...containerProps}
      className='card-produto'
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
        {/*IMAGEM DO PRODUTO*/}
        <Image
          src={img ? img : DefaultImg}
          alt={alt}
          gridRow={1}
          bgSize='contain'
          className='imagem-produto-categoria'
        />
        
        {/*TÍTULO DO PRODUTO*/}
        <Tooltip label={text} placement='top'>
          <Text
            gridRow={2}
            className='titulo-produto-categoria'
          >
            {text}
          </Text>
        </Tooltip>
        <Text gridRow={3} className='chamada-produto-categoria d-none'>
          {call_product &&
            call_product.split('').length > 0 &&
            call_product
              .split('')
              .map((el: any, index: number) => <Fragment key={index}>{index < 100 ? el : ''}</Fragment>)}
          {call_product && call_product.split('').length > 100 ? '...' : ''}
        </Text>
        {ocultBottom ? null :
          <Link
            href={`/produto/${replaceNameToUrl(text).replaceAll(' ', '_')}`}
            _hover={{ textDecoration: 'none', color: bg ? hoverColor[bg] : 'white' }}
            className='d-none'
          >
            <Button
              w={pxToRem(243)}
              h={pxToRem(50)}
              gridRow={4}
              margin='auto'
              borderColor={buttomBottom ? buttomBottom : 'transparent'}
              borderWidth={buttomBottom ? '2px' : '0'}
              className='botao-vermelho redondo d-none'
            >
              Solicitar orçamento
            </Button>
          </Link>
        }
      </Link>
    </Grid>
  )
}

export default CardProductWithDescription
