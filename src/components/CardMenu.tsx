import { Box, Button, Flex, GridItem, Image, Link, Text, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { pxToRem } from '../utils/pxToRem'
import { v4 as uuidv4 } from 'uuid'
import ImageNext from 'next/image';
import DefaultImg from '../assets/images/image-default.webp'

interface IProps {
  bg: string
  title: string
  color: string
  urlPicture: string
  url: string
}
const CardMenu = ({ bg, url, title, color, urlPicture }: IProps) => {
  const router = useRouter()

  return (
    <GridItem w={'100%'} bg={bg} borderRadius='8px' p='27px 17px' maxW="300px">
      <Link
            href={url}
            textDecoration='none'
            isExternal
            _hover={{
              textDecoration: 'none',
            }}
          >
      <Flex h='100%' justifyContent='space-between' flexDirection='column'>
        <Box>
          <Box mb="20px">
            <ImageNext
              src={urlPicture ? urlPicture : DefaultImg}
              alt="Imagem"
              width={500}
              height={500}
              layout="responsive"
            />
          </Box>
          <Box mb={'1%'}>
            <Heading as={'h3'} className='todososprodutos-subtitulo negrito' textAlign={'center'} color={color}>
              {title}
            </Heading>
          </Box>

        </Box>

        <Flex w='100%' alignItems='center' justifyContent='center' mt='20px'>
          <Link
            href={url}
            textDecoration='none'
            isExternal
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Button
              color={color}
              border='2px solid'
              borderColor={color}
              borderRadius='25px'
              w='100%'
              maxW='243px'
              h='50px'
              bg={bg}
              fontSize='20px'
              _hover={{
                bg: color,
                color: bg,
                transition: 'all 0.3s',
              }}
            >
              Ver manual
            </Button>
          </Link>
        </Flex>
      </Flex>
      </Link>
    </GridItem>
  )
}

export default CardMenu
