import { Tabs, TabList, Tab, TabPanels, TabPanel, useToast, Box, Text, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { pxToRem } from '../../utils/pxToRem'
import ContainerHome from '../ContainerHome'

const TabHome = () => {
  const toast = useToast()
  const [activeTab, setActiveTab] = useState(0)
  const [list, setList] = useState([])

  const listHome = async () => {
    try {
      const { data } = await api.get(`getHomeTabs`)
      setList(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar produtos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    listHome()
  }, [activeTab])

  const tabs = Array.from({ length: 7 }, (_, index) => index)

  return (
    <Box>
      <Heading as={'h3'} className='adm-subtitulo text-black negrito'>Produtos da Home</Heading>
      <Text className='paragrafo-preto' mb={'3%'}>Adicione e/ou edite aqui os 7 produtos que irão aparecer em destaque na home do site.</Text>
    <Tabs variant='unstyled' index={activeTab} onChange={(indexTab) => setActiveTab(indexTab)}>
      <TabList>
        {tabs.map((tabNumber) => (
          <Tab
            key={tabNumber}
            _selected={{
              bg: 'red.600',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
            }}
            w={pxToRem(133)}
            color='black.800'
          >
            Produto {tabNumber + 1}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tabNumber) => (
          <TabPanel key={tabNumber}>
            <ContainerHome
              reset={() => listHome()}
              indexProduct={tabNumber}
              defaultValues={list.filter((el: any) => el.indexProduct === tabNumber)[0]}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
    </Box>
  )
}

export default TabHome
