'use client'

import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { MdRemoveCircle } from 'react-icons/md'

import { onRemove, toggleCartItemQuantity } from '@/app/(redux)/cart/cartSlice'
import { useAppDispatch } from '@/app/(redux)/hooks'

export interface CheckoutItemProps {
  cartItems: [
    {
      product: {
        id: number
        attributes: {
          img: {
            data: [{ attributes: { url: string } }]
          }
          title: string
          price: number
          page: { data: { attributes: { slug: string } } }
          category: { data: { attributes: { slug: string } } }
          subcategory: { data: { attributes: { slug: string } } }
        }
      }
      size: string
      color: string
      quantity: number
    },
  ]
  totalPrice: number
}
const CheckoutItemReview: React.FC<CheckoutItemProps> = ({
  cartItems,
  totalPrice,
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className='flex flex-col justify-start gap-6'>
      <h3 className=' font-exo_2 text-xl font-bold'>1. Огляд товару</h3>
      <div className='flex flex-col rounded-2xl bg-light-grey py-6 shadow-xl'>
        <ul className='flex max-h-[600px]  flex-col gap-4 overflow-y-auto '>
          {cartItems.map(item => {
            const slug = `/${item.product.attributes.page.data.attributes.slug}/${item.product.attributes.category.data.attributes.slug}/${item.product.attributes.subcategory.data.attributes.slug}/${item.product.id}`

            return (
              <li key={item.product.id} className='relative flex flex-col'>
                <div className='flex gap-2 px-8'>
                  <Link href={slug} className=' pr-3 font-exo_2 text-md'>
                    {item.product.attributes.img && (
                      <Image
                        className='h-[120px] w-[120px] cursor-pointer object-cover '
                        src={item.product.attributes.img.data[0].attributes.url}
                        width={120}
                        height={120}
                        alt={item.product.attributes.title}
                      />
                    )}
                  </Link>
                  <div className='flex flex-col gap-2'>
                    <Link
                      href={slug}
                      className=' line-clamp-1 pr-3  font-exo_2 text-md font-semibold max-md:line-clamp-2 '
                    >
                      {item.product.attributes.title}
                    </Link>
                    <p className=' font-exo_2 text-md  '>Колір: {item.color}</p>
                    <p className=' font-exo_2 text-md  '>Розмір: {item.size}</p>
                    <div className='flex items-center gap-6'>
                      <div className='flex w-[100px]  justify-center gap-2 rounded   py-[5px] text-center text-lg font-bold  shadow-box'>
                        <button
                          onClick={() =>
                            dispatch(
                              toggleCartItemQuantity({
                                id: item.product.id,
                                value: 'dec',
                              }),
                            )
                          }
                          className='transition-all duration-150 hover:scale-[1.05] focus:scale-[1.05]'
                          type='button'
                        >
                          <HiMinus size={20} />
                        </button>
                        <span className='w-[30px]'>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              toggleCartItemQuantity({
                                id: item.product.id,
                                value: 'inc',
                              }),
                            )
                          }
                          className='transition-all duration-150 hover:scale-[1.05] focus:scale-[1.05]'
                          type='button'
                        >
                          <HiPlus size={20} />
                        </button>
                      </div>
                      <p className='flex items-baseline gap-1 font-exo_2 text-xl uppercase '>
                        {item.product.attributes.price * item.quantity}Uah
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        toast.success(
                          `${item.product.attributes.title} видалено з кошика!`,
                          {
                            style: {
                              borderRadius: '10px',
                              background: 'grey',
                              color: '#fff',
                            },
                          },
                        )
                        dispatch(onRemove({ cartItem: item }))
                      }}
                      type='button'
                      className='absolute right-4 top-1 opacity-60'
                    >
                      <MdRemoveCircle size={30} color='red' />
                    </button>
                  </div>
                </div>
                <div className='border-b-1 border-white-dis/80 px-0 pt-4' />
              </li>
            )
          })}
        </ul>
        <p className='px-6 pt-4 text-right font-exo_2 text-lg font-extrabold'>
          Сума замовлення:
          <span className='ml-2 font-exo_2 text-xl uppercase'>
            {totalPrice}Uah
          </span>
        </p>
      </div>
    </div>
  )
}

export default CheckoutItemReview
