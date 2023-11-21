import Image from 'next/image'
import Link from 'next/link'

const imagesData = [
  {
    title: 'Жінки',
    href: '/zhinky',
    src: '/images/category/women.webp',
    alt: 'women',
    width: 390,
    height: 390,
  },
  {
    title: 'Чоловіки',
    href: '/choloviky',
    src: '/images/category/mens.webp',
    alt: 'mens',
    width: 390,
    height: 390,
  },
  {
    title: 'Діти',
    href: '/dity',
    src: '/images/category/kids.webp',
    alt: 'kids',
    width: 390,
    height: 390,
  },
]

const CategoriesSection = () => {
  return (
    <section className=' flex  max-md:pt-14 md:h-[300px]'>
      <div className='container relative flex justify-center'>
        <ul className='flex items-center justify-center gap-10 max-lg:gap-5 max-md:flex-wrap md:absolute md:top-[-80px] md:z-10'>
          {imagesData.map(item => {
            return (
              <li key={item.alt}>
                <Link
                  href={item.href}
                  className='flex flex-col items-center justify-center rounded-2xl shadow-box transition-transform duration-300 hover:scale-[1.03]  focus:scale-[1.03]  '
                >
                  <Image
                    className='h-[320px] object-cover max-[800px]:w-[220px] max-md:w-[300px]'
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    priority
                  />
                  <h2 className=' py-4 font-exo_2 text-xl font-semibold text-black-dis '>
                    {item.title}
                  </h2>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default CategoriesSection
