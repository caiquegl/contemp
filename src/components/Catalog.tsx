import { Box, Button, ButtonProps, Flex, Grid, Icon, Link, Text, Heading } from '@chakra-ui/react'
import React from 'react'
import { BiPhone } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { FiDownload } from 'react-icons/fi'
import { pxToRem } from '../utils/pxToRem'
import CatalogImg from '../assets/images/catalogo-936x1024.png.webp'
import { Image } from './Image'
import { Row, Col } from 'antd'

export const Catalog = () => {
  return (
    <Box maxW={['1240px', '1240px', '1240px', '1640px']}
      h={{
        base: pxToRem(600),
        md: pxToRem(400),
        lg: pxToRem(450),
        xl: pxToRem(500),
      }}
      p={{
        xl: pxToRem(20),
        lg: pxToRem(10),
        base: pxToRem(20),
      }}
    >
      <Row style={{ height: '100%' }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Link href='https://contemp.com.br/api/arquivos/temnacontemp.pdf' target={'_blank'}>
            <Image
              src={CatalogImg}
              display={{
                base: 'none',
                lg: 'flex',
              }}
              width={{
                base: pxToRem(400),
                lg: pxToRem(500),
                xl: pxToRem(700),
                '2xl': pxToRem(750),
              }}
              height={{
                lg: pxToRem(700),
                xl: pxToRem(680),
                '2xl': pxToRem(700),
              }}
              gridColumn={1}
              bgSize={{
                base: 0,
                lg: '100%',
                xl: 'contain',
              }}
              zIndex={9}
              position='absolute'
              top='-100px'
            />
          </Link>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Flex flexDirection='column' justifyContent='center' h='100%'>
            <Heading as={'h3'} className='brasil-titulo text-white' textAlign={'left'}
              fontWeight='bold' mb={'-3.5%'}
            >
              CATÁLOGO
            </Heading>
            <Text className='catalogo-descricao'
              mt={{
                base: 10,
                lg: 5,
                xl: 10,
              }}
              mb={{
                base: pxToRem(20),
                lg: pxToRem(20),
              }}
              maxW={pxToRem(1000)}
            >
              Quer baixar gratuitamente nosso catalogo digital de produtos? Basta entrar em contato e solicitar para um
              de nossos representantes. Através do número{' '}
              <Link href='tel:551142235140' _hover={{ color: '#fff', textDecoration: 'none' }}>
                (11) 4223-5140
              </Link>{' '}
              ou pelo{' '}
              <Link href='mailto:vendas@contemp.com.br' _hover={{ color: '#fff', textDecoration: 'none' }}>
                {' '}
                e-mail vendas@contemp.com.br
              </Link>
            </Text>

            <Grid
              alignItems='center'
              justifyContent='center'
              w='100%'
              templateColumns={{
                base: 'repeat(auto-fit, minmax(220px, 1fr))',
                xl: 'repeat(auto-fit, minmax(40px, 1fr))',
              }}
              maxW={'36rem'}
              gridGap={6}
            >
              <Link href='tel:1142235140' _hover={{ textDecoration: 'none', color: '#fff' }}>
                <ActionButton
                  label={'Telefonar'}
                  icon={BiPhone}
                  _hover={{
                    bg: 'white',
                    color: 'black.800',
                    transition: 'all 0.4s',
                  }}
                />
              </Link>

              <Link href='mailto:vendas@contemp.com.br' _hover={{ textDecoration: 'none', color: '#fff' }}>
                <ActionButton
                  label={'Enviar e-mail'}
                  icon={AiOutlineMail}
                  _hover={{
                    bg: 'white',
                    color: 'black.800',
                    transition: 'all 0.4s',
                  }}
                />
              </Link>

              <Link
                href='https://contemp.com.br/api/arquivos/temnacontemp.pdf'
                isExternal
                _hover={{ textDecoration: 'none', color: '#fff' }}
                target='_blank'
              >
                <ActionButton
                  label={'Download'}
                  icon={FiDownload}
                  _hover={{
                    bg: 'white',
                    color: 'black.800',
                    transition: 'all 0.4s',
                  }}
                />
              </Link>
            </Grid>
          </Flex>
        </Col>
      </Row>
    </Box>
  )
}

function ActionButton({ label, icon, ...props }: any & ButtonProps) {
  return (
    <Button
      w='100%'
      h='50px'
      bg='red.600'
      _hover={{ transition: 'all 0.5s' }}
      {...props}
    >
      <Icon as={icon} mr='10px' />
      {label}
    </Button>
  )
}
