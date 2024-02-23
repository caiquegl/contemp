import {
  Box,
  Text,
  InputGroup,
  Input,
  Select,
  Icon,
  InputRightElement,
  Textarea,
  InputProps,
  SelectProps,
  TextareaProps,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiFile } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";


import { app, initFirebase } from "../../utils/db";
import { v4 as uuidv4 } from 'uuid';
import { PiInfoDuotone } from "react-icons/pi";
import { api } from '../../lib/axios'

interface IProps extends InputProps {
  name: string;
  typeInput: string;
  question?: string;
  options?: any;
  selectProps?: SelectProps;
  textareaProps?: TextareaProps;
  fileProps?: TextareaProps;
  getUrls?: any;
}

const InputsHome = ({
  name,
  typeInput,
  question,
  options,
  selectProps,
  textareaProps,
  fileProps,
  getUrls,
  ...rest
}: IProps) => {
  initFirebase();
  const ref = useRef<any>();
  const refSingle = useRef<any>();
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  return (
    <Box w="100%">
      <Text className="paragrafo-preto negrito" textTransform={'uppercase'} mb="10px">
        {name}
      </Text>
      <InputGroup
        borderRadius="6px"
        bg="white.500"
        p="3px 7px"
        w="100%"
        h={typeInput == "textarea" ? "196px" : "50px"}
        outline="none"
        border="1px solid"
        borderColor="black.800"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {typeInput === "text" && (
          <Input
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder={name}
            color="black.800"
            _focusVisible={{
              outline: "none",
            }}
            {...rest}
          />
        )}

        {typeInput === "select" && (
          <Select
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder={name}
            color="black.800"
            _placeholder={{
              color: "black.50",
            }}
            _focusVisible={{
              outline: "none",
            }}
            {...selectProps}
          >
            {options &&
              options.length > 0 &&
              options.map((opt: any, index: any) => <option value={opt} key={index}>{opt}</option>)}
          </Select>
        )}

        {typeInput == "file" && (
          <>
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={LuUpload} color="black.800" mr={'85%'} />}
            />
            <input
              type="file"
              name={name}
              style={{ display: "none" }}
              ref={ref}
              multiple={true}
              onChange={async (evt) => {
                let files: any = evt.target.files;
                let urls: any = [];

                for await (let el of files) {
                  const formData = new FormData()
                  formData.append('files', el)
                  formData.append('picture', true)
                  formData.append('nameFile', `${el.name}-${new Date()}`)

                  const { data } = await api.post('upload', formData, {
                    headers: { 'content-type': 'multipart/form-data' },
                  })

                  urls.push(data.url)
                  getUrls(data.url)
                }
              }}
            />
            <Input
              placeholder={name || "Your file ..."}
              border="none"
              onClick={() => ref.current.click()}
              {...rest}
            />
          </>
        )}
        {typeInput == "fileSingle" && (
          <>
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={MdOutlineAddPhotoAlternate} color="black.800" />}
            />
            <input
              type="file"
              name={name}
              style={{ display: "none" }}
              ref={refSingle}
              multiple={false}
              onChange={async (evt) => {
                const files = evt.target.files
                const formData = new FormData()
                formData.append('files', files[0])
                formData.append('picture', true)
                formData.append('nameFile', `${files[0].name}-${new Date()}`)

                const { data } = await api.post('upload', formData, {
                  headers: { 'content-type': 'multipart/form-data' },
                })

                getUrls(data.url)


              }}
            />
            <Input
              placeholder={name || "Your file ..."}
              border="none"
              onClick={() => refSingle.current.click()}
              {...rest}
            />
          </>
        )}
        {typeInput == "textarea" && (
          <Textarea
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder={name}
            color="black.800"
            minH="186px"
            _placeholder={{
              color: "black.50",
            }}
            _focusVisible={{
              outline: "none",
            }}
            {...textareaProps}
          />
        )}
        {!!question && (
          <Tooltip
            label={question}
            isOpen={isTooltipVisible}
            placement="top-end"
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            hasArrow
          >
            <Box
              position="absolute"
              right="8px"
              color="var(--black-primary)"
              cursor="pointer"
              aria-label={question}
              onMouseEnter={() => setTooltipVisibility(true)}
              onMouseLeave={() => setTooltipVisibility(false)}
            >
              <Icon as={PiInfoDuotone} fontSize={'1.15rem'} color={'var(--red-primary)'} />
            </Box>
          </Tooltip>
        )}
      </InputGroup>
    </Box>
  );
};

export default InputsHome;
