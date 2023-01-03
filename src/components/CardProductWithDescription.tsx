import { Button, Grid, GridProps, Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { pxToRem } from '../utils/pxToRem'
import { Image } from './Image'
import DefaultImg from '../assets/images/image-default.webp'

interface IProps {
  img: string
  text: string
  description?: string
  alt?: string
  color?: string
  buttomBottom?: string
  containerProps?: GridProps
}

const CardProductWithDescription = ({
  img,
  text,
  alt,
  description,
  color,
  buttomBottom,
  containerProps
}: IProps) => {
  const router = useRouter()
  const [_, setIsHovering] = useState(false)

  const handleIsHovering = () => setIsHovering((isHovering) => !isHovering)

  return (
    <Grid
      alignItems="center"
      gridTemplateRows="max-content 0.7fr 2fr 0.5fr"
      rowGap={pxToRem(10)}
      borderRadius="8px"
      cursor="pointer"
      onClick={() => router.push(`/produto/${text.replaceAll(' ', '_')}`)}
      maxW={pxToRem(350)}
      w="100%"
      h={pxToRem(700)}
      mt="20px"
      onMouseOver={handleIsHovering}
      onMouseOut={handleIsHovering}
      border="2px solid"
      borderColor="transparent"
      p="20px"
      _hover={{
        border: '2px solid',
        borderColor: color ?? 'black.800'
      }}
      padding={`${pxToRem(25)} ${pxToRem(20)}`}
      {...containerProps}
    >
      <Tooltip label={text} placement="top">
        <Text
          fontSize={'2.5rem'}
          fontWeight="bold"
          color={color ? color : 'black'}
          textTransform="uppercase"
          width="100%"
          lineHeight="2.7rem"
          gridRow={1}
        >
          {text}
        </Text>
      </Tooltip>
      {/* <TextAntd
        style={{ fontSize: 20, marginBottom: 20, color: '#000' }}
        ellipsis={{ tooltip: description }}
      >
        {description}
      </TextAntd> */}
      <Text fontSize={pxToRem(20)} color={color ? color : 'black'} gridRow={2}>
        {description &&
          description.split('').length > 0 &&
          description
            .split('')
            .map((el: any, index: number) => <>{index < 100 ? el : ''}</>)}
        {description && description.split('').length > 100 ? '...' : ''}
      </Text>
      {img ?
        <Image
          uri={img}
          alt={alt}
          wImg={260}
          hImg={260}
          h={{
            base: pxToRem(260),
            xl: pxToRem(280)
          }}
          gridRow={3}
          bgSize="contain"
        />
        :
        <Image
          src={DefaultImg}
          alt={alt}
          wImg={260}
          hImg={260}
          h={{
            base: pxToRem(260),
            xl: pxToRem(280)
          }}
          gridRow={3}
          bgSize="contain"
        />
      }

      <Button
        w={pxToRem(243)}
        h={pxToRem(50)}
        gridRow={4}
        borderRadius="25px"
        margin="auto"
        bg="red.600"
        fontSize={pxToRem(20)}
        borderColor={buttomBottom ? buttomBottom : 'transparent'}
        borderWidth={buttomBottom ? '2px' : '0'}
        _hover={{ transition: 'all 0.5s', opacity: 0.7 }}
        onClick={() => router.push(`/produto/${text.replaceAll(' ', '_')}`)}
      >
        Solicitar orçamento
      </Button>
    </Grid>
  )
}

export default CardProductWithDescription
