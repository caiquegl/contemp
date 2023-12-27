import { Flex, Grid, Heading } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { pxToRem } from '../utils/pxToRem'
import CardProductWithDescription3 from './CardProductWithDescription3'

export const ListAllProducts = forwardRef(({ bg, data }: any, ref: any) => {
  // Verifique se data está definido e é um array
  if (!data || !Array.isArray(data)) {
    // Lidar com o caso em que data não é como esperado
    console.error('Data is not as expected:', data);
    return null; // ou renderizar uma queda apropriada
  }

  // Aplanar a lista de produtos
  const allProducts = data.reduce((acc: any, product: any) => {
    acc.push({
      ...product,
      category: product.category?.name || 'Sem Categoria'  // Adapte conforme a estrutura real da categoria
    });
    return acc;
  }, []);

  console.log('All Products:', allProducts);

  return (
    <Flex w='100%' bg={bg} ref={ref}>
      <Grid
        margin={`${pxToRem(8)} 0`}
        templateColumns={['repeat(1, 1fr)', 'repeat(4, 1fr)']}
        columnGap={pxToRem(15)}
        p={{
          xl: '0 10px',
        }}
        w='100%'
      >
        {allProducts.map((product: any, index: any) => {
          console.log('Mapped Product:', product);

          return (
            <CardProductWithDescription3
              key={index}
              img={product.urls && product.urls[0] ? product.urls[0] : ''}
              text={product?.name}
              description={product?.description}
              call_product={product?.call_product}
              category={product?.category}
              color={bg === 'red.600' || bg === 'black.800' ? 'white' : undefined}
              bg={bg}
              buttomBottom={bg === 'red.600' ? 'white' : undefined}
              containerProps={{
                margin: 'auto',
              }}
            />
          );
        })}
      </Grid>
    </Flex>
  );
});
