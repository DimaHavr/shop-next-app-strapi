'use client'

import { toast } from 'react-hot-toast'
import { FaCreditCard } from 'react-icons/fa'
import { GiTakeMyMoney } from 'react-icons/gi'

import { useAppDispatch, useAppSelector } from '@/app/(redux)/hooks'
import { setOrder } from '@/app/(redux)/order/orderSlice'
import { selectOrder } from '@/app/(redux)/order/selectors'

const PaymentSection = () => {
  const dispatch = useAppDispatch()
  const orderData = useAppSelector(selectOrder)
  return (
    <div className='flex flex-col justify-start gap-4'>
      <h3 className=' font-exo_2 text-xl font-bold'>4. Метод оплати</h3>
      <div className='flex h-[70px] justify-center gap-6 max-md:my-12 max-md:flex-col'>
        <button
          onClick={() => {
            toast.success('Вибрано оплату при отриманні...', {
              style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
              },
            })
            dispatch(
              setOrder({
                ...orderData,
                paymentData: 'cash',
              }),
            )
          }}
          type='button'
          className={`${
            orderData.paymentData === 'cash' &&
            ' scale-[1.05] border-4 border-black-dis'
          } relative flex w-[320px] items-center justify-center rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300 hover:scale-[1.03]  hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-md:w-full`}
        >
          При отриманні
          <GiTakeMyMoney
            className='absolute right-6 top-1/2 -translate-y-1/2'
            size={30}
          />
        </button>
        <button
          onClick={() => {
            toast.success('Вибрано оплату онлайн...', {
              style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
              },
            })
            dispatch(
              setOrder({
                ...orderData,
                paymentData: 'online',
              }),
            )
          }}
          type='button'
          className={`${
            orderData.paymentData === 'online' &&
            ' scale-[1.05] border-4 border-black-dis'
          } relative w-[320px] rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300 hover:scale-[1.03]  hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-md:w-full`}
        >
          Оплатити онлайн
          <FaCreditCard
            className='absolute right-6 top-1/2 -translate-y-1/2'
            size={30}
          />
        </button>
      </div>
    </div>
  )
}

export default PaymentSection
