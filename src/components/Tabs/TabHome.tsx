import { Tabs, TabList, Tab, TabPanels, TabPanel, useToast } from '@chakra-ui/react'
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
    <Tabs variant='unstyled' index={activeTab} onChange={(indexTab) => setActiveTab(indexTab)}>
      <TabList>
        {tabs.map((tabNumber) => (
          <Tab
            key={tabNumber}
            _selected={{
              bg: 'red.600',
              color: 'white',
              fontWeight: 'bold',
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
  )
}

export default TabHome
