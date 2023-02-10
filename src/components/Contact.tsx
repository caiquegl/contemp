import {
  Box,
  Button,
  Container as ContainerChakra,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  Select,
  Text,
  Textarea,
  VStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { AiOutlineCloseCircle, AiOutlineCloudUpload, AiOutlineFile } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { InputDefault } from "./Form/Input";
import { TextareaDefault } from "./Form/Textarea";
import { SelectDefault } from "./Form/Select";
import { useDropzone } from 'react-dropzone'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/db";
import { v4 as uuidv4 } from 'uuid';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
const { Dragger } = Upload;

interface IProps {
  title: string;
  description: string;
  ocultAddres?: boolean;
  form: any;
  id?: string;
}
export const Contact = ({
  title,
  description,
  ocultAddres,
  form,
  id,
}: IProps) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const formRef = useRef<any>();
  const [file, setFile] = useState('')
  const { register, handleSubmit, formState, reset, watch, setValue } = useForm(
    {}
  );
  const { errors } = formState;

  const sendMail = async (bodyForm: any) => {
    try {
      setLoading(true)
      let newBody: any = { body: bodyForm, id }
      console.log(bodyForm)
      if (file) newBody.arquivo = file
      await fetch(`api/mail`, {
        method: "POST",
        body: JSON.stringify({
          email: bodyForm['E-mail'],
          name: bodyForm['Nome'],
          empresa: bodyForm['Empresa'],
          telephone: bodyForm['Telefone'],
          description: bodyForm['Mensagem'],
          area: bodyForm['Área desejada'],
          file: file,
          id
        }),
      });
      reset()
      toast({
        title: "Sucesso",
        description: "Sucesso ao enviar email",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro ao enviar email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false)

    }
  };

  const onDrop = useCallback(async (acceptedFiles: any) => {
    acceptedFiles.forEach(async (file: any) => {
      const imageRef = ref(storage, `${id}/${file.name}`);

      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast({
            title: "Erro",
            description: "Erro ao fazer upload de arquivo",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // toast({
            //   title: "Sucesso",
            //   description: "Upload completo",
            //   status: "success",
            //   duration: 3000,
            //   isClosable: true,
            // });
            setFile(downloadURL)
          });
        })

    })

  }, [])

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status, name } = info.file;
      const imageRef = ref(storage, `${id}/${name}`);

      const uploadTask = uploadBytesResumable(imageRef, info.file.originFileObj);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast({
            title: "Erro",
            description: "Erro ao fazer upload de arquivo",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // toast({
            //   title: "Sucesso",
            //   description: "Upload completo",
            //   status: "success",
            //   duration: 3000,
            //   isClosable: true,
            // });
            setFile(downloadURL)
          });
        })

    },

    // if (status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
      const { status, name } = e.dataTransfer.files[0];
      const imageRef = ref(storage, `${id}/${name}`);

      const uploadTask = uploadBytesResumable(imageRef, e.dataTransfer.files[0].originFileObj);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast({
            title: "Erro",
            description: "Erro ao fazer upload de arquivo",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // toast({
            //   title: "Sucesso",
            //   description: "Upload completo",
            //   status: "success",
            //   duration: 3000,
            //   isClosable: true,
            // });
            console.log(downloadURL)
            setFile(downloadURL)
          });
        })
    },
  };

  return (
    <Box w="100%" bg="white" pt="185px" pb="173px">
      <ContainerChakra
        maxW="6xl"
        p={["12px 20px", "12px 20px", "12px 20px", "12px 20px", "12px 0 31px"]}
      >
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
          ]}
          w="100%"
          gap="40px"
        >
          <GridItem w="100%">
            <Text color="red.600" fontWeight="bold" fontSize="40px" mb="15px">
              {title}
            </Text>
            <Text fontSize="20px" mb="19px" color="black.800">
              {description}
            </Text>
            {!ocultAddres && (
              <>
                <HStack spacing="20px" mb="22px">
                  <Icon as={BsTelephone} fontSize="20px" color="red.600" />
                  <Link
                    href="tel:1142265140"
                    _hover={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <Text fontSize="20px" color="black.800">
                      (11) 4223-5140
                    </Text>
                  </Link>
                </HStack>
                <HStack spacing="20px" mb="22px">
                  <Icon as={BiMap} fontSize="20px" color="red.600" />
                  <Link
                    href="https://goo.gl/maps/6C1R41LG79c9FWyRA"
                    _hover={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <Text fontSize="20px" color="black.800">
                      Alameda Araguaia, 204 - Santa Maria, São Caetano do Sul -
                      SP, 09560-580
                    </Text>
                  </Link>
                </HStack>
              </>
            )}

            <Box w="100%" h="371px">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.069763786149!2d-46.5562153!3d-23.637672499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce432ae9a65d4d%3A0x7978a4708e7db108!2sAlameda%20Araguaia%2C%20204%20-%20Santa%20Maria%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP%2C%2009560-580!5e0!3m2!1spt-BR!2sbr!4v1666614335577!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                loading="lazy"
              ></iframe>
            </Box>
          </GridItem>
          <GridItem
            w="100%"
          >
            <Box
              border="2px solid"
              borderColor="black.800"
              borderRadius="8px"
              p={{
                base: "15px",
                md: "30px",
              }}
              width="100%"
              height="100%"
            >
              <Box
              >
                <VStack spacing="18px" id={id}
                  as="form"
                  onSubmit={handleSubmit(sendMail)}
                  ref={formRef}>
                  {form &&
                    form.length > 0 &&
                    form.map((quest: any, index: number) => (
                      <Fragment key={uuidv4()}>
                        {quest.type === "text" && (
                          <InputDefault
                            label={quest.name}
                            type="text"
                            error={errors.name}
                            {...register(quest.name, { required: `Campo  obrigatório` })}
                          />
                        )}
                        {quest.type === "textArea" && (
                          <TextareaDefault
                            label={quest.name}
                            error={errors.description}
                            {...register(quest.name, { required: `${quest.name} é obrigatório` })}
                          />
                        )}
                        {quest.type === "select" && (
                          <SelectDefault
                            label={quest.name}
                            error={errors.is_main}
                            opt={quest.options.map((opt: string) => {
                              return {
                                name: opt,
                                value: opt
                              }
                            })}
                            {...register(quest.name, { required: `${quest.name} é obrigatório` })}
                          />
                        )}

                        {quest.type === "upload" && (
                          <Box w="100%">
                            <Dragger {...props}>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">Click ou arraste o arquivo para área de upload</p>

                            </Dragger>
                            {file && <>
                              <Flex mt="15px" p="5px" border="1px solid #E2E8F0" alignItems="center" justifyContent="space-between">
                                <Link href={file} isExternal={true}>
                                  <Flex alignItems="center" justifyContent="center">
                                  <Icon as={AiOutlineFile} fontSize={20} color="#232323"/>
                                  <Text color="black.900" ml="10px">
                                    Curriculo anexado
                                  </Text>
                                  </Flex>
                                </Link>
                                <Icon as={AiOutlineCloseCircle} fontSize={15} color="#f70c0c" cursor="pointer" onClick={() => setFile("")}/>
                              </Flex>
                            </>}
                          </Box>
                          // <Flex
                          //   w="100%"
                          //   h="205px"
                          //   borderRadius="25px"
                          //   border="2px dashed #D1D1D1"
                          //   alignItems="center"
                          //   justifyContent="center"
                          //   flexDirection="column"
                          //   p="10px"
                          //   {...getRootProps()}
                          // >
                          //   <input {...getInputProps()} />
                          //   <Icon
                          //     as={AiOutlineCloudUpload}
                          //     fontSize="50px"
                          //     color="white.900"
                          //   />
                          //   <Text
                          //     fontSize="16px"
                          //     fontStyle="italic"
                          //     color="black.200"
                          //     maxW="437px"
                          //     mt="10px"
                          //     mb="20px"
                          //   >
                          //     Arraste ou selecione o arquivo que deseja enviar.
                          //     Arquivo em PDF no máximo 5mb
                          //   </Text>
                          //   <Text
                          //     fontSize="16px"
                          //     color="red.600"
                          //     maxW="437px"
                          //     mb="20px"
                          //   >
                          //     Escolher arquivo
                          //   </Text>
                          // </Flex>
                        )}
                      </Fragment>
                    ))}
                  <Flex justifyContent="flex-end">
                    <Button
                      w="179px"
                      h="50px"
                      borderRadius="25px"
                      bg="red.600"
                      fontSize="20px"
                      mt="40px"
                      type="submit"
                      isLoading={loading}
                      _hover={{
                        bg: 'black.800',
                        color: 'white',
                        transition: 'all 0.4s',
                      }}
                    >
                      <Icon as={TbSend} mr="10px" />
                      Enviar
                    </Button>
                  </Flex>
                </VStack>

              </Box>
            </Box>
          </GridItem>
        </Grid>
      </ContainerChakra>
    </Box>
  );
};
