import { Flex, Icon, Input, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";

export const EditOrderProduct = ({ value, changerOrder }: any) => {
  const [edit, setEdit] = useState(false);
  const [valueNumber, setValueNumber] = useState(value?.order_all_products);

  useEffect(() => {
    setValueNumber(value?.order_all_products);
  }, [value]);
  return (
    <Flex alignItems="center">
      {edit ? (
        <>
          <Input
            type="number"
            onChange={(evt) => setValueNumber(evt.target.value)}
            value={valueNumber}
            w="60px"
          />
          <Icon
            as={FaRegSave}
            fontSize="16px"
            onClick={async () => {
              await changerOrder(parseInt(valueNumber), {
                ...value,
                order_all_products: parseInt(value.order_all_products),
              });
              setEdit(false);
            }}
            ml="30px"
            cursor="pointer"
          />
        </>
      ) : (
        <>
          {value?.order_all_products}{" "}
          <Icon
            as={BsPencil}
            fontSize="16px"
            onClick={() => setEdit(true)}
            ml="30px"
            cursor="pointer"
          />
        </>
      )}
    </Flex>
  );
};
