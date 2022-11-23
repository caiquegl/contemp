import { TriangleDownIcon } from "@chakra-ui/icons";
import { Menu, MenuItem, MenuButton, MenuList, Link } from "@chakra-ui/react";

export type MenuItemProps = {
  label: string;
  link: string;
};

export type MenuProps = {
  menuItems?: MenuItemProps[];
  title: string;
};

const CustomMenuItem = ({ label, link }: MenuItemProps) => (
  <MenuItem
    as={Link}
    href={link}
    _hover={{ background: "red.600" }}
    background="black.800"
  >
    {label}
  </MenuItem>
);

export const HeaderMenu = ({ title, menuItems }: MenuProps) => {
  return (
    <Menu isLazy closeOnBlur matchWidth>
      <MenuButton py={2} transition="all 0.2s" w="max-content" display="flex">
        {title} <TriangleDownIcon />
      </MenuButton>

      <MenuList background="black.800">
        {menuItems?.map(({ label, link }) => (
          <CustomMenuItem label={label} link={link} />
        ))}
      </MenuList>
    </Menu>
  );
};
