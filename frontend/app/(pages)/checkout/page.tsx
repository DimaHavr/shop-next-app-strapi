import React from 'react'

import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'

import CheckoutSection from './(components)/CheckoutSection'

const Checkout = () => {
  const breadCrumbArr = [
    {
      slug: `/checkout`,
      title: 'Оформлення покупок',
    },
  ]
  return (
    <main className='mt-[89px] flex-auto '>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <CheckoutSection />
      <SubscribeSection />
    </main>
  )
}

export default Checkout
