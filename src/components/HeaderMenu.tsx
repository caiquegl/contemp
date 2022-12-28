import { CSSProperties, useEffect, useState } from 'react'
import { Menu } from 'antd'
import { AiFillCaretRight } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Icon from './Icon'
import { pxToRem } from '../utils/pxToRem'
import { Box } from '@chakra-ui/react'

export type MenuProps = {
  menuItems: any
  style?: CSSProperties
}

export const HeaderMenu = ({ menuItems, style }: MenuProps) => {
  const [list, setList] = useState([])
  const router = useRouter()

  const amountList = async (amount: any, hasIcon = true) => {
    try {
      let obj: any = []

      for await (let el of amount) {
        let newObj = {
          ...el,
          label: el.name,
          title: el.name,
          key: el.name,
          onTitleClick: (value: any) => {
            router.push(`/category/${el.name.replaceAll(' ', '_')}`)
          },
          style: {
            marginRight: 0,
            padding: `0 ${pxToRem(5)}`
          }
        }

        if (el.list_sub_category && el.list_sub_category.length > 0) {
          newObj.children = await amountList(el.list_sub_category, false)
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
    <>
      <style lang="css" scoped>{`
        .ant-menu-submenu-title {
          display: flex;
          flex-direction: row-reverse;
        }

        .ant-menu-submenu-title svg {
          margin-left: 5px;
        }
      `}</style>

      <Menu
        onClick={(evt) => {
          router.push(`/category/${evt.keyPath[0].replaceAll(' ', '_')}`)
        }}
        mode={'horizontal'}
        items={list}
        expandIcon={<Icon icon={AiFillCaretRight} size={17} />}
        style={{
<<<<<<< HEAD
          background: "none",
          border: "none",
=======
          background: '#242424',
          border: 'none',
>>>>>>> 62869bfe7b3f7070e1bfa88a5d7c0b71b709fbd4
          fontSize: 16,
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          ...style
        }}
        overflowedIndicator={
<<<<<<< HEAD
          <Box as={"p"} _hover={{ color: "white" }}>
            OUTROS
=======
          <Box as={'p'} _hover={{ color: 'white' }}>
            Outros
>>>>>>> 62869bfe7b3f7070e1bfa88a5d7c0b71b709fbd4
          </Box>
        }
      />
    </>
  )
}

export const HeaderMenuVertical = ({ menuItems }: MenuProps) => {
  const [list, setList] = useState([])
  const router = useRouter()

  const amountList = async (amount: any, name?: any) => {
    try {
      let obj: any = []
      for await (let el of amount) {
        let newObj = {
          ...el,
          label: el.name,
          key: el.name.replaceAll(' ', ''),
          icon: (
            <Icon
              icon={AiOutlineEye}
              size={20}
              color="#fff"
              onClick={(item: any) =>
                router.push(`/category/${el.name.replaceAll(' ', '_')}`)
              }
            />
          )
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
      onClick={(avt) => console.log(avt)}
      mode="inline"
      items={list}
      style={{
        background: '#242424',
        border: 'none',
        color: '#fff',
        fontSize: 18
      }}
      theme="dark"
      expandIcon={<Icon icon={AiFillCaretRight} size={30} />}
    />
  )
}
