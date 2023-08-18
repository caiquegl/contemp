import { Box, VStack, Divider, Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import DefaultImg from '../assets/images/image-default.webp'
import ImageNext from 'next/image'
import { setContextMenuFalse } from '../utils/setContextMenuFalse'
import { v4 as uuidv4 } from 'uuid';

export const ContainerSearch = ({ list, searchCard, click }: any) => {
  const router = useRouter()

  return (
    <Box
      p="10px"
      maxH="300px"
      minW={searchCard ? searchCard : '300px'}
      maxW={searchCard ? searchCard : '400px'}
      bg="black.900"
      position="absolute"
      top="50px"
      left={searchCard ? '0' : '-120px'}
      zIndex="999999999999999999999999999999999"
      borderRadius="10px"
      borderColor="white"
      borderWidth="2px"
      overflowX="auto"
    >
      <VStack spacing="10px" divider={<Divider />}>
        {list &&
          list.length > 0 &&
          list.map((el: any) => (
            <Flex
              key={uuidv4()}
              cursor="pointer"
              _hover={{transition: 'all 0.4s' }}
              alignItems="center"
              justifyContent="flex-start"
              w="100%"
              onClick={() => click(el)}
            >
              {el.urls && el.urls.length > 0 ? (
                <Image
                  src={el.urls && el.urls.length > 0 ? el.urls[0] : ''}
                  w="60px"
                  h="60px"
                  alt={el.name}
                  onContextMenu={setContextMenuFalse}
                />
              ) : (
                <ImageNext
                  src={DefaultImg}
                  width={60}
                  height={60}
                  alt={el.name}
                  onContextMenu={setContextMenuFalse}
                />
              )}
              <Text fontSize="20px" fontWeight="bold" ml="10px">
                {el.name}
              </Text>
            </Flex>
          ))}
      </VStack>
    </Box>
  )
}
