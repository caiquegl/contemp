import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast
} from '@chakra-ui/react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { database, initFirebase } from '../../utils/db'
import { pxToRem } from '../../utils/pxToRem'
import ContainerHome from '../ContainerHome'

const TabHome = () => {
  const toast = useToast()
  initFirebase()
  const [activeTab, setActiveTab] = useState(0)
  const [list, setList] = useState([])

  const listHome = async () => {
    try {
      const dbInstance = collection(database, 'home')
      let newList: any = []
      const q = query(dbInstance, orderBy('indexProduct', 'desc'))
      await getDocs(q).then((data) => {
        data.docs.forEach((doc) => {
          newList.push({ ...doc.data(), id: doc.id, ref: doc.ref })
        })
      })
      setList(newList)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar produtos',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    listHome()
  }, [activeTab])

  const tabs = Array.from({ length: 7 }, (_, index) => index)

  return (
    <Tabs
      variant="unstyled"
      index={activeTab}
      onChange={(indexTab) => setActiveTab(indexTab)}
    >
      <TabList>
        {tabs.map((tabNumber) => (
          <Tab
            key={tabNumber}
            _selected={{
              bg: 'red.600',
              color: 'white',
              fontWeight: 'bold'
            }}
            w={pxToRem(133)}
            color="black.800"
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
              defaultValues={
                list.filter((el: any) => el.indexProduct === tabNumber)[0]
              }
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default TabHome
