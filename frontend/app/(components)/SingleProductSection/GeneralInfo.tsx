/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */

'use client'

import 'photoswipe/style.css'

import { Accordion, AccordionItem, Select, SelectItem } from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import PhotoSwipe from 'photoswipe'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { HiMinus, HiPlus } from 'react-icons/hi'

import { onAdd } from '@/app/(redux)/cart/cartSlice'
import {
  addToFavoritesList,
  removeFavoritesList,
} from '@/app/(redux)/favorites/favoritesSlice'
import { selectFavoritesProducts } from '@/app/(redux)/favorites/selectors'
import { useAppDispatch, useAppSelector } from '@/app/(redux)/hooks'

import type { ProductItem } from '../ProductsSection/ProductsList'

export interface ProductItemProps {
  productItem: ProductItem
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare namespace PhotoSwipe {
  interface Options {
    dataSource: Item[]
    showHideAnimationType: 'zoom' | 'none' | 'fade' | undefined
    showAnimationDuration: number
    hideAnimationDuration: number
  }

  interface Item {
    src: string
    width: number
    height: number
    alt?: string
    title?: string
    index?: number
  }
}

const GeneralInfo: React.FC<ProductItemProps> = ({
  productItem,
  setActiveTab,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    `${productItem.attributes.img.data[0]?.attributes.url}`,
  )
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const [color, setColor] = useState<string>('')
  const [size, setSize] = useState<string>('')

  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()
  const favoritesProducts = useAppSelector(selectFavoritesProducts)
  const isFavorite = favoritesProducts.some(
    favorite => favorite.id === productItem.id,
  )
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
        quantity,
        color: color.toString(),
        size: size.toString(),
      }),
    )
    setQuantity(1)
    setColor('')
    setSize('')
  }

  const incQty = () => {
    setQuantity(quantity + 1)
  }

  const decQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const options: Partial<PhotoSwipe.Options> & { index?: number } = {
    dataSource: productItem.attributes.img.data.map(item => ({
      src: item.attributes.url,
      width: item.attributes.width,
      height: item.attributes.height,
      alt: 'photo',
    })),
    showHideAnimationType: 'zoom',
    showAnimationDuration: 500,
    hideAnimationDuration: 500,
  }

  const handleClick = () => {
    options.index = currentSlideIndex
    const pswp = new PhotoSwipe(options)
    pswp.init()
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

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }
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
  return (
    <div className='mt-8 flex justify-between gap-8 max-lg:flex-col max-lg:justify-center'>
      <div className='relative flex max-w-[600px] flex-col items-center justify-start max-xl:max-w-full'>
        {selectedImage && (
          <Image
            className={`${
              productItem.attributes.img.data.length > 1 && 'rounded-b-2xl'
            } h-auto min-w-[600px]   cursor-pointer object-contain shadow-xl max-xl:max-w-full max-lg:min-w-full max-lg:max-w-full`}
            src={selectedImage}
            width={500}
            height={600}
            alt='selected-image'
            onClick={handleClick}
          />
        )}

        {productItem.attributes.img.data.length > 1 && (
          <ul className='absolute bottom-0 left-0 flex w-full justify-center gap-4 overflow-auto rounded-b-2xl bg-modal-overlay  shadow-xl  max-lg:justify-center'>
            {productItem.attributes.img.data.map((item, index) => (
              <li
                key={item.attributes.url}
                onClick={() => {
                  handleImageClick(item.attributes.url)
                  setCurrentSlideIndex(index)
                }}
              >
                <Image
                  className='h-auto min-w-[100px] cursor-pointer'
                  src={item.attributes.url}
                  width={230}
                  height={340}
                  alt='thumbnail'
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className=' flex w-[600px] flex-col gap-[30px] max-xl:max-w-[380px] max-lg:w-full max-lg:max-w-full max-md:items-center max-md:gap-4'>
        <h2 className='font-exo_2 text-2xl font-semibold max-md:text-md'>
          {productItem.attributes.title}
        </h2>
        <div className='flex w-full items-start justify-between gap-4 max-md:flex-col-reverse max-md:justify-start'>
          <p className='flex items-baseline gap-1  font-exo_2 text-lg uppercase'>
            {productItem.attributes.discount && (
              <span className='text-base text-[red] line-through'>
                {oldPrice.toFixed(2)}
              </span>
            )}
            {productItem.attributes.price} uah
          </p>
          <button
            type='button'
            className='flex items-center justify-center self-end'
            onClick={() => setActiveTab('ProductReviews')}
          >
            <Rating style={{ maxWidth: 130 }} value={averageRating} readOnly />
            <span className='font-exo_2 text-lg'>({reviewQty})</span>
          </button>
        </div>
        <div className='flex w-full max-w-xs flex-col gap-2'>
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
        <div className='flex w-full max-w-xs flex-col gap-2'>
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
        <div className='flex w-[130px]  justify-center gap-2 rounded border-[1px] border-b-primary-green py-[10px] text-center text-lg font-bold text-primary-green shadow-box'>
          <button
            className='transition-all duration-150 hover:scale-[1.05] focus:scale-[1.05]'
            type='button'
          >
            <HiMinus size={30} onClick={decQty} />
          </button>
          <span className='w-[30px]'>{quantity}</span>
          <button
            className='transition-all duration-150 hover:scale-[1.05] focus:scale-[1.05]'
            type='button'
          >
            <HiPlus size={30} onClick={incQty} />
          </button>
        </div>
        <div className=' flex justify-between gap-8 max-md:w-full max-md:flex-col'>
          <button
            onClick={handleAddToCart}
            type='button'
            className='w-[300px] rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300 hover:scale-[1.03]  hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-md:w-full'
          >
            Купити
          </button>
          <div className=' flex items-center justify-center'>
            {isFavorite ? (
              <AnimatePresence>
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1.1,
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  type='button'
                  onClick={() => handleRemoveFromFavorites(productItem.id)}
                  className='flex items-center justify-center gap-2'
                >
                  <p className='font-exo_2 text-lg font-bold'>
                    Усунути з улюбленого
                  </p>
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
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1.1,
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  type='button'
                  onClick={() => handleAddToFavorites(productItem)}
                  className='flex items-center justify-center gap-2'
                >
                  <p className='font-exo_2 text-lg font-bold'>
                    Додати в улюблене
                  </p>
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
        <Accordion
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: 'auto',
                transition: {
                  height: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: 'ease',
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: 'ease',
                    duration: 0.25,
                  },
                  opacity: {
                    easings: 'ease',
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          <AccordionItem
            key='1'
            aria-label='Повернення і обмін'
            title='Повернення і обмін'
            className=' font-exo_2 text-md'
          >
            Протягом 14 днів з моменту покупки ви можете обміняти або повернути
            товар, який не підійшов. Для здійснення процедур обміну та
            повернення товар має бути збережений у вигляді, в якому був
            доставлений отримувачу з наявними бирками та етикетками виробника. У
            разі повернення чи обміну товару витрати за доставку сплачує
            покупець. Якщо клієнт повертає товар через помилку бренду чи брак –
            ми повністю покриваємо витрати за послуги служби доставки. Більш
            детально ознайомитися з умовами можна у розділі «Повернення та
            обмін» Будь ласка, перш ніж повертати товар, зв’яжіться з нами —
            наші менеджери проінформують вас щодо всіх умов щоб заощадити ваш
            час.
          </AccordionItem>
          <AccordionItem
            key='2'
            aria-label='Оплата і доставка'
            title='Оплата і доставка'
            className=' font-exo_2 text-md'
          >
            Ви можете оплатити замовлення одним із доступних способів: сервіс
            миттєвих платежів LiqPay, безготівковий розрахунок за реквізитами
            рахунку для оплати або PayPal, післяплатою при отриманні замовлення
            за передплатою. Ми доставляємо товари по всій Україні за допомогою
            служби «Нова Пошта». Відправка замовлення здійснюється протягом 1-4
            днів, за наявності товару на складі. У разі, якщо товару немає в
            наявності, наш менеджер повідомить вам срок виготовлення виробу та
            доставки. Отримати замовлення ви зможете у найближчих відділеннях та
            поштоматах «Нової Пошти» або скориставшись послугою доставки
            кур’єром за зручною вам адресою. Доставку сплачує замовник згідно з
            тарифами перевізника. Послуга безкоштовної доставки до відділення чи
            поштомату по Україні діє при замовленні від 2500 грн за умови повної
            оплати. Відправка міжнародних замовлень здійснюється за допомогою
            логістичної служби «Укрпошта» за єдиним фіксованим тарифом — 800
            грн. Орієнтовний срок доставки 10-20 днів з моменту відправки
            замовлення. Більш детально ознайомитися з умовами можна у розділі
            «Оплата і доставка»
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default GeneralInfo
