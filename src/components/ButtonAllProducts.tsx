import { Box, Button, Icon, Link, } from '@chakra-ui/react'
import React from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { colors } from '../styles/theme';
import { useRouter } from 'next/router';
import { replaceNameToUrl } from '../utils/replaceNameToUrl';

interface IProps {
    menuItems: any
    render: any
}

export const ButtonAllProducts = ({menuItems, render}: IProps) => {
    const router = useRouter()

    return (
        <Box>
            <Dropdown
                menu={{
                    items: menuItems || [], style: {
                        color: colors.black[800],
                        backgroundColor: colors.white[0]
                    },
                    className: 'btn-all-products',
                    rootClassName: 'btn-all-products-bg',   
                    subMenuOpenDelay: 0.5,
                    onClick: (info: any) => {
                       if(info.name) router.push(`/category/${replaceNameToUrl(info.name.replaceAll(' ', '_'))}`)
                       if(info.key  ) router.push(`/category/${replaceNameToUrl(info.key.replaceAll(' ', '_'))}`)
                    }
                    
                }}
                overlayClassName='btn-all-products'
                openClassName='btn-all-products'
                overlayStyle={{
                    color: colors.black[800],
                        backgroundColor: colors.white[0]
                }}
            >
                <Button
                    borderRadius='5px'
                    color={colors.black[800]}
                    bg="#fff"
                    _hover={{
                        bg: 'white',
                        color: 'black.800',
                    }}
                    onClick={() => router.push('/todosProdutos') }>
                        {
                            render && render
                        }
                </Button>
            </Dropdown>
        </Box>
    )
}
