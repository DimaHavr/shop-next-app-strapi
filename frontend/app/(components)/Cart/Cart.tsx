'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { MdOutlineClose } from 'react-icons/md'

import useCustomScrollbarLock from '@/app/(hooks)/useCustomScrollbarLock'
import {
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantities,
} from '@/app/(redux)/cart/selectors'

import { setShowCart } from '../../(redux)/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '../../(redux)/hooks'
import CartItems from './CartItems'

const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const totalQuantities = useAppSelector(selectTotalQuantities)
  const cartItems = useAppSelector(selectCartItems)
  const totalPrice = useAppSelector(selectTotalPrice)

  const CartRef = useRef<HTMLDivElement>(null)
  const onBackdropCloseCart = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        dispatch(setShowCart(false))
      }
    },
    [dispatch],
  )

  const handleEscKeyPressContent = useCallback(
    (event: { code: string }) => {
      if (event.code === 'Escape') {
        dispatch(setShowCart(false))
      }
    },
    [dispatch],
  )

  useCustomScrollbarLock({ handleEscKeyPressContent })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ transition: { duration: 0.3 } }}
      ref={CartRef}
      onClick={onBackdropCloseCart}
      className='absolute left-0 top-0 z-10 h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-modal-overlay'
    >
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: 500, transition: { duration: 0.3 } }}
        className='fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between  bg-footer-gradient-linear-green  pb-[10px] pt-[20px]  md:max-w-[400px]'
      >
        <div className='flex h-full flex-col justify-between '>
          <div className='flex flex-col justify-center gap-4'>
            <div>
              <div className='flex items-end justify-between px-4'>
                <p className='font-exo_2 text-xl  text-white-dis'>
                  Корзина ({totalQuantities})
                </p>
                <button
                  type='button'
                  className='white-dis-700 text-center'
                  onClick={() => dispatch(setShowCart(false))}
                >
                  <MdOutlineClose
                    className='h-10 w-10 fill-white-dis  transition-opacity hover:opacity-80 focus:opacity-80'
                    aria-hidden='true'
                  />
                </button>
              </div>
              <div className='border-b-1 border-white-dis/80 px-0 pt-[28px]' />
            </div>
            {totalQuantities > 0 ? (
              <CartItems cartItems={cartItems} />
            ) : (
              <div className='flex flex-col items-center justify-center gap-4 pt-[200px]'>
                <p className='text-center font-exo_2 text-lg  text-white-dis'>
                  Корзина пуста, але це ніколи не пізно виправити...
                </p>
                <button
                  className='flex flex-col items-center  justify-center gap-4 font-exo_2 text-lg text-white-dis'
                  type='button'
                  onClick={() => dispatch(setShowCart(false))}
                >
                  Повернутися до магазину
                  <HiOutlineShoppingBag size={80} />
                </button>
              </div>
            )}
          </div>
          {totalQuantities > 0 && (
            <div className='flex flex-col justify-start gap-3 px-4 pb-2 '>
              <p className='font-exo_2 text-lg  text-white-dis'>
                Сума замовлення:
                <span className='ml-3 font-exo_2 text-xl uppercase text-white-dis'>
                  {totalPrice}Uah
                </span>
              </p>
              <Link
                href='/checkout'
                onClick={() => dispatch(setShowCart(false))}
                passHref
                className='rounded-2xl bg-white-dis p-4 text-center font-exo_2 text-lg font-bold text-primary-green shadow-button transition-all duration-300 hover:scale-[1.03] hover:opacity-80  focus:scale-[1.03] focus:opacity-80 max-md:w-full'
              >
                Оформити замовлення
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Cart
