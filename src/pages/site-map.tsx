import { Container, Box, Grid, GridItem, Link, Text, Heading } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const EXTERNAL_DATA_URL = 'https://www.contemp.com.br/api/get-sitemap';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
      .map(({ loc }) => {
        return `
       <url>
           <loc>${`${loc}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

const SiteMapContainer = ({ data }) => {
  const sitemap = data ? generateSiteMap(data) : null;

  return (
    <>
      <Head>
        <meta
          name='description'
          content='Procurando medição e controle de temperatura em processos industriais? A Contemp é pioneira no Brasil. Confira!'
        />
        <meta name='keywords' content='controle de temperatura, Contemp, processos industriais, sitemap' />
        <title>Sitemap da Contemp</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Header />
      <Box bg='var(--black-primary)' w='100%' py='20px'>
        <Container maxW='1240px' p='0'>
          <Heading as='h2' className='sitemap-titulo negrito centro text-white' textTransform={'uppercase'} mt='8' mb='4'>
            Sitemap da Contemp
          </Heading>
        </Container>
      </Box>
      <Box bg='white' w='100%' py='20px'>
        <Container maxW='1240px' p='3% 0%'>
          {data && data.length > 0 && (
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']} gap={2}>
              {data.map((el, index) => (
                <GridItem key={index} backgroundColor='white' borderRadius='md' overflow='hidden'>
                  <Link href={el.loc} _hover={{ color: 'var(--red-primary)', textDecoration: 'none' }}>
                    <Text className='paragrafo-preto negrito text-black' mb='1%' cursor='pointer' p='0%' _hover={{ color: 'var(--red-primary)'}}>
                      {el.loc}
                    </Text>
                  </Link>
                </GridItem>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const { data } = await axios.get('https://www.contemp.com.br/api/get-sitemap');

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default SiteMapContainer;
