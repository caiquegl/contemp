import { useEffect, useLayoutEffect, useState } from 'react'
import { Menu } from 'antd'
import { AiFillCaretRight } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Icon from './Icon'
import { pxToRem } from '../utils/pxToRem'
import { Box, Fade } from '@chakra-ui/react'

export type MenuProps = {
  menuItems: any
  onClose?: any
}

export const HeaderMenu = ({ menuItems }: MenuProps) => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const router = useRouter()

  const amountList = async (amount: any, hasIcon = true) => {
    try {
      let obj: any = []
      let sort = amount.sort((a: any, b: any) => a.order - b.order)

      for await (let el of sort) {
        let newObj = {
          ...el,
          label: el.name,
          title: el.name,
          key: el.name,
          order: 1,
          onTitleClick: (value: any) => {
            router.push(`/category/${el.name.replaceAll(' ', '_')}#viewCategory`)
          },
        }

        if (el.list_sub_category && el.list_sub_category.length > 0) {
          newObj.children = await amountList(el.list_sub_category, false)
        }
        delete obj.onTitleClick
        obj.push(newObj)
      }

      return obj
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const getList = async () => {
    let amount = await amountList(menuItems)
    setLoading(true)
    setList(amount)

    setTimeout(() => setLoading(false), 1500)
  }

  useEffect(() => {
    getList()
  }, [menuItems])

  return (
    <>
      {/* <style lang='css' scoped>{`
        .ant-menu-submenu-title {
          display: flex;
          flex-direction: row-reverse;
        }
        .ant-menu-submenu-title svg {
          margin-left: 5px;
        }
      `}</style> */}
      {/* <Fade in={loading}> */}

      <Menu
        onClick={(evt) => {
          router.push(`/category/${evt.keyPath[0].replaceAll(' ', '_')}`)
        }}
        mode={'horizontal'}
        subMenuOpenDelay={0.5}
        items={list}
        expandIcon={<Icon icon={AiFillCaretRight} size={17} />}
        style={{
          background: '#242424',
          border: 'none',
          fontSize: 16,
          display: 'flex',
          opacity: list.length === 0 || loading ? 0 : 1,
          transition: '0.2s',
          // flexWrap: 'wrap',
          position: 'relative',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
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
  const [list, setList] = useState([])
  const router = useRouter()

  const amountList = async (amount: any, name?: any) => {
    try {
      let obj: any = []
      for await (let el of amount) {
        let newObj = {
          ...el,
          label: el.name,
          key: el.name.replaceAll(' ', '_'),
          // icon: (
          //   <Icon
          //     icon={AiOutlineEye}
          //     size={20}
          //     color="#fff"
          //     onClick={(item: any) => {
          //       onClose()
          //       router.push(`/category/${el.name.replaceAll(" ", "_")}`)
          //     }}
          //   />
          // ),
        }

        if (el.list_sub_category && el.list_sub_category.length > 0) {
          newObj.children = await amountList(el.list_sub_category, el.name)
        }
        obj.push(newObj)
      }

      return obj
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const getList = async () => {
    let amount = await amountList(menuItems)
    setList(amount)
  }

  useEffect(() => {
    getList()
  }, [menuItems])

  return (
    <Menu
      onClick={(avt) => {
        onClose()
        router.push(`/category/${avt.key}`)
      }}
      mode='inline'
      items={list}
      style={{
        background: '#242424',
        border: 'none',
        color: '#fff',
        fontSize: 18,
      }}
      theme='dark'
      expandIcon={<Icon icon={AiFillCaretRight} size={30} />}
    />
  )
}
