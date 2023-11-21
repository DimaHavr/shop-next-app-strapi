'use client'

import { useState } from 'react'

import type { ProductItem } from '../ProductsSection/ProductsList'
import GeneralInfo from './GeneralInfo'
import ProductDetails from './ProductDetails'
import ProductReviews from './ProductReviews'

export interface SingleProductSectionProps {
  productData: ProductItem
}
const SingleProductSection: React.FC<SingleProductSectionProps> = ({
  productData,
}) => {
  const [activeTab, setActiveTab] = useState<string>('GeneralInfo')
  const reviewQty = productData.attributes.reviews.data.length
  return (
    <section className='mb-14 mt-8'>
      <div className='container flex flex-col'>
        <div className="after:content-[' '] relative flex w-full gap-3 pb-3 after:absolute after:top-[70px] after:w-full after:border-b-1 after:border-[#E5E8ED] after:max-md:top-[90]">
          <button
            className={`${
              activeTab === 'GeneralInfo' &&
              'rounded border-[1px]  border-b-primary-green text-lg font-bold text-primary-green shadow-box max-md:text-sm'
            } px-[20px] py-[10px] text-center font-exo_2 text-md font-semibold transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03] max-md:px-[10px] max-md:text-sm`}
            type='button'
            onClick={() => setActiveTab('GeneralInfo')}
          >
            Основна інформація
          </button>
          <button
            className={`${
              activeTab === 'ProductDetails' &&
              'rounded border-[1px]  border-primary-green text-lg font-bold text-primary-green shadow-box max-md:text-sm'
            } px-[20px] py-[10px] text-center font-exo_2 text-md font-semibold transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03] max-md:px-[10px] max-md:text-sm`}
            type='button'
            onClick={() => setActiveTab('ProductDetails')}
          >
            Детальна інформація
          </button>
          <button
            className={`${
              activeTab === 'ProductReviews' &&
              'rounded border-[1px]  border-b-primary-green text-lg font-bold text-primary-green shadow-box max-md:text-sm'
            }  px-[25px] py-[10px] text-center font-exo_2 text-md font-semibold transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03] max-md:px-[20px] max-md:text-sm`}
            type='button'
            onClick={() => setActiveTab('ProductReviews')}
          >
            <span className='relative'>
              Відгуки
              <span className=' absolute right-[-13px] top-[-11px] font-manrope text-sm '>
                {reviewQty}
              </span>
            </span>
          </button>
        </div>

        {activeTab === 'GeneralInfo' && (
          <GeneralInfo productItem={productData} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'ProductDetails' && (
          <ProductDetails
            productItem={productData}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'ProductReviews' && (
          <ProductReviews
            productItem={productData}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </section>
  )
}

export default SingleProductSection
