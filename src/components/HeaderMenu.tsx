import { Icon, Image, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { useRouter } from "next/router";

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

  const amountList = async (amount: any, name?: any) => {
    try {
      let obj: any = [];
      for await (let el of amount) {
        let newObj = {
          ...el,
          label: el.name,
          key: el.name.replaceAll(" ", ""),
          onClick: (item: any) => router.push(`/category/${el.name}`)
        };

        if (el.list_sub_category && el.list_sub_category.length > 0) {
          newObj.children = await amountList(el.list_sub_category, el.name);
          newObj.icon = (
            <Icon as={name ? AiFillCaretRight : AiFillCaretDown} fontSize="20px" color="#fff" />
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

  const items = [
    { label: "item 1", key: "item-1" }, // remember to pass the key prop
    { label: "item 2", key: "item-2" }, // which is required
    {
      label: "sub menu",
      key: "submenu",
      children: [{ label: "item 3", key: "submenu-item-1" }],
    },
  ];
  return (
    <Menu
      onClick={(avt) => console.log(avt)}
      mode="horizontal"
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
