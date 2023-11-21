'use client'

import { Select, SelectItem } from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { onAdd } from '@/app/(redux)/cart/cartSlice'
import {
  addToFavoritesList,
  removeFavoritesList,
} from '@/app/(redux)/favorites/favoritesSlice'
import { selectFavoritesProducts } from '@/app/(redux)/favorites/selectors'
import { useAppDispatch, useAppSelector } from '@/app/(redux)/hooks'

import type { ProductItem } from '../ProductsSection/ProductsList'
import { type ProductItemProps } from './GeneralInfo'

const ProductCard: React.FC<ProductItemProps> = ({
  productItem,
  setActiveTab,
}) => {
  const [color, setColor] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const dispatch = useAppDispatch()
  const favoritesProducts = useAppSelector(selectFavoritesProducts)
  const isFavorite = favoritesProducts.some(
    favorite => favorite.id === productItem.id,
  )
  let discountPercentage: number = NaN
  if (productItem.attributes.discount) {
    discountPercentage = productItem.attributes.discount * 0.01
  }
  const oldPrice =
    productItem.attributes.price +
    productItem.attributes.price * discountPercentage
  const reviewQty = productItem.attributes.reviews.data.length
  const totalRating = productItem.attributes.reviews.data.reduce(
    (acc, rating) => acc + rating.attributes.rating,
    0,
  )
  const averageRating = totalRating / reviewQty

  const handleAddToFavorites = (product: ProductItem) => {
    dispatch(addToFavoritesList(product))
  }

  const handleRemoveFromFavorites = (productId: number) => {
    dispatch(removeFavoritesList({ id: productId }))
  }

  const handleAddToCart = () => {
    if (!color) {
      toast.error('Оберіть колір...', {
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
        },
      })
      return
    }

    if (!size) {
      toast.error('Оберіть розмір...', {
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
        },
      })
      return
    }

    toast.success(`${productItem.attributes.title} додано до кошика!`, {
      style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#333',
      },
    })
    dispatch(
      onAdd({
        product: productItem,
        quantity: 1,
        color: color.toString(),
        size: size.toString(),
      }),
    )
    setColor('')
    setSize('')
  }

  const handleSelectionChangeColor = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setColor(e.target.value)
  }

  const handleSelectionChangeSize = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSize(e.target.value)
  }

  return (
    <div className='relative'>
      <div className=' flex w-[360px] flex-col items-center justify-center gap-2 rounded-2xl shadow-box max-[420px]:w-[320px] max-[350px]:w-[300px] '>
        <Image
          className='h-[300px] w-full object-cover '
          src={
            productItem.attributes.img.data[0]?.attributes.url || 'fallback-url'
          }
          width={productItem.attributes.img.data[0]?.attributes.width}
          height={productItem.attributes.img.data[0]?.attributes.height}
          alt='as'
        />
        <div className='flex w-full flex-col justify-start gap-2 rounded-b-2xl bg-white-dis p-2 max-md:items-center max-md:justify-center'>
          <h3 className='line-clamp-2 text-left font-exo_2 text-md font-semibold text-black-dis '>
            {productItem.attributes.title}
          </h3>
          <p className='flex items-baseline gap-1 font-exo_2 text-lg uppercase'>
            {productItem.attributes.discount && (
              <span className='text-base text-[red] line-through'>
                {oldPrice.toFixed(2)}
              </span>
            )}
            {productItem.attributes.price} uah
          </p>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex w-[150px] max-w-xs flex-col gap-2 max-md:w-[130px]'>
              <Select
                label='Виберіть колір'
                variant='underlined'
                className='max-w-xs'
                selectedKeys={[color]}
                onChange={handleSelectionChangeColor}
              >
                {productItem.attributes.colors.data.map(item => (
                  <SelectItem
                    key={item.attributes.name}
                    value={item.attributes.name}
                  >
                    {item.attributes.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className='flex w-[150px] max-w-xs flex-col gap-2 max-md:w-[130px]'>
              <Select
                label='Виберіть розмір'
                variant='underlined'
                className='max-w-xs'
                selectedKeys={[size]}
                onChange={handleSelectionChangeSize}
              >
                {productItem.attributes.sizes.data.map(item => (
                  <SelectItem
                    key={item.attributes.size}
                    value={item.attributes.size}
                  >
                    {item.attributes.size}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            type='button'
            className='my-[10px] w-full rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300  hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-sm:w-[250px] max-sm:text-md'
          >
            Купити
          </button>
          <div className='absolute right-2 top-2'>
            <button
              type='button'
              onClick={() => setActiveTab('ProductReviews')}
            >
              <Rating
                style={{ maxWidth: 100 }}
                value={averageRating}
                readOnly
              />
            </button>
          </div>

          <div className='absolute left-[-12px] top-0 z-[1] flex flex-col gap-1'>
            {productItem.attributes.isNewProduct === true && (
              <span className='  flex h-[35px] items-center justify-center rounded-[16px] bg-light-blue px-[15px] font-exo_2 text-md uppercase text-white-dis shadow-button'>
                new
              </span>
            )}
            {productItem.attributes.discount && (
              <span className='flex h-[35px] items-center justify-center rounded-[16px] bg-[#c82128] px-[15px] font-exo_2 text-md text-white-dis shadow-button'>
                {`-${productItem.attributes.discount}%`}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='absolute right-4 top-[250px] z-[1] flex items-center justify-center rounded-[50%] bg-white-dis p-3 shadow-box'>
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
              onClick={() => handleRemoveFromFavorites(productItem.id)}
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
              onClick={() => handleAddToFavorites(productItem)}
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
  )
}

export default ProductCard
