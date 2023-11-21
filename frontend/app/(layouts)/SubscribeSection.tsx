'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { GiCheckMark } from 'react-icons/gi'

interface CheckboxProps {
  label: string
  value: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ value, checked, onChange }) => {
  return (
    <div
      className={`${
        checked
          ? ' bg-primary-green transition-all hover:scale-[1.05] hover:opacity-80'
          : ' bg-none transition-all hover:scale-[1.05] hover:opacity-80'
      } cursor-pointer rounded-[4px] border-[1px] px-[16px] py-[6px] font-exo_2 text-mid-grey`}
    >
      <input
        className={`${checked && ' bg-primary-green'} hidden `}
        type='checkbox'
        name='category'
        value={value}
        id={value}
        checked={checked}
        onChange={onChange}
      />
      <label
        className={`${
          checked ? 'text-white-dis' : 'text-black-dis'
        } cursor-pointer `}
        htmlFor={value}
      >
        {value}
      </label>
    </div>
  )
}

const SubscribeSection: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [email, setEmail] = useState<string>('')
  const [confirm, setConfirm] = useState<boolean>(false)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value))
    } else {
      setSelectedItems([...selectedItems, value])
    }
  }

  const handleCheckboxChangeConfirm = () => {
    setConfirm(!confirm)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedItems.length === 0) {
      toast.error('Нічого не вибрано...')
      return
    }
    if (!email) {
      toast.error('Заповніть електронну пошту...')
      return
    }
    if (!confirm) {
      toast.error('Підтвердіть погодження...')
      return
    }
    try {
      const TOKEN = '5560792411:AAErGG70RTKBdZklSlOT_TdJTMUROf_8rYU'
      const CHAT_ID = '-1001952047976'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      let message = `<b>Оформлення підписки</b>\n`

      message += `<b>Вибір категорії:</b>\n${selectedItems.join(', ')}\n`
      message += `<b>Пошта:</b>\n${email}\n`

      const res = await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      if (res.status === 200) {
        toast.success('Підписка успішно надіслана')
        setEmail('')
        setSelectedItems([])
        setConfirm(false)
      } else {
        toast.error('Виникла помилка під час надсилання')
      }
    } catch (error) {
      toast.error('Виникла помилка під час обробки запиту')
    }
  }

  return (
    <section className='bg-light-grey py-14'>
      <div className='container flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <p className='text-center font-exo_2 text-md'>
              Підпишіться на оновлення
            </p>
            <p className='max-w-[550px] text-center font-exo_2 text-2xl font-semibold'>
              Підпишіться на ексклюзивний доступ до раннього розпродажу та нових
              надходжень.
            </p>
          </div>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex gap-3'>
              <Checkbox
                label='Чоловіки'
                value='Чоловіки'
                checked={selectedItems.includes('Чоловіки')}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label='Жінки'
                value='Жінки'
                checked={selectedItems.includes('Жінки')}
                onChange={handleCheckboxChange}
              />

              <Checkbox
                label='Діти'
                value='Діти'
                checked={selectedItems.includes('Діти')}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <input
                  className={`${confirm && ' bg-primary-green'} hidden `}
                  type='checkbox'
                  name='confirm'
                  required
                  value='confirm'
                  id='confirm'
                  checked={confirm}
                  onChange={handleCheckboxChangeConfirm}
                />
                <label
                  className=' h-7 w-7 cursor-pointer rounded-[4px] border-[1px] text-mid-grey  max-sm:w-10'
                  htmlFor='confirm'
                >
                  {confirm && <GiCheckMark size={25} color='#17696A' />}
                </label>
                <span className='text-sm font-medium'>
                  Я погоджуюсь отримувати повідомлення від Createx Store.
                </span>
              </div>
              <div className='max-md:flex max-md:flex-col max-md:gap-4 '>
                <input
                  type='email'
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  placeholder='Електронна пошта'
                  className='h-[50px] w-[350px] rounded-l-[4px] border-[1px] border-r-0 indent-3 text-black-dis max-md:w-full max-md:rounded-[4px] max-md:border-[1px]'
                />

                <button
                  type='submit'
                  className='border-l-none h-[50px] rounded-r-[4px] border-[1px] bg-primary-green px-6 text-primary-green transition-opacity hover:opacity-80 focus:opacity-80 max-md:w-full  max-md:rounded-[4px]'
                >
                  <span className='text-md font-semibold text-white-dis'>
                    Підписатися
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SubscribeSection
