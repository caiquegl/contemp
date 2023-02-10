import React from "react";
import { Box, Button, Flex, GridItem, Link, Text, Image } from "@chakra-ui/react";
import { pxToRem } from "../utils/pxToRem";
import splitText from '../utils/splitText';

interface IProps {
  bg: string;
  color: string;
  title: string;
  text: string;
  img: any;
  hrefButton: string
}

export const CardBlog = ({ bg, color, title, text, img, hrefButton }: IProps) => {
  return (
    <Link
      isExternal={true}
      as="a"
      href={hrefButton}
      bg={bg}
      borderRadius="8px"
      minH="350px"
      p={['20px', '20px', '20px', '50px', '50px']}
      alignItems="center"
      justifyContent="space-between"
      display="flex"
      overflow="hidden"
      _hover={{textDecoration: 'none'}}
    >
      <Box
        w="100%"
        maxW={pxToRem(474)}
        minH={[pxToRem(100), pxToRem(150)]}
        borderRadius="8px"
        border="2px solid"
        h={[pxToRem(400), pxToRem(530)]}
        borderColor={color}
        p={[pxToRem(20), pxToRem(20)]}
        display="flex"
        flexDirection={'column'}
        justifyContent='space-between'

      >
        <Box >
          <Image objectFit='cover' h={[pxToRem(170), pxToRem(300)]}  w={['100%']} src={img}/>
          <Text lineHeight={pxToRem(30)} fontWeight="bold" fontSize={pxToRem(20)} mt={["5px","15px"]} color={color}>
            {title}
          </Text>
        </Box>
        {/* <Text fontSize={["14px","18px"]} mt={["5px","15px"]} color={color}>
          <div dangerouslySetInnerHTML={{__html: text}} />
        </Text> */}
          <Link 
            href={hrefButton}
            _hover={{textDecoration: 'none'}}
            >
            <Button
              borderRadius="30px"
              // w="150px"
              width="157px"
              height="50px"
              // h={["40px"]}
              textAlign="center"
              bg="none"
              border="2px solid"
              borderColor={color}
              color={color}
              _hover={{
                bg: color,
                color: bg,
                transition: "all 0.3s",
              }}
            >
              Veja mais
            </Button>
          </Link>
      </Box>
    </Link>
  );
};
