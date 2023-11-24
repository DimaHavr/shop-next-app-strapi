import Image from 'next/image'
import React from 'react'

const EmptySection = () => {
  return (
    <section className='py-[30px]'>
      <div className='flex flex-col items-center justify-center '>
        <Image
          className='h-[300px] w-auto object-cover'
          src='/icons/empty.svg'
          width={350}
          height={400}
          alt='Кіт'
          priority
        />
        <p className=' p-3 text-center font-exo_2 text-xl'>
          Тут поки що нічого немає...
        </p>
      </div>
    </section>
  )
}

export default EmptySection
