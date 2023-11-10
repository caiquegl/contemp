import { Flex, Icon, Input, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaRegSave,  FaCheck } from "react-icons/fa";
import { PiPencilSimpleBold } from "react-icons/pi";

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
            as={FaCheck}
            fontSize="1rem"
            color={'var(--red-primary)'}
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
            as={PiPencilSimpleBold}
            fontSize="1.15rem"
            color={'var(--gray-text)'}
            onClick={() => setEdit(true)}
            ml="30px"
            cursor="pointer"
          />
        </>
      )}
    </Flex>
  );
};
