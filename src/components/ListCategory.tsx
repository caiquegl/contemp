import { Flex, Grid } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { pxToRem } from '../utils/pxToRem'
import CardProductWithDescription from './CardProductWithDescription'
import { v4 as uuidv4 } from 'uuid';

export const ListCategory = forwardRef(({ bg, data }: any, ref: any) => {
  return (
    <Flex w="100%" bg={bg} ref={ref}>
      <Grid
        margin={`${pxToRem(80)} 0`}
        templateColumns={`repeat(auto-fill, minmax(${pxToRem(320)}, 1fr))`}
        columnGap={pxToRem(30)}
        p={{
          xl: '0 20px'
        }}
        w="100%"
      >
        {data &&
          data.length > 0 &&
          data.map((catg: any) => (
            <CardProductWithDescription
              key={uuidv4()}
              img={catg.urls && catg.urls[0] ? catg.urls[0] : ''}
              text={catg?.name}
              description={catg?.description}
              color={
                bg === 'red.600' || bg === 'black.800' ? 'white' : undefined
              }
              buttomBottom={bg === 'red.600' ? 'white' : undefined}
              containerProps={{
                margin: 'auto'
              }}
            />
          ))}
      </Grid>
    </Flex>
  )
})
