import { Box, Icon, Image } from '@chakra-ui/react'
import React from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { setContextMenuFalse } from '../../utils/setContextMenuFalse'

export const ViewImage = ({ url, remove }: any) => {
  return (
    <Box border="1px solid" color="black.800" borderRadius="7px" p="10px">
      <Icon
        as={AiTwotoneDelete}
        color="red.600"
        fontSize="20px"
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
    </Box>
  )
}
