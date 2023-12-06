import { Box, HStack, Icon, Flex, Button, useToast, Link as ChakraLink, Text, Heading } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Modal, Table, Tooltip } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { api } from '../../lib/axios'
import { FiCopy } from 'react-icons/fi'
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaDeleteLeft } from 'react-icons/fa6'
import { SearchBar } from '../SearchBar'

const TabFiles = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const fileInputRef = useRef<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [list, setList] = useState<any>([])
  const [listClone, setListClone] = useState<any>([])
  const { confirm } = Modal

  function copiarTexto(texto: string) {
    // Cria um elemento de input dinamicamente
    var input = document.createElement('input')

    // Define o valor do input como o texto a ser copiado
    input.value = texto

    // Adiciona o input ao documento
    document.body.appendChild(input)

    // Seleciona o conteúdo do input
    input.select()

    // Copia o conteúdo selecionado para a área de transferência
    document.execCommand('copy')

    // Remove o input do documento
    document.body.removeChild(input)
    toast({
      title: 'Copiado',
      description: 'Link copiado com sucesso.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const column = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (value: any) => (
        <Button
          as={ChakraLink}
          className='botao-tabelaprodutos'
          href={`https://${value}`}
          isExternal={true}
          _hover={{ color: 'black', textDecoration: 'none' }}
          rightIcon={<Icon as={ExternalLinkIcon} />}
        >
          {`url`}
        </Button>
      ),
    },
    {
      title: 'Ações',
      render: (a: any, row: any) => (
        <HStack spacing='20px'>
          <Tooltip placement='top' title='Copiar'>
            <FiCopy
              style={{
                cursor: 'pointer',
              }}
              onClick={() => copiarTexto(`https://${row.url}`)}
            />
          </Tooltip>
          <Icon
            cursor='pointer'
            as={FaDeleteLeft}
            fontSize='1.15rem'
            color='var(--gray-text)'
            onClick={() => {
              confirm({
                title: 'Deletar',
                icon: <ExclamationCircleFilled />,
                content: 'Deseja remover o arquivo ?',
                async onOk() {
                  setLoading(true)
                  const { data, status } = await api.put(`removeFile`, {
                    id: a.id,
                    name: a.name,
                  })

                  toast({
                    title: status == 201 ? 'Sucesso' : 'Erro',
                    description: status == 201 ? 'Arquivo deletado com sucesso' : 'Erro ao deletar arquivo',
                    status: status == 201 ? 'success' : 'error',
                  })
                  listFiles()
                  setLoading(false)
                },
                onCancel() {
                  console.log('Cancel')
                },
                wrapClassName: 'indexMax',
              })
            }}
          />
        </HStack>
      ),
    },
  ]

  const listFiles = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('getAllFiles')
      setList(data)
      setListClone(data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar produtos',
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    listFiles()
  }, [])

  useEffect(() => {
    setListClone([...list]);
  }, [list]);

  //ADD KEMELIN
  const handleFileInputChange = async (evt: any) => {
    try {
      setLoading(true);
      const files = evt.target.files;
      if (files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
          formData.append('nameFile', files[i].name);
        }
        const { data } = await api.post('upload', formData, {
          headers: { 'content-type': 'multipart/form-data' },
        });

        listFiles();

        toast({
          title: data.status ? 'Sucesso' : 'Erro',
          description: `${data.status ? 'Sucesso' : 'Erro'} ao subir arquivo.`,
          status: data.status ? 'success' : 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Número padrão de itens por página
  });

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    });
  };


  return (
    <>
      <Box>
        <Heading as={'h3'} className='adm-subtitulo text-black negrito'>
          Painel de Documentos
        </Heading>
        <Text className='paragrafo-preto' mb={'3%'}>
          Gerencie todos os documentos da Contemp de forma prática. Adicione, edite, ative, desative, pesquise ou exclua
          através do painel. Atenção! Ao excluir um documento não será possivel recupera-lo.
        </Text>
      </Box>
      <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
        <Button
          bg='red.600'
          color='white'
          borderRadius='8px'
          w='128px'
          isLoading={loading}
          h='40px'
          _hover={{ transition: 'all 0.4s' }}
          onClick={() => {
            console.log("aqui")
            fileInputRef.current.value = null // Remove a seleção atual do arquivo
            fileInputRef.current.key = Date.now() // Adiciona uma "key" única para forçar a recriação do elemento input
            fileInputRef.current.click()
          }}
        >
          Adicionar
        </Button>
        <SearchBar
          inputProps={{
            placeholder: 'Digite o nome do arquivo...',
            onChange: (evt) => {
              const searchTerm = evt.target.value.toLowerCase();
              const filteredList = listClone.filter((item: any) =>
                item.name.toLowerCase().includes(searchTerm)
              );
              setList(searchTerm ? filteredList : listClone);
            },
            _placeholder: {
              color: 'black.800',
              opacity: '50%',
            },
          }}
          containerProps={{
            bg: 'white.500',
            border: '1px solid',
            borderColor: 'black.800',
            color: 'var(--black-primary)',
            maxW: '18rem',
          }}
        />
        <input
          // id='cpf_file'
          key={Date.now()}
          type='file'
          multiple={true}
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={async (evt: any) => {
            console.log('iniciou aqui')
            setLoading(true)
            const files = evt.target.files
            if (files) {
              const formData = new FormData()
              for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i])
                formData.append('nameFile', files[i].name)
              }
              const { data } = await api.post('upload', formData, {
                headers: { 'content-type': 'multipart/form-data' },
              })

              listFiles()

              toast({
                title: data.status ? 'Sucesso' : 'Erro',
                description: `${data.status ? 'Sucesso' : 'Erro'} ao subir arquivo.`,
                status: data.status ? 'success' : 'error',
                duration: 5000,
                isClosable: true,
              })
              setLoading(false)
            }
          }}
        />
      </Flex>

      <Box borderRadius='8px' bg='white' p='30px' w='100%'>
      <Table
          id='tabela-documentos'
          loading={loading}
          scroll={{ x: 'fit-content' }}
          dataSource={list}
          columns={column}
          word-wrap={'break-word'}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: false,
            pageSizeOptions: ['10', '20', '50', '100'], // Opções de quantidade de itens por página
            onShowSizeChange: (current: number, pageSize: number) => {
              setPagination({
                ...pagination,
                current,
                pageSize,
              });
            },
          }}
          onChange={handleTableChange}
        />
      </Box>
    </>
  )
}

export default TabFiles
