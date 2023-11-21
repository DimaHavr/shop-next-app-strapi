'use client'

import { Input, Textarea } from '@nextui-org/react'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/(redux)/hooks'
import { setOrder } from '@/app/(redux)/order/orderSlice'
import { selectOrder } from '@/app/(redux)/order/selectors'

interface FormValues {
  [key: string]: string
}
const PersonalData = () => {
  const [formValue, setFormValue] = useState<FormValues>({})
  const order = useAppSelector(selectOrder)
  const dispatch = useAppDispatch()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormValue(prevFormValue => ({
      ...prevFormValue,
      [name]: value,
    }))
    dispatch(
      setOrder({ ...order, personalData: { ...formValue, [name]: value } }),
    )
  }
  return (
    <div className='flex flex-col justify-start gap-3'>
      <h3 className=' font-exo_2 text-xl font-bold'>2. Персональні дані</h3>
      <div className='flex flex-col'>
        <form className='flex w-full flex-wrap gap-3'>
          <Input
            isRequired
            label="Ім'я"
            variant='underlined'
            name='firstName'
            value={formValue.firstName || ''}
            onChange={handleInputChange}
            classNames={{
              label: 'font-exo_2 text-lg',
              base: 'w-[228px] max-md:w-full',
            }}
          />
          <Input
            isRequired
            variant='underlined'
            label='По батькові'
            name='middleName'
            value={formValue.middleName || ''}
            onChange={handleInputChange}
            classNames={{
              label: 'font-exo_2 text-lg',
              base: 'w-[228px] max-md:w-full',
            }}
          />
          <Input
            isRequired
            variant='underlined'
            label='Прізвище'
            name='lastName'
            value={formValue.lastName || ''}
            onChange={handleInputChange}
            classNames={{
              label: 'font-exo_2 text-lg',
              base: 'w-[228px] max-md:w-full',
            }}
          />
          <Input
            isRequired
            variant='underlined'
            label='Телефон'
            name='phone'
            title='+380'
            value={formValue.phone || ''}
            onChange={handleInputChange}
            classNames={{
              label: 'font-exo_2 text-lg',
              base: 'w-[228px] max-md:w-full',
            }}
          />
          <Input
            variant='underlined'
            label='Email'
            name='email'
            title=''
            value={formValue.email || ''}
            onChange={handleInputChange}
            classNames={{
              label: 'font-exo_2 text-lg',
              base: 'w-[228px] max-md:w-full',
            }}
          />
          <Textarea
            variant='underlined'
            label='Коментар до замовлення'
            name='comment'
            value={formValue.comment || ''}
            onChange={handleInputChange}
            classNames={{
              label: 'font-exo_2 text-lg',
              base: 'w-full',
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default PersonalData
