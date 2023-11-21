/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import {
  setCartItems,
  setTotalPrice,
  setTotalQuantities,
} from '@/app/(redux)/cart/cartSlice'
import { selectTotalPrice } from '@/app/(redux)/cart/selectors'
import { useAppDispatch, useAppSelector } from '@/app/(redux)/hooks'
import { clearOrder, setOrder } from '@/app/(redux)/order/orderSlice'
import { selectOrder } from '@/app/(redux)/order/selectors'
import { generatedOrderId } from '@/app/(utils)/getOrderId'

export interface OrderTotalsProps {
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
const OrderTotals: React.FC<OrderTotalsProps> = ({ cartItems }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const order = useAppSelector(selectOrder)
  const totalPrice = useAppSelector(selectTotalPrice)
  const freeDelivery = totalPrice > 2500
  const orderData = useAppSelector(selectOrder)

  useEffect(() => {
    dispatch(
      setOrder({
        ...order,
        productsList: [...cartItems],
        orderId: generatedOrderId,
      }),
    )
  }, [])

  const handleClearOrder = () => {
    dispatch(clearOrder())
    dispatch(setCartItems([]))
    dispatch(setTotalPrice(0))
    dispatch(setTotalQuantities())
  }

  const handleSubmit = async () => {
    if (
      !orderData.personalData.phone ||
      !orderData.personalData.firstName ||
      !orderData.personalData.lastName ||
      !orderData.personalData.middleName
    ) {
      toast.error('Заповніть особисті дані...')
      return
    }
    if (!orderData.deliveryData.SettlementAreaDescription) {
      toast.error('Додайте відділення для достаки...')
      return
    }
    if (!orderData.paymentData) {
      toast.error('Виберіть метод оплати...')
      return
    }
    try {
      const TOKEN = '5560792411:AAErGG70RTKBdZklSlOT_TdJTMUROf_8rYU'
      const CHAT_ID = '-1001952047976'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      let message = `<b>Замовлення ${orderData.orderId}</b>\n`

      message += `\n`

      message += `<b>Дані покупця:</b>\n`

      message += `\n`

      message += `<b>Імя:</b>\n${orderData.personalData.firstName}\n`
      message += `<b>По батькові:</b>\n${orderData.personalData.middleName}\n`
      message += `<b>Прізвище:</b>\n${orderData.personalData.lastName}\n`
      message += `<b>Телефон:</b>\n${orderData.personalData.phone}\n`
      if (orderData.personalData.email) {
        message += `<b>Email:</b>\n${orderData.personalData.email}\n`
      }
      if (orderData.personalData.comment) {
        message += `<b>Коментар:</b>\n${orderData.personalData.comment}\n`
      }

      message += `\n`

      message += `<b>Дані доставки</b>\n`

      message += `\n`

      message += `<b>Область:</b>\n${orderData.deliveryData.SettlementAreaDescription}\n`
      if (orderData.deliveryData.SettlementRegionsDescription) {
        message += `<b>Район:</b>\n${orderData.deliveryData.SettlementRegionsDescription}\n`
      }
      message += `<b>Адрес:</b>\n${orderData.deliveryData.ShortAddress}\n`
      message += `<b>Відділення:</b>\n${orderData.deliveryData.Description}\n`

      message += `\n`

      message += `<b>Список продуктів:</b>\n`

      message += `\n`

      orderData.productsList.forEach(
        (
          item: {
            product: {
              id: number
              attributes: {
                price: number
                title: string
                article_number: string
                drop_shop_name: string
              }
            }
            color: string
            size: string
            quantity: number
          },
          index: number,
        ) => {
          message += `<b>Продукт ${index + 1}:</b>\n`
          message += `ID Strapi: ${item.product.id}\n`
          message += `Назва: ${item.product.attributes.title}\n`
          message += `Колір: ${item.color}\n`
          message += `Розмір: ${item.size}\n`
          message += `Кількість: ${item.quantity}\n`
          message += `Загальна вартість: ${
            item.quantity * item.product.attributes.price
          }грн\n`
          message += `Артикул: ${item.product.attributes.article_number}\n`
          message += `Назва дроп магазину: ${item.product.attributes.drop_shop_name}\n\n`
        },
      )

      message += `\n`

      message += `<b>Доставку оплачує:</b> ${
        totalPrice <= 2500 ? 'покупець' : 'магазин'
      }`

      message += `\n`

      message += `<b>Метод оплати:</b> ${
        orderData.paymentData === 'cash' ? 'при отриманні' : 'онлайн'
      }`

      message += `\n`

      message += `<b>Сума до оплати:</b> ${totalPrice}грн`

      if (orderData.paymentData === 'online') {
        toast.error('Оплату онлайн наразі не підключено...')
        return
      }
      const res = await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      if (res.status === 200) {
        if (orderData.paymentData === 'cash') {
          toast.success('Замовлення прийнято!!!')
          router.replace('/')
          handleClearOrder()
        }
      } else {
        toast.error('Виникла помилка під час надсилання')
      }
    } catch (error) {
      toast.error('Виникла помилка під час обробки запиту')
    }
  }

  return (
    <div className='sticky left-0 top-0 flex flex-col gap-8 pt-[74px] max-xl:w-full'>
      <div className='flex w-[390px] flex-col gap-3 bg-light-grey py-4 shadow-xl max-xl:w-full'>
        <h3 className=' px-4 font-exo_2 text-xl font-bold'>
          Підсумки замовлення
        </h3>
        <div className='border-b-1 border-white-dis/80 px-0 ' />
        <p className='flex justify-between px-4 font-exo_2 text-md font-semibold'>
          Сума покупок: <span>{totalPrice} UAH</span>
        </p>
        <p className='flex justify-between px-4 font-exo_2 text-md'>
          Вартість доставки: <span>{freeDelivery ? 'Безкоштовно' : '-'}</span>
        </p>
        <p className='flex justify-between px-4 font-exo_2 text-md'>
          Знижка покупця: <span>-</span>
        </p>
        <div className='border-b-1 border-white-dis/80 px-0 ' />
        <p className='flex items-baseline justify-between px-4 font-exo_2 text-md font-bold'>
          До оплати: <span className='text-xl'>{totalPrice}UAH</span>
        </p>
      </div>
      <button
        onClick={handleSubmit}
        type='button'
        className='relative w-full  bg-primary-green px-10 py-4 text-center font-exo_2 text-lg font-bold text-white-dis shadow-button transition-all duration-300 hover:scale-[1.03]  hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-md:w-full'
      >
        {orderData.paymentData === 'online'
          ? 'Замовити і оплатити'
          : 'Замовити'}
      </button>
    </div>
  )
}

export default OrderTotals
