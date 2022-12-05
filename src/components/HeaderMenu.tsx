import { useEffect, useState } from "react";
import { Menu } from "antd";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/router";
import Icon from "./Icon";
import { pxToRem } from "../utils/pxToRem";

export type MenuProps = {
  menuItems: any;
};

// const CustomMenuItem = ({ menu }: any) => {
//   if (menu.list_sub_category && menu.list_sub_category.length > 0) {
//     return (
//       <Dropdown.Item>
//         {menu.name}
//         {menu.list_sub_category &&
//           menu.list_sub_category.length > 0 &&
//           menu.list_sub_category.map((list: any) => (
//             <Dropdown.Submenu>
//               <CustomMenuItem menu={list} />
//             </Dropdown.Submenu>
//           ))}
//       </Dropdown.Item>
//     );
//   }
//   return (
//     <Text
//       as={Link}
//       href={menu.link}
//       _hover={{ background: "red.600" }}
//       background="black.800"
//       color="white"
//     >
//       {menu.name}
//     </Text>
//   );
// };

export const HeaderMenu = ({ menuItems }: MenuProps) => {
  const [list, setList] = useState([]);
  const router = useRouter();

  const amountList = async (amount: any, hasIcon = true) => {
    try {
      let obj: any = [];

      for await (let el of amount) {
        let newObj = {
          ...el,
          label: el.name,
          title: el.name,
          key: el.name,
          onTitleClick: (value: any) => {
            console.log(value, 'value')
            router.push(`/category/${el.name.replaceAll(' ', '_')}`)
          },
          // onclick: (value: any) => router.push(`/category/${el.name.replaceAll(' ', '_')}`),
          // onclick: (a: any) => console.log('aquii', a),
          // onclick: (item: any) => router.push(`/category/${el.name.replaceAll(' ', '_')}`),
          // onClick: (item: any) => console.log(item),
          // icon: (
          //   <Icon
          //     icon={AiOutlineEye}
          //     size={20}
          //     color="#fff"
          //     onClick={(item: any) => router.push(`/category/${el.name.replaceAll(' ', '_')}`)}
          //   />
          // ),
          // icon: hasIcon ? (
          //   <Icon
          //     icon={AiFillCaretDown}
          //     size={20}
          //     color="#fff"
          //     iconStyle={{
          //       gridColumn: 2,
          //       gridRow: 1,
          //     }}
          //   />
          // ) : null,
          style: {
            marginRight: 0,
            padding: `0 ${pxToRem(5)}`,
          },
        };

        if (el.list_sub_category && el.list_sub_category.length > 0) {
          newObj.children = await amountList(el.list_sub_category, false);
        }
        obj.push(newObj);
      }

      return obj;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getList = async () => {
    let amount = await amountList(menuItems);
    setList(amount);
  };

  useEffect(() => {
    getList();
  }, [menuItems]);

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
          console.log(evt, `/category/${evt.keyPath[0].replaceAll(' ', '_')}`)
          router.push(`/category/${evt.keyPath[0].replaceAll(' ', '_')}`)
        }}
        mode={"horizontal"}
        items={list}
        expandIcon={<Icon icon={AiFillCaretRight} size={17} />}
        style={{
          background: "#242424",
          border: "none",
          fontSize: 16,
          display: 'flex',
          flexWrap: 'wrap',
          position: "relative",
          alignItems: "center",
          width: "100%",
          justifyContent: 'center'
        }}
        disabledOverflow
      />
    </>
  );
};

export const HeaderMenuVertical = ({ menuItems }: MenuProps) => {
  const [list, setList] = useState([]);
  const router = useRouter();

  const amountList = async (amount: any, name?: any) => {
    try {
      let obj: any = [];
      for await (let el of amount) {
        let newObj = {
          ...el,
          label: el.name,
          key: el.name.replaceAll(" ", ""),
          icon: (
            <Icon
              icon={AiOutlineEye}
              size={20}
              color="#fff"
              onClick={(item: any) => router.push(`/category/${el.name.replaceAll(' ', '_')}`)}
            />
          ),
        };

        if (el.list_sub_category && el.list_sub_category.length > 0) {
          newObj.children = await amountList(el.list_sub_category, el.name);
        }
        obj.push(newObj);
      }

      return obj;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getList = async () => {
    let amount = await amountList(menuItems);
    setList(amount);
  };

  useEffect(() => {
    getList();
  }, [menuItems]);

  return (
    <Menu
      onClick={(avt) => console.log(avt)}
      mode="inline"
      items={list}
      style={{
        background: "#242424",
        border: "none",
        color: "#fff",
        fontSize: 18,
      }}
      theme="dark"
      expandIcon={<Icon icon={AiFillCaretRight} size={30} />}
    />
  );
};
