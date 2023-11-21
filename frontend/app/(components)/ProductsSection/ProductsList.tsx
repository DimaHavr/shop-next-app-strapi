'use client'

import { Rating } from '@smastrom/react-rating'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import useLocalStorage from '@/app/(hooks)/useLocalStorage '
import {
  addToFavoritesList,
  removeFavoritesList,
} from '@/app/(redux)/favorites/favoritesSlice'
import { selectFavoritesProducts } from '@/app/(redux)/favorites/selectors'
import { useAppDispatch, useAppSelector } from '@/app/(redux)/hooks'

import EmptySection from '../EmptySection'
import Toolbar from './Toolbar'

export interface ProductItem {
  id: number
  attributes: {
    discount?: number
    price: number
    description: string
    img: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
        }
      }[]
    }
    title: string
    sizes: {
      data: {
        id: number
        attributes: {
          size: string
        }
      }[]
    }
    colors: {
      data: {
        id: number
        attributes: {
          name: string
        }
      }[]
    }
    reviews: {
      data: {
        id: number
        attributes: {
          comment: string
          rating: number
          name: string
          createdAt: string
        }
      }[]
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
    subcategory: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    isNewProduct: boolean
  }
}

interface ProductsListProps {
  productsUrl: string
  filterStartData: {
    data: ProductItem[]
    meta: {
      pagination: {
        total: number
      }
    }
  }
  productsData: {
    data: ProductItem[]
    meta: {
      pagination: {
        total: number
      }
    }
  }
}
const ProductsList: React.FC<ProductsListProps> = ({
  productsData,
  productsUrl,
  filterStartData,
}) => {
  const dispatch = useAppDispatch()
  const favoritesProducts = useAppSelector(selectFavoritesProducts)
  const [products, setProducts] = useState({ ...productsData })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(productsData.meta.pagination.total / 12),
  )
  const [sortValue, setSortValue] = useLocalStorage<string | ''>(
    'sortValue',
    'default',
  )
  const handleSelectionChangeSortValue = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = e.target.value
    setSortValue(newValue)
  }
  const handleAddToFavorites = (product: ProductItem) => {
    dispatch(addToFavoritesList(product))
  }

  const handleRemoveFromFavorites = (productId: number) => {
    dispatch(removeFavoritesList({ id: productId }))
  }
  return productsData.data.length === 0 ? (
    <EmptySection />
  ) : (
    <>
      <Toolbar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        productsUrl={productsUrl}
        setProducts={setProducts}
        filterStartData={filterStartData}
        handleSelectionChangeSortValue={handleSelectionChangeSortValue}
        sortValue={sortValue}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
      {products.data.length === 0 ? (
        <EmptySection />
      ) : (
        <ul className='container flex flex-wrap items-center justify-center gap-6'>
          {products.data.map(item => {
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
              <li
                className='relative transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03]'
                key={item.id}
              >
                <Link
                  className=' flex w-[290px] flex-col items-center justify-center rounded-2xl shadow-box '
                  href={slug}
                >
                  <Image
                    priority
                    className='h-[300px] min-w-[200px] object-cover'
                    src={imageUrl}
                    width={item.attributes.img.data[0]?.attributes.width || 250}
                    height={
                      item.attributes.img.data[0]?.attributes.height || 300
                    }
                    alt='as'
                  />
                  <div className='flex w-full flex-col justify-start gap-2 rounded-b-2xl bg-white-dis p-2'>
                    <h3 className='line-clamp-2 text-left font-exo_2 text-md font-semibold text-black-dis '>
                      {item.attributes.title}
                    </h3>
                    <p className='flex items-baseline gap-1 font-exo_2 text-lg uppercase'>
                      {item.attributes.discount && (
                        <span className='text-base text-[red] line-through'>
                          {oldPrice.toFixed(2)}
                        </span>
                      )}
                      {item.attributes.price} uah
                    </p>
                    <div className='absolute right-2 top-2'>
                      <Rating
                        style={{ maxWidth: 90 }}
                        value={averageRating}
                        readOnly
                      />
                    </div>

                    <div className='absolute left-[-12px] top-0 z-[1] flex flex-col gap-1'>
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
                        onClick={() => handleRemoveFromFavorites(item.id)}
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
              </li>
            )
          })}
        </ul>
      )}
      <Toolbar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        productsUrl={productsUrl}
        setProducts={setProducts}
        filterStartData={filterStartData}
        handleSelectionChangeSortValue={handleSelectionChangeSortValue}
        sortValue={sortValue}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
    </>
  )
}

export default ProductsList
