import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { api } from '../lib/axios'
import { Image } from '@chakra-ui/react'

export function BannerMobile() {
  const [cards, setCards] = useState<any>([])
 /* const cards = [
    {
      subtitle: '',
      title: '',
      text: '',
      image: 'https://contemp.com.br/api/arquivos/bannermobilereportcontemp.png',
      links: 'https://www.contemp.com.br/produto/software_-_contemp_report',
    },
    {
      subtitle: '',
      title: '',
      text: '',
      image: 'https://contemp.com.br/api/arquivos/bannermobilecsvisioncontemp.png',
      links: 'https://www.contemp.com.br/produto/pir%C3%B4metro_fixo_csvision_r2m',
    },
    {
      subtitle: 'MEDIÇÃO E CONTROLE DE TEMPERATURA EM',
      title: 'PROCESSOS INDUSTRIAIS',
      text: 'Conheça nossas soluções completas para sua indústria. Fale com nossa equipe de vendas.',
      image: 'https://contemp.com.br/api/arquivos/banner-2.webp',
      links: 'https://www.contemp.com.br/todosProdutos',
    },
    {
      subtitle: '',
      title: 'ATENDEMOS O BRASIL E A AMÉRICA LATINA',
      text: 'Temos uma equipe de vendedores-técnicos de prontidão para te atender.',
      image: 'https://contemp.com.br/api/arquivos/banner-3.webp',
      links: 'https://www.contemp.com.br/a-contemp',
    },
  ];
*/
  const getBanners = async () => {
    try {
      const { data } = await api.post('/getAllBanners', {
        tabActive: 'Mobile',
      });

      let actives = data.filter((item: any) => item.status == true).sort((a: any, b: any) => a.order - b.order)

      setCards(actives.map((item: any) => ({
        subtitle: item.subtitle || '',
        title: item.title || '',
        text: item.description || '',
        image: item.url,
        links: item.redirect || '',
      })))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getBanners()
  }, [])

  return (
    <>
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        pauseOnMouseEnter: true,
        waitForTransition: true,
      }}
      speed={2000}
      navigation={true}
      //pagination={{ clickable: true }}
      modules={[Autoplay, Navigation]}
      className='mySwiper banner-mobile'


    >
      {cards.map((card: any, index: any) => (
        <SwiperSlide key={`slide-${index + 1}`} id={`slide-${index + 1}`}>
              <a href={card.links} target="_blank" rel="noopener noreferrer"  style={{position: 'relative'}}>
                <Image
                  alt={'nome-do-produto'}
                  src={card.image}
                  objectFit={'cover'}
                  className='imagem-card-todososprodutos'
                  height="450px"
                  width="100%"
                  position="absolute"
                  cursor={'pointer'}
                  _hover={{
                    transform: 'scale(1.5)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
          <div
            style={{
/*              position: 'relative',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundImage: `url(${card.image})`,*/
              height: '450px',
            }}
          >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: '#fff',
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', color: 'var(--white-primary)' }}>{card.subtitle}</h3>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px', color: 'var(--white-primary)' }}>{card.title}</h2>
                <p style={{ fontSize: '1rem' }}>{card.text}</p>
              </div>
          </div>
            </a>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
}
