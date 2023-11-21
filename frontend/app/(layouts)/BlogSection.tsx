import Image from 'next/image'
import Link from 'next/link'
import { FaRegComments } from 'react-icons/fa'

const BlogSection = () => {
  return (
    <section className='py-14'>
      <div className='container flex flex-col items-center justify-center'>
        <div className='mb-12 flex w-full items-start justify-between'>
          <h2 className='font-exo_2 text-2xl font-semibold text-black-dis '>
            Блог про моду
          </h2>
          <Link
            href='/blog'
            className=' border-[1px] px-8 py-4 text-center font-exo_2 text-lg font-bold text-primary-green  shadow-button transition-all duration-300 hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80'
          >
            Перейти до блогу
          </Link>
        </div>
        <ul className='flex w-full flex-wrap items-center justify-center gap-8'>
          <li>
            <Link href='/blog' className='flex flex-col gap-2'>
              <Image
                src='/images/blog/blog_1.webp'
                alt='Women hero'
                width='1920'
                height='800'
                className='h-auto max-w-[600px] object-cover object-center shadow-box max-md:w-full'
              />
              <h3
                className='max-w-[600px] overflow-hidden text-ellipsis text-lg font-bold '
                overflow-hidden
                text-ellipsis
              >
                Bag Trends for Summer 2023
              </h3>
              <div className='flex gap-2'>
                <p className="text-md text-primary-green after:h-[5px] after:border-r-[1px] after:pl-2 after:text-light-grey after:content-[''] max-sm:text-sm max-sm:after:pl-1">
                  Fashion
                </p>

                <p className="text-md text-primary-green after:h-[5px] after:border-r-[1px] after:pl-2 after:text-light-grey after:content-[''] max-sm:text-sm max-sm:after:pl-1">
                  August 8, 2023
                </p>
                <p className='flex gap-2 text-md text-primary-green max-sm:text-sm'>
                  <FaRegComments size={20} color='#17696A' />
                  <span>No comments</span>
                </p>
              </div>
              <p className='h-[50px] max-w-[600px] overflow-hidden text-ellipsis text-start text-md font-medium max-md:h-[80px]'>
                Ipsum aliquet nisi, hendrerit rhoncus quam tortor, maecenas
                faucibus. Tincidunt aliquet sit vel, venenatis nulla. Integer
                bibendum turpis convallis...
              </p>
            </Link>
          </li>
          <li>
            <Link href='/blog' className='flex flex-col gap-2'>
              <Image
                src='/images/blog/blog_2.webp'
                alt='Women hero'
                width='1920'
                height='800'
                className='h-auto max-w-[600px] overflow-hidden text-ellipsis object-cover object-center shadow-box max-md:w-full'
              />
              <h3 className='max-w-[600px] overflow-hidden text-ellipsis text-lg font-bold'>
                Bag Trends for Summer 2023
              </h3>
              <div className='flex gap-2 max-sm:gap-1'>
                <p className="text-md text-primary-green after:h-[5px] after:border-r-[1px] after:pl-2 after:text-light-grey after:content-[''] max-sm:text-sm max-sm:after:pl-1">
                  Fashion
                </p>

                <p className="text-md text-primary-green after:h-[5px] after:border-r-[1px] after:pl-2 after:text-light-grey after:content-[''] max-sm:text-sm max-sm:after:pl-1">
                  August 8, 2023
                </p>
                <p className='flex gap-2 text-md text-primary-green max-sm:text-sm'>
                  <FaRegComments size={20} color='#17696A' />
                  <span>No comments</span>
                </p>
              </div>
              <p className='h-[50px] max-w-[600px] overflow-hidden text-ellipsis text-start text-md font-medium max-md:h-[80px]'>
                Ipsum aliquet nisi, hendrerit rhoncus quam tortor, maecenas
                faucibus. Tincidunt aliquet sit vel, venenatis nulla. Integer
                bibendum turpis convallis...
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default BlogSection
