'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Rating } from '@smastrom/react-rating'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { ProductItem } from '../(components)/ProductsSection/ProductsList'
import {
  addToFavoritesList,
  removeFavoritesList,
} from '../(redux)/favorites/favoritesSlice'
import { selectFavoritesProducts } from '../(redux)/favorites/selectors'
import { useAppDispatch, useAppSelector } from '../(redux)/hooks'

interface NewArrivalsSectionProps {
  newProductsData: {
    data: ProductItem[]
  }
}
const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  newProductsData,
}) => {
  const dispatch = useAppDispatch()
  const favoritesProducts = useAppSelector(selectFavoritesProducts)
  const handleAddToFavorites = (product: ProductItem) => {
    dispatch(addToFavoritesList(product))
  }

  const handleRemoveFromFavorites = (productId: number) => {
    dispatch(removeFavoritesList({ id: productId }))
  }
  return (
    <section className='py-14'>
      <div className='container flex flex-col items-center justify-center gap-4 text-center'>
        <p className=' max-w-[600px] py-4 text-center font-exo_2 text-2xl font-semibold text-black-dis '>
          Ознайомтеся з нашими останніми надходженнями на майбутній сезон
        </p>
        <Swiper
          effect='coverflow'
          grabCursor
          initialSlide={3}
          centeredSlides
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: false,
          }}
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
              slidesPerView: 4,
            },
            1560: {
              slidesPerView: 7,
            },
          }}
          modules={[Navigation, EffectCoverflow, Pagination]}
          className='new-arrivals-slider'
        >
          {newProductsData.data.map(item => {
            const isFavorite = favoritesProducts.some(
              favorite => favorite.id === item.id,
            )
            let discountPercentage: number = NaN
            if (item.attributes.discount) {
              discountPercentage = item.attributes.discount * 0.01
            }
            const oldPrice =
              item.attributes.price + item.attributes.price * discountPercentage
            const slug = `/${item.attributes.page.data.attributes.slug}/${item.attributes.category.data.attributes.slug}/${item.attributes.subcategory.data.attributes.slug}/${item.id}`
            const imageUrl =
              item.attributes.img?.data[0]?.attributes?.url || 'fallback-url'
            const reviewQty = item.attributes.reviews.data.length
            const totalRating = item.attributes.reviews.data.reduce(
              (acc, rating) => acc + rating.attributes.rating,
              0,
            )
            const averageRating = totalRating / reviewQty
            return (
              <SwiperSlide key={item.id}>
                <div className='relative mb-12 mt-4 flex justify-center transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03]'>
                  <Link
                    className='justify-center rounded-2xl shadow-box '
                    href={slug}
                  >
                    <Image
                      className='h-[300px] min-w-[300px] object-cover max-[300px]:min-w-[280px]'
                      src={imageUrl}
                      width={item.attributes.img.data[0]?.attributes.width}
                      height={item.attributes.img.data[0]?.attributes.height}
                      alt={item.attributes.title}
                      priority
                    />
                    <div className='flex w-full flex-col justify-start gap-1 rounded-b-2xl bg-white-dis p-3'>
                      <p
                        className={`flex items-baseline gap-1 font-exo_2 ${
                          item.attributes.discount
                            ? 'text-[red]'
                            : 'text-black-dis'
                        }  text-lg uppercase`}
                      >
                        {item.attributes.discount && (
                          <span className='text-base text-black-dis line-through'>
                            {oldPrice.toFixed(2)}
                          </span>
                        )}
                        {item.attributes.price} uah
                      </p>
                      <h3 className='line-clamp-2 text-left font-exo_2 text-md font-semibold text-black-dis '>
                        {item.attributes.title}
                      </h3>

                      <div className='absolute right-[12px] top-2 max-xl:right-[-46px] max-md:right-[34px] max-sm:right-[6px]'>
                        <Rating
                          style={{ maxWidth: 90 }}
                          value={averageRating}
                          readOnly
                        />
                      </div>

                      <div className='absolute left-[-4px] top-0 z-[1] flex flex-col gap-1 max-md:left-[10px]'>
                        {item.attributes.isNewProduct === true && (
                          <span className='  flex h-[35px] items-center justify-center rounded-[16px] bg-light-blue px-[15px] font-exo_2 text-md uppercase text-white-dis shadow-button'>
                            new
                          </span>
                        )}
                        {item.attributes.discount && (
                          <span className='  flex h-[35px] items-center justify-center rounded-[16px] bg-[#c82128] px-[15px] font-exo_2 text-md text-white-dis shadow-button'>
                            {`-${item.attributes.discount}%`}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className='absolute right-[16px] top-[250px] z-[1] flex items-center justify-center rounded-[50%] bg-white-dis p-3 shadow-box max-md:right-[36px]'>
                    {isFavorite ? (
                      <AnimatePresence>
                        <motion.button
                          initial={{ scale: 0.8 }}
                          animate={{
                            scale: 1.1,
                            transition: { duration: 0.3 },
                          }}
                          exit={{ scale: 0.8, transition: { duration: 0.3 } }}
                          type='button'
                          onClick={() => handleRemoveFromFavorites(item.id)}
                          aria-label='Видалити з улюлених'
                        >
                          <FaHeart
                            color='#17696A'
                            className='transition-all  duration-300 hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80'
                            size={30}
                          />
                        </motion.button>
                      </AnimatePresence>
                    ) : (
                      <AnimatePresence>
                        <motion.button
                          initial={{ scale: 0.8 }}
                          animate={{
                            scale: 1,
                            transition: { duration: 0.3 },
                          }}
                          exit={{ scale: 0.8, transition: { duration: 0.3 } }}
                          type='button'
                          onClick={() => handleAddToFavorites(item)}
                          aria-label='Додати до улюблених'
                        >
                          <FaRegHeart
                            color='#17696A'
                            className='transition-all  duration-300 hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80'
                            size={30}
                          />
                        </motion.button>
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}

export default NewArrivalsSection
