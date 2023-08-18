import { Flex, Icon, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";

export const EditOrderTabProduct = ({ value, changerOrder }: any) => {
  const [edit, setEdit] = useState(false);
  const [valueNumber, setValueNumber] = useState(value.order);

  useEffect(() => {
    setValueNumber(value.order);
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
                order: parseInt(value.order),
              });
              setEdit(false);
            }}
            ml="30px"
            cursor="pointer"
          />
        </>
      ) : (
        <>
          {value.order}{" "}
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
