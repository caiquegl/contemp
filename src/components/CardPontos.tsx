import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react'
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc';

import { HiOutlineVideoCamera } from 'react-icons/hi';
import { TbPhotoSensor3, TbAlignBoxLeftTop, TbPlusMinus } from 'react-icons/tb';
import { BsFiletypePdf } from 'react-icons/bs';
import { IoIosFlash } from "react-icons/io";
import { api } from '../lib/axios'


interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  const handleButtonClick = () => {
    window.open(href, '_blank');
  };

  return (
    <Box
      maxW={{ base: 'full', md: '290px' }}
      w={'full'}
      borderWidth="2px"
      borderRadius="8px"
      overflow="hidden"
      p={5}

    >
      <Stack align={'start'} spacing={2}>
        <Flex verticalAlign={'middle'}>
          <Flex
            align={'center'}
            justify={'center'}
            color={'var(--black-primary)'}
            rounded={'8px'}
            mr={'4%'}
            verticalAlign={'middle'}
            bg={useColorModeValue('var(--white-primary)', 'gray.700')}
            p={['2%', '3%']}
          >
            {icon}
          </Flex>
          <Box ml={2}>
            <Box>
              <Heading as={'h3'} className="pontos-titulo text-white">
                {heading}
              </Heading>
            </Box>
          </Box>
        </Flex>
        <Box>
          <Text mt={1} className="paragrafo-branco" mb={1} lineHeight={'1rem'}>
            {description}
          </Text>
          <Button
            variant={'link'}
            color={'var(--red-primary)'}
            className="negrito"
            size={'sm'}
            onClick={handleButtonClick}
            textDecoration={'none !important'}
            mt={'2%'}
          >
            Acessar
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default function gridListWith() {
  const [cards, setCards] = useState<any>([])

  const getCards = async () => {
    const { data } = await api.post('getAllCards', {
      is_active: true
    });
    setCards(data.sort((a: any, b: any) => a.order - b.order));
  };

  useEffect(() => {
    getCards()
  }, [])
  return (
    <Box p={4}>
      <Container maxW={'1240px'} mt={'2%'} p={'0'}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {cards && cards.length > 0 && cards.map((item: any) => (
            <Card
              heading={item.title}
              icon={<Image src={item.icon} w={6} h={6} />}
              description={item.description}
              href={item.redirect}
            />
          ))}


        </Flex>
      </Container>
    </Box>
  );
}
