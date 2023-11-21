import { BsCreditCard2BackFill } from 'react-icons/bs'
import { FaShippingFast } from 'react-icons/fa'
import { GoShieldCheck } from 'react-icons/go'
import { MdSupportAgent } from 'react-icons/md'

const ServicesSection = () => {
  return (
    <section className='py-14'>
      <div className='container flex justify-center'>
        <ul className='flex flex-wrap items-center justify-center gap-16'>
          <li className='flex flex-col items-center justify-center gap-4'>
            <FaShippingFast size={80} color='#17696A' />
            <p className=' w-[190px] text-center font-exo_2 text-lg font-semibold'>
              Швидка доставка 1-3 дні
            </p>
          </li>
          <li className='flex flex-col items-center justify-center gap-4'>
            <MdSupportAgent size={80} color='#17696A' />
            <p className=' w-[190px] text-center font-exo_2 text-lg font-semibold'>
              Дружня підтримка клієнтів 24/7
            </p>
          </li>
          <li className='flex flex-col items-center justify-center gap-4'>
            <GoShieldCheck size={80} color='#17696A' />
            <p className=' w-[190px] text-center font-exo_2 text-lg font-semibold'>
              Гарантія повернення коштів
            </p>
          </li>
          <li className='flex flex-col items-center justify-center gap-4'>
            <BsCreditCard2BackFill size={80} color='#17696A' />
            <p className=' w-[190px] text-center font-exo_2 text-lg font-semibold'>
              Зручні методи оплати
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default ServicesSection
