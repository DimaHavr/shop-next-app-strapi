'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const HeroBanner = () => {
  return (
    <Swiper
      effect='fade'
      grabCursor
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: true,
      // }}
      breakpoints={{
        0: {
          pagination: false,
        },
        1340: {
          pagination: { clickable: true },
        },
      }}
      spaceBetween={0}
      loop
      modules={[Autoplay, Navigation, EffectFade]}
      className='hero-slider'
    >
      <SwiperSlide>
        <Image
          src='/images/hero/hero_mens.jpg'
          alt='Mens hero'
          width='1920'
          height='850'
          className=' min-h-[550px] bg-no-repeat object-cover object-center'
          priority
        />
        <div className=' absolute bottom-[210px] left-[133px] z-[1] flex flex-col max-lg:bottom-[125px] max-lg:left-[35px] max-md:bottom-[65px] max-sm:left-[10px]'>
          <h1 className='decoration-transparent mb-8 max-w-[650px] animate-heroText bg-mid-grey bg-clip-text text-start font-exo_2 text-[56px] drop-shadow-hero max-md:text-2xl'>
            Нова чоловіча колекція вже в магазині
          </h1>
          <Link
            href='/choloviky'
            className='w-[300px] rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300  hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-sm:w-[250px] max-sm:text-md'
          >
            Чоловіча колекція
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src='/images/hero/hero_women.jpg'
          alt='Mens hero'
          width='1920'
          height='850'
          className=' min-h-[550px] bg-no-repeat object-cover object-center'
          priority
        />
        <div className=' absolute bottom-[210px] left-[133px] z-[1] flex flex-col max-lg:bottom-[125px] max-lg:left-[35px] max-md:bottom-[65px] max-sm:left-[10px]'>
          <h1 className='decoration-transparent mb-8 max-w-[650px] animate-heroText bg-mid-grey bg-clip-text text-start font-exo_2 text-[56px] drop-shadow-hero max-md:text-2xl'>
            Нова жіноча колекція вже в магазині
          </h1>
          <Link
            href='/zhinky'
            className='w-[300px] rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300  hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-sm:w-[250px] max-sm:text-md'
          >
            Жіноча колекція
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src='/images/hero/hero_kids.jpg'
          alt='Mens hero'
          width='1920'
          height='850'
          className=' min-h-[550px] bg-no-repeat object-cover object-center'
          priority
        />
        <div className=' absolute bottom-[210px] left-[133px] z-[1] flex flex-col max-lg:bottom-[125px] max-lg:left-[35px] max-md:bottom-[65px] max-sm:left-[10px]'>
          <h1 className='decoration-transparent mb-8 max-w-[650px] animate-heroText bg-mid-grey bg-clip-text text-start font-exo_2 text-[56px] drop-shadow-hero max-md:text-2xl'>
            Нова дитяча колекція вже в магазині
          </h1>
          <Link
            href='/dity'
            className='w-[300px] rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300  hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-sm:w-[250px] max-sm:text-md'
          >
            Дитяча колекція
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default HeroBanner
