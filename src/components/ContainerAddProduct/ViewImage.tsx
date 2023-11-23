import { Box, Icon, Image, Heading,IconButton, Flex } from '@chakra-ui/react'
import React from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { setContextMenuFalse } from '../../utils/setContextMenuFalse'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const ViewImage = ({ url, order, remove, moveUp, moveDown }: any) => {
  return (
    <Box border="1px solid" color="var(--black-primary)" borderRadius="8px" p="10px">
      <Icon
        as={AiTwotoneDelete}
        color="var(--red-primary)"
        fontSize="1rem"
        ml="90%"
        cursor="pointer"
        onClick={() => remove()}
      />
      <Image
        boxSize="150px"
        objectFit="cover"
        src={url}
        alt="product"
        onContextMenu={setContextMenuFalse}
      />
      <Box mt="2" textAlign="center">
        <Heading as="h6" className='paragrafo-preto text-black' fontSize={'1rem'} textAlign={'center'} mt={'20%'} mb={'6%'} >
          Ordem: {order}
        </Heading>
        <IconButton aria-label='Search database' icon={<FaAngleLeft />} onClick={() => moveUp()} mr={'12%'} />
        <IconButton aria-label='Search database' icon={<FaAngleRight />} onClick={() => moveDown()} />
      </Box>
    </Box>
  )
}
