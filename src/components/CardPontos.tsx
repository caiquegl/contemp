import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc';

import { HiOutlineDocumentText, HiOutlineVideoCamera } from 'react-icons/hi';
import { FiInstagram, FiFolder } from 'react-icons/fi';
import { TbPhotoSensor3, TbAlignBoxLeftTop } from 'react-icons/tb';
import { BsFiletypePdf } from 'react-icons/bs';


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
      mt={'-5%'}
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
          <Box>
            <Box>
              <Heading as={'h3'} className="pontos-titulo text-white">
                {heading}
              </Heading>
            </Box>
          </Box>
        </Flex>
        <Box>
          <Text mt={1} className="paragrafo-branco" lineHeight={'1rem'}>
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
  return (
    <Box p={4}>
      <Container maxW={'1240px'} mt={'2%'} p={'0'}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Catálogo Contemp 2023'}
            icon={<Icon as={BsFiletypePdf} w={6} h={6} />}
            description={'Baixe o manual acessando o link.'}
            href={'https://contemp.com.br/api/arquivos/temnacontemp.pdf'}
          />
          <Card
            heading={'NOVA CATEGORIA DE SENSORES'}
            icon={<Icon as={TbPhotoSensor3} w={6} h={6} />}
            description={'Acesse e saiba mais detalhes.'}
            href={'/category/SENSORES'}
          />
          <Card
            heading={'Câmeras Termográficas Óptris'}
            icon={<Icon as={HiOutlineVideoCamera} w={6} h={6} />}
            description={'Confira através do link.'}
            href={'https://contemp.com.br/category/câmeras_termográficas_fixas'}
          />
          <Card
            heading={'Controladores de Potência'}
            icon={<Icon as={TbAlignBoxLeftTop} w={6} h={6} />}
            description={'Conheça nossa linha completa.'}
            href={'https://contemp.com.br/category/controladores_de_potência'}
          />
        </Flex>
      </Container>
    </Box>
  );
}
