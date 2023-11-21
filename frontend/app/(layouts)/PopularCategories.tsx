'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface PopularCategory {
  id: number
  attributes: {
    title: string
    img: {
      data: {
        attributes: {
          url: string
          alt: string
          width: number
          height: number
        }
      }
    }
    page: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    category: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    slug: string
  }
}

interface PopularCategoriesProps {
  popularCategoriesData: {
    data: PopularCategory[]
  }
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({
  popularCategoriesData,
}) => {
  return (
    <section className='bg-light-grey py-14'>
      <div className='container flex flex-col items-center justify-center gap-4 text-center'>
        <p className=' max-w-[600px] py-4 text-center font-exo_2 text-2xl font-semibold text-black-dis '>
          Популярні категорії сезону
        </p>
        <Swiper
          grabCursor
          initialSlide={3}
          centeredSlides
          loop
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1560: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation, Pagination]}
          className='new-arrivals-slider bg-light-grey'
        >
          {popularCategoriesData.data.map(item => {
            const imageUrl: string =
              item.attributes.img?.data?.attributes?.url || 'fallback-url'
            return (
              <SwiperSlide key={item.id} style={{ backgroundColor: '#E5E8ED' }}>
                <div className=' my-6 mb-10 flex justify-center '>
                  <Link
                    href={`/${item.attributes.page.data.attributes.slug}/${item.attributes.category.data.attributes.slug}/${item.attributes.slug}`}
                    className='flex h-auto  w-[150px] flex-col items-center justify-center gap-2 rounded-[100%]  transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03]'
                  >
                    <Image
                      className=' h-[200px] min-w-[200px] rounded-[100%] object-cover shadow-box'
                      src={imageUrl}
                      alt={item.attributes.img.data.attributes.alt}
                      width={item.attributes.img.data.attributes.width}
                      height={item.attributes.img.data.attributes.height}
                    />
                    <h2 className=' w-full font-exo_2 text-md font-semibold text-black-dis '>
                      {item.attributes.title}
                    </h2>
                  </Link>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}

export default PopularCategories
