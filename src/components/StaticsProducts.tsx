import React, { ReactNode } from 'react';
import {
    Box,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { BiSolidBox } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;

    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'3'}
            boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'}
            backgroundColor={'var(white-primary)'}
            rounded={'8px'}
            mt={'-10%'}
        >
            <Flex alignItems="center" justifyContent={'space-between'}>
                <Box>
                    <Flex alignItems="center">
                        <Box as="span" fontSize="1rem" p={'10%'} backgroundColor={'var(--red-primary)'} borderRadius={'8px'} color="var(--white-primary)" fontWeight={'bold'} mr={2} display="flex" alignItems="center">
                            {icon}
                        </Box>
                        <Box>
                            <StatLabel mb={'-3%'} className='titulo-produto-individual negrito'>
                                {title}
                            </StatLabel>
                            <StatNumber mt={'0%'} className='text-red negrito' fontSize={'1.5rem'}>
                                {stat}
                            </StatNumber>
                        </Box>
                    </Flex>

                </Box>
            </Flex>
        </Stat>
    );
}

interface StaticsProductsProps {
    quantidadeProdutos: number;
    quantidadeProdutosDestaque: number;
}

export default function StaticsProducts({ quantidadeProdutos, quantidadeProdutosDestaque }: StaticsProductsProps) {
    return (
        <Box maxW="5xl" mb={'2%'}>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard title={'Produtos'} stat={quantidadeProdutos.toString()} icon={<BiSolidBox />} />
                <StatsCard
                    title={'Destaques'}
                    stat={typeof quantidadeProdutosDestaque === 'number' ? quantidadeProdutosDestaque.toString() : ''}
                    icon={<FaStar />}
                />

            </SimpleGrid>
        </Box>
    );
}
