import { Footer } from '../../components/Footer'
import { FooterCompleto } from '../../components/FooterCompleto'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  InputGroup,
  Link,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Textarea,
  Heading,
} from '@chakra-ui/react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import DefaultImg from '../../assets/images/image-default.webp'
import { v4 as uuidv4 } from 'uuid'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper'
import ReactHtmlParser from 'react-html-parser'
import { Contact } from '../../components/Contact'
import { Player } from '../../components/Player'
import { pxToRem } from '../../utils/pxToRem'
import CardProductWithDescription from '../../components/CardProductWithDescription'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { initFirebase } from '../../utils/db'
import { useAuth } from '../../contextAuth/authContext'
import Head from 'next/head'
import { Breadcrumb, Slider } from 'antd'
import { customSwiperBullets } from '../../utils/customSwiperBullets'
import { SmoothScroll } from '../../components/SmoothScroll'
import Image from 'next/image'
import NextLink from 'next/link'
import { decodeName } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'
import Product1 from '../../components/prodsLayout/layout1'
import Product2 from '../../components/prodsLayout/layout2'
import Product3 from '../../components/prodsLayout/layout3'
import Product4 from '../../components/prodsLayout/layout4'

const Product = () => {
  const router = useRouter()
  initFirebase()
  const toast = useToast()
  const { addCart } = useAuth()

  const { product } = router.query
  const [detail, setDetail] = useState<any>({})
  const [variation, setVariation] = useState<any>({})
  const [bradName, setBradeName] = useState<any>([])
  const [products, setProducts] = useState<any>([])
  const [qtd, setQtd] = useState(1)
  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  })

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const getProduct = async () => {
    try {
      let produto = ''
      if (product && typeof product == 'string') produto = decodeName(product).replaceAll('_', ' ').replaceAll('/', '333')
      const { data } = await api.get(`${produto}/getProduct`)

      if (!data.bradName) return router.push('/404')
      setBradeName(data.bradName)

      const changeText = (txt: string) => {
        if (!txt) return
        let val = txt
        val = val.toString().replace('<a', '<a target="_blank"')
        if (val.indexOf(`<figure class=\"media\"><oembed url=`) > -1) {
          val = val.toString().replace('<figure class="media"><oembed url=', '<iframe src=')
          val = val.toString().replace('watch?v=', 'embed/')
          val = val
            .toString()
            .replace(
              '></oembed></figure>',
              'width="560" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
            )
        }

        let result = txt.substring(0, 2)
        let result2 = txt.substring(0, 5)
        if (result == '<a' || result2 == '<p><a') {
          if (val.indexOf('class=') == -1) {
            val = val.toString().replace('<a', '<a class="editor_button"')
          }
        }

        return val
      }

      setDetail({
        ...data.detail,
        tab: data.detail.tab.map((t: any) => ({
          ...t,
          text: changeText(t.text),
        })),
      })
      setProducts(data.allProducts)
    } catch (e) {
      console.log(e)
    }
  }

  // ...

  const generateBreadcrumbUrl = (index: number) => {
    // Construa a URL com base nas etapas anteriores do Breadcrumb
    const path = bradName.slice(0, index + 1).map((el: string) => el.toLowerCase().replaceAll(' ', '_')).join('/');

    // Adicione o prefixo da categoria principal (ou o caminho da categoria principal, dependendo da sua estrutura de URLs)
    return index === 0 ? `/category/${path}` : `/category/${path.split('/').pop()}`;
  };




  useEffect(() => {
    if (product) {
      getProduct()
    }
  }, [product])

  return (
    <>
      <SmoothScroll>
        {detail && (
          <Head>
            <meta name='description' content={detail.description_seo} />
            <meta property='og:description' content={detail.description_seo} />
            <meta name='keywords' content={detail.key_word_seo} />
            <title>{detail.name}</title>
            <meta property='og:title' content={detail.name} />
            <meta property="og:image" content={detail.img} />
            <link rel='icon' href='/favicon.png' />
          </Head>
        )}
        {detail && !detail.layout && <Product1 bradName={bradName} detail={detail} />}
        {detail?.layout == 1 && <Product1 bradName={bradName} detail={detail} />}
        {detail?.layout == 2 && <Product2 bradName={bradName} detail={detail} />}
        {detail?.layout == 3 && <Product3 bradName={bradName} detail={detail} />}
        {detail?.layout == 4 && <Product4 bradName={bradName} detail={detail} />}
        <FooterCompleto />
      </SmoothScroll>
    </>
  )
}

export default Product