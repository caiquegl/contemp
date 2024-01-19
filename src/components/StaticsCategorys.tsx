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
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { MdReportOff, MdOutlineUpdate, MdAccessTimeFilled } from "react-icons/md";

interface StatsCardCategorysProps {
    title: string;
    stat: string;
    icon: ReactNode;
}

function StatsCard(props: StatsCardCategorysProps) {
    const { title, stat, icon } = props;

    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'3'}
            boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'}
            backgroundColor={'white'}
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
                            <StatLabel mb={'-3%'} className='text-black negrito' fontSize={'1.15rem'} textTransform={'uppercase'} lineHeight={'1.15rem'} >
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

interface StaticsCategorysProps {
    quantidadeCategorias: number;
    quantidadeCategoriasDestaque: number;
    quantidadeCategoriasDesativadas: number;
    quantidadeCategoriasAno: number;
    quantidadeAtualizadasAno: number;
}

export default function StaticsCategorys({ quantidadeCategorias, quantidadeCategoriasDestaque, quantidadeCategoriasDesativadas, quantidadeCategoriasAno, quantidadeAtualizadasAno }: StaticsCategorysProps) {
    return (
        <Box maxW="8xl" mb={'2%'}>
            <SimpleGrid columns={{ base: 1, md: 4, lg: 5 }} spacing={{ base: 7, md: 4, lg: 6 }}>
                <StatsCard title={'Categorias'} stat={quantidadeCategorias.toString()} icon={<BiSolidBox />} />
                <StatsCard title={'Favoritas'} stat={quantidadeCategoriasDestaque.toString()} icon={<FaStar />} />
                <StatsCard title={'Desativadas'} stat={quantidadeCategoriasDesativadas.toString()} icon={<MdReportOff />}/>
                <StatsCard title={'Adicionadas'} stat={quantidadeCategoriasAno.toString()} icon={<FaCalendarAlt />} />
                <StatsCard title={'Atualizadas'} stat={quantidadeAtualizadasAno.toString()} icon={<MdAccessTimeFilled />} />

            </SimpleGrid>
        </Box>
    );
}
