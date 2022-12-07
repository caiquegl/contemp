import { Box, VStack, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";
import DefaultImg from '../assets/images/image-default.webp'
import ImageNext from 'next/image'
export const ContainerSearch = ({
  list,
  searchCard,
  click
}: any) => {
  const router = useRouter()
  console.log(searchCard)
  return (
    <Box p="10px" maxH="300px" minW={searchCard ? searchCard : "300px"} maxW={searchCard ? searchCard : "400px"} bg="black.900" position="absolute" top="50px" left={searchCard ? "0" : "-120px"} zIndex="9999999999999999999" borderRadius="10px" borderColor="white" borderWidth="2px" overflowX="auto">
      <VStack spacing="10px" divider={<Divider />}>
        {list && list.length > 0 && list.map((el: any) => (
          <Flex cursor="pointer" _hover={{ opacity: 0.8, transition: 'all 0.4s' }} alignItems="center" justifyContent="flex-start" w="100%" onClick={() => click(el.name)}>
            {el.urls && el.urls.length > 0 ?
              <Image src={el.urls && el.urls.length > 0 ? el.urls[0] : ''} w="60px" h="60px" alt={el.name} />
              :
              <ImageNext src={DefaultImg} width={60} height={60} alt={el.name} />
            }
            <Text
              fontSize="20px"
              fontWeight="bold"
              ml="10px"
            >
              {el.name}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
}