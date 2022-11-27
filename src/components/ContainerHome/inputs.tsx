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
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiFile } from "react-icons/fi";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";
import { app, initFirebase } from "../../utils/db";

interface IProps extends InputProps {
  name: string;
  typeInput: string;
  options?: any;
  selectProps?: SelectProps;
  textareaProps?: TextareaProps;
  fileProps?: TextareaProps;
  getUrls?: any;
}

const InputsHome = ({
  name,
  typeInput,
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

  return (
    <Box w="100%">
      <Text fontSize="20px" mb="10px" color="black.800">
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
              options.map((opt: any) => <option value={opt}>{opt}</option>)}
          </Select>
        )}

        {typeInput == "file" && (
          <>
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={FiFile} color="black.800" />}
            />
            <input
              type="file"
              name={name}
              style={{ display: "none" }}
              ref={ref}
              multiple={true}
              onChange={async (evt) => {
                let file = getStorage(app, "gs://contemp-1e58c.appspot.com");
                let files: any = evt.target.files;
                let urls: any = [];

                for await (let el of files) {
                  const storageRef = refStorage(
                    file,
                    `${el.name}-${new Date()}`
                  );

                  const uploadTask = uploadBytes(storageRef, el).then(
                    (snapshot) => {
                      getDownloadURL(snapshot.ref).then((downloadURL) => {
                        urls.push(downloadURL);
                        getUrls(urls);
                      });
                    }
                  );
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
              children={<Icon as={FiFile} color="black.800" />}
            />
            <input
              type="file"
              name={name}
              style={{ display: "none" }}
              ref={refSingle}
              multiple={false}
              onChange={async (evt) => {
                console.log(evt);
                let file = getStorage(app, "gs://contemp-1e58c.appspot.com");
                let files: any = evt.target.files;
                console.log(files[0].name);
                const storageRef = refStorage(
                  file,
                  `${files[0].name}-${new Date()}`
                );
                console.log(storageRef);
                await uploadBytes(storageRef, files[0]).then((snapshot) => {
                  getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    getUrls(downloadURL);
                  });
                });
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
      </InputGroup>
    </Box>
  );
};

export default InputsHome;
