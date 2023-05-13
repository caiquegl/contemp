import { Box, Button, Icon, Link, } from '@chakra-ui/react'
import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { colors } from '../styles/theme';
import { useRouter } from 'next/router';

interface IProps {
    menuItems: any
}

export const ButtonAllProducts = ({menuItems}: IProps) => {
    const router = useRouter()

    return (
        <Box>
            {/* <Link href='/todosProdutos' _hover={{ color: '#fff', textDecoration: 'none' }}>
                <Button
                    borderRadius='5px'
                    bg='red.600'
                    _hover={{
                        bg: 'white',
                        color: 'black.800',
                    }}
                >
                    Todos os produtos
                    <Icon as={BsThreeDotsVertical} ml='10px' fontSize='20px' />
                </Button>
            </Link> */}
            <Dropdown
                menu={{
                    items: menuItems || [], style: {
                        backgroundColor: colors.black[800],
                    },
                    className: 'btn-all-products',
                    rootClassName: 'btn-all-products-bg',     
                }}
                overlayClassName='btn-all-products'
                openClassName='btn-all-products'
                overlayStyle={{
                    backgroundColor: colors.black[800],
                }}
            >
                <Button
                    borderRadius='5px'
                    bg='red.600'
                    _hover={{
                        bg: 'white',
                        color: 'black.800',
                    }}
                    onClick={() => router.push('/todosProdutos') }>
                    <Space>
                        Todos os produtos
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </Box>
    )
}
