import { Box, HStack, Icon, Flex, Button, useToast, Link, Text, Heading } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Modal, Table, Tooltip } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { api } from '../../lib/axios'
import { FiCopy } from 'react-icons/fi'

const TabFiles = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const fileInputRef = useRef<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [list, setList] = useState<any>([])
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
        <Text onClick={() => window.open(`https://${value}`, '_blank')} cursor='pointer'>
          {`https://${value}`}
        </Text>
      ),
    },
    {
      title: 'Ação',
      render: (a: any, row: any) => (
        <HStack spacing='20px'>
          <Icon
            cursor='pointer'
            as={AiOutlineClose}
            fontSize='17px'
            color='red.500'
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
          <Tooltip placement='top' title='Copiar'>
            <FiCopy
              style={{
                cursor: 'pointer',
              }}
              onClick={() => copiarTexto(`https://${row.url}`)}
            />
          </Tooltip>
        </HStack>
      ),
    },
  ]

  const listFiles = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('getAllFiles')
      setList(data)
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
          borderRadius='4px'
          w='128px'
          isLoading={loading}
          h='47px'
          _hover={{ transition: 'all 0.4s' }}
          onClick={() => {
            fileInputRef.current.value = null // Remove a seleção atual do arquivo
            fileInputRef.current.key = Date.now() // Adiciona uma "key" única para forçar a recriação do elemento input
            fileInputRef.current.click()
          }}
        >
          Adicionar
        </Button>
        <input
          id='cpf_file'
          key={Date.now()} // Adicione uma "key" única para forçar a recriação do elemento input
          type='file'
          multiple={true}
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={async (evt: React.ChangeEvent<HTMLInputElement>) => {
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
        <Table scroll={{ x: 'fit-content' }} dataSource={list} columns={column} word-wrap={'break-word'} />
      </Box>
    </>
  )
}

export default TabFiles
