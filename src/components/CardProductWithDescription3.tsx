import { Button, Grid, GridProps, Link, Text, Tooltip, Box, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { pxToRem } from '../utils/pxToRem';
import DefaultImg from '../assets/images/image-default.webp';
import { replaceNameToUrl } from '../utils/replaceNameToUrl';
import Image from 'next/image';

interface IProps {
  img: string;
  text: string;
  description?: string;
  call_product?: string;
  category?: string; // Adicione a propriedade category
  alt?: string;
  color?: string;
  bg?: string;
  buttomBottom?: string;
  containerProps?: GridProps;
  ocultBottom?: boolean;
}

const CardProductWithDescription3 = ({
  bg,
  img,
  text,
  alt,
  description,
  call_product,
  color,
  buttomBottom,
  containerProps,
  ocultBottom,
}: IProps) => {
  const router = useRouter();
  const [_, setIsHovering] = useState(false);

  const handleIsHovering = () => setIsHovering((isHovering) => !isHovering);

  const hoverBg: any = {
    'red.600': 'white',
    white: 'black.800',
    'white.500': 'black.800',
    'black.800': 'white',
  };

  const hoverColor: any = {
    'red.600': 'black.800',
    white: 'white',
    'white.500': 'white',
    'black.800': 'black.800',
  };

  return (
    <Grid
      h={pxToRem(ocultBottom ? 600 : 340)}
      onMouseOver={handleIsHovering}
      onMouseOut={handleIsHovering}
      {...containerProps}
      className='card-produto'
    >
      <Link
        href={`/produto/${replaceNameToUrl(text).toLowerCase().replaceAll(' ', '_')}`}
        _hover={{ color: 'white', textDecoration: 'none' }}
        display='flex'
        flexDirection='column'
        h='100%'
        alignItems='center'
        justifyContent='space-between'
      >
        {/* IMAGEM DO PRODUTO */}
        <Center w='100%' h='100%' flex={1} position="relative">
          <Image
            src={img ? img : DefaultImg}
            loading='lazy'
            quality={100}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            unoptimized={true}
          />
        </Center>

        {/* TÍTULO DO PRODUTO */}
        <Tooltip
          placement="top"
          label={text}
          color={'var(--white-primary)'}
          bg={'var(--red-primary)'}
          borderRadius={'8px'}
          textAlign={'center'}
        >
          <Text gridRow={2} className='h4-preto centro'>
            {text}
          </Text>
        </Tooltip>
      </Link>
    </Grid>
  );
};

export default CardProductWithDescription3;