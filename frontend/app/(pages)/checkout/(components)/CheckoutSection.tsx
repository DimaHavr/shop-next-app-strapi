'use client'

import { useRouter } from 'next/navigation'

import { selectCartItems, selectTotalPrice } from '@/app/(redux)/cart/selectors'
import { useAppSelector } from '@/app/(redux)/hooks'

import CheckoutItemReview from './CheckoutItemReview'
import DeliverySection from './DeliverySection'
import OrderTotals from './OrderTotals'
import PaymentSection from './PaymentSection'
import PersonalData from './PersonalData'

const CheckoutSection = () => {
  const router = useRouter()
  const cartItems = useAppSelector(selectCartItems)
  const totalPrice = useAppSelector(selectTotalPrice)

  return cartItems.length === 0 ? (
    <>{router.replace('/')}</>
  ) : (
    <section className='pb-14 pt-8'>
      <div className='container relative flex w-full flex-col items-center justify-center gap-6 '>
        <div className='flex w-full items-baseline justify-between'>
          <h2 className='font-exo_2 text-2xl font-bold text-black-dis max-md:text-lg'>
            Оформлення покупок
          </h2>
          <button
            type='button'
            onClick={() => router.back()}
            className='text-end font-exo_2 text-md font-semibold text-primary-green'
          >
            Повернутися в магазин
          </button>
        </div>
        <div className='  flex w-full items-start justify-between max-xl:w-full max-xl:flex-col max-xl:justify-center'>
          <div className='flex w-[720px] flex-col gap-6 max-xl:w-full max-md:gap-3'>
            <CheckoutItemReview cartItems={cartItems} totalPrice={totalPrice} />
            <PersonalData />
            <DeliverySection />
            <PaymentSection />
          </div>
          <OrderTotals cartItems={cartItems} />
        </div>
      </div>
    </section>
  )
}

export default CheckoutSection
