import { useEffect, useState } from "react";
import { Menu } from "antd";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/router";
import { Icon } from "@chakra-ui/react";

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

  const truncateText = (text: string) => {
    const textLength = text.length;
    const maxTextLength = 35;

    if (textLength > maxTextLength) {
      return text.substring(0, maxTextLength) + "...";
    }

    return text;
  };

  const amountList = async (amount: any, hasIcon = true) => {
    try {
      let obj: any = [];

      for await (let el of amount) {
        let newObj = {
          ...el,
          label: el.name,
          key: el.name.replaceAll(" ", ""),
          onClick: (item: any) => router.push(`/category/${el.name}`),
        };

        if (el.list_sub_category && el.list_sub_category.length > 0) {
          newObj.children = await amountList(el.list_sub_category, el.name);
          newObj.icon = (
            <Icon
              as={AiFillCaretDown}
              fontSize="20px"
              color="#fff"
              fill="#fff"
            />
          );
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
          display: grid;
          grid-template-columns: 1fr 1rem;
          grid-column-gap: 0.5rem;
          align-items: center;
        }
      `}</style>

      <Menu
        onClick={(evt) => console.log(evt)}
        mode={"horizontal"}
        items={list}
        expandIcon={<Icon as={AiFillCaretRight} size={17} />}
        style={{
          background: "#242424",
          border: "none",
          fontSize: 18,
          position: "relative",
          alignItems: "center",
          width: "100%",
        }}
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
              as={AiOutlineEye}
              fontSize="40px"
              color="#fff"
              fill="#fff"
              onClick={(item: any) => router.push(`/category/${el.name}`)}
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
    />
  );
};
