import { useEffect, useState } from 'react'
// import { Menu } from 'antd'
import { AiFillCaretRight } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Icon from './Icon'
import { Box } from '@chakra-ui/react'
import Menu from 'rc-menu'
import 'rc-menu/assets/index.css'
import { replaceNameToUrl } from '../utils/replaceNameToUrl'

export type MenuProps = {
  menuItems: any
  onClose?: any
  maxWidth?: any
}

export const HeaderMenu = ({ menuItems, maxWidth }: MenuProps) => {
  const router = useRouter()

  return (
    <>
      <Menu
        onClick={(evt) => {
          router.push(`/category/${replaceNameToUrl(evt.keyPath[0].replaceAll(' ', '_'))}`)
        }}
        mode={'horizontal'}
        subMenuOpenDelay={0.5}
        items={menuItems}
        expandIcon={<Icon icon={AiFillCaretRight} size={17} />}
        style={{
          background: '#242424',
          border: 'none',
          fontSize: 16,
          display: 'flex',
          transition: '0.2s',
          // flexWrap: 'wrap',
          position: 'relative',
          alignItems: 'center',
          width: maxWidth ? 'calc(100% - 75px)' : '100%',
          justifyContent: 'center',
          // zIndex: 99999999999999999
          margin: 'auto',
        }}
        overflowedIndicator={
          <Box as={'p'} _hover={{ color: 'white' }}>
            MAIS CATEGORIAS
          </Box>
        }
      />
      {/* </Fade> */}
    </>
  )
}

export const HeaderMenuVertical = ({ menuItems, onClose }: MenuProps) => {
  const router = useRouter()
  return (
    <Menu
      onClick={(avt) => {
        onClose()
        router.push(`/category/${replaceNameToUrl(avt.key)}`)
      }}
      mode='inline'
      items={menuItems}
      style={{
        background: '#242424',
        border: 'none',
        color: '#fff',
        fontSize: 18,
      }}
      // theme='dark'
      expandIcon={<Icon icon={AiFillCaretRight} size={30} />}
    />
  )
}
