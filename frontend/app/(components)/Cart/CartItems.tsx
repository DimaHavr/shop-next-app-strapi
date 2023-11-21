'use client'

import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { MdRemoveCircle } from 'react-icons/md'

import { onRemove, toggleCartItemQuantity } from '@/app/(redux)/cart/cartSlice'
import { useAppDispatch } from '@/app/(redux)/hooks'

export interface CartItemProps {
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
}

const CartItems: React.FC<CartItemProps> = ({ cartItems }) => {
  const dispatch = useAppDispatch()

  return (
    <ul className=' flex h-[69vh] flex-col gap-4 overflow-y-auto'>
      {cartItems.map(item => {
        const slug = `/${item.product.attributes.page.data.attributes.slug}/${item.product.attributes.category.data.attributes.slug}/${item.product.attributes.subcategory.data.attributes.slug}/${item.product.id}`
        return (
          <li key={item.product.id} className='relative flex flex-col'>
            <div className='flex gap-2 px-4'>
              <Link
                href={slug}
                className=' line-clamp-2 pr-3 font-exo_2 text-md text-white-dis'
              >
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
                  className=' line-clamp-2 pr-3 font-exo_2 text-md text-white-dis'
                >
                  {item.product.attributes.title}
                </Link>
                <p className=' font-exo_2 text-md  text-white-dis'>
                  Колір: {item.color}
                </p>
                <p className=' font-exo_2 text-md  text-white-dis'>
                  Розмір: {item.size}
                </p>
                <div className='flex items-center gap-6'>
                  <div className='flex w-[100px]  justify-center gap-2 rounded   py-[5px] text-center text-lg font-bold text-white-dis shadow-box'>
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
                  <p className='flex items-baseline gap-1 font-exo_2 text-xl uppercase text-white-dis'>
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
                  className='absolute right-2 top-1 opacity-60'
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
  )
}

export default CartItems
