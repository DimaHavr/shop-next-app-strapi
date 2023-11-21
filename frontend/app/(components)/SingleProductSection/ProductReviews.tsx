'use client'

import { useDisclosure } from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'

import RatingFormModal from '../RatingFormModal'
import type { ProductItemProps } from './GeneralInfo'
import ProductCard from './ProductCard'

const ProductReviews: React.FC<ProductItemProps> = ({
  productItem,
  setActiveTab,
}) => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()
  const reviewQty = productItem.attributes.reviews.data.length
  const totalRating = productItem.attributes.reviews.data.reduce(
    (acc, rating) => acc + rating.attributes.rating,
    0,
  )
  const averageRating = totalRating / reviewQty

  const filteredRatings = productItem.attributes.reviews.data.filter(
    rating => rating.attributes.rating > 3,
  )
  const percentageRecommendation =
    reviewQty > 0
      ? ((filteredRatings.length / reviewQty) * 100).toFixed(0)
      : '0'
  const getReviewsText = (itemQty: number): string => {
    if (itemQty === 0) {
      return 'відгуків'
    }
    if (itemQty === 1) {
      return 'відгук'
    }
    if (itemQty >= 2 && itemQty <= 4) {
      return 'відгуки'
    }
    return 'відгуків'
  }

  return (
    <div className='mt-8 flex items-start justify-between gap-[100px] max-md:flex-wrap max-md:justify-center max-md:gap-8 '>
      <div className='flex w-full gap-12 '>
        <div className='flex w-full flex-col justify-start gap-8 '>
          <div className='flex w-full flex-col  gap-4'>
            {reviewQty > 0 ? (
              <>
                <Rating
                  style={{ maxWidth: 200 }}
                  className='text-center'
                  value={averageRating}
                  readOnly
                />
                <p className='font-exo_2 text-2xl font-semibold'>
                  {reviewQty} {getReviewsText(reviewQty)}
                </p>
                <p className='font-exo_2 text-xl font-semibold'>
                  {filteredRatings.length} з {reviewQty} (
                  {percentageRecommendation}
                  %) покупців рекомендували цей товар.
                </p>
              </>
            ) : (
              <div className='gap4 flex flex-col items-center justify-center'>
                <Rating
                  style={{ maxWidth: 200 }}
                  className='text-center'
                  value={5}
                  readOnly
                />
                <p className='text-center font-exo_2 text-xl font-semibold'>
                  Відгуків ще немає, але ми рекомендуємо цей товар.
                  <br /> Залиште свій відгук...
                </p>
              </div>
            )}
          </div>
          <div className='flex items-center justify-center'>
            <button
              onClick={onOpen}
              className=' w-[250px]  rounded-2xl bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300  hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-sm:w-[250px] max-sm:text-md'
              type='button'
            >
              Залишити відгук
            </button>
          </div>
          <ul className='flex flex-col gap-4'>
            {productItem.attributes.reviews.data.slice(0, 5).map(item => {
              const inputDate = new Date(item.attributes.createdAt)

              const formattedDate: string = inputDate.toLocaleDateString(
                'uk-UA',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )

              return (
                <li key={item.id} className='flex flex-col gap-3'>
                  <div className='flex justify-start gap-3'>
                    <div className='flex w-[105px] flex-col justify-start gap-3'>
                      <p className='font-bold'>{item.attributes.name}</p>
                      <p className='font-light'>{formattedDate}</p>
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={item.attributes.rating}
                        readOnly
                      />
                    </div>
                    <p>{item.attributes.comment}</p>
                  </div>
                  <div className=' border-b-1 border-light-grey px-0 ' />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <ProductCard productItem={productItem} setActiveTab={setActiveTab} />
      <RatingFormModal
        productId={productItem.id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

export default ProductReviews
