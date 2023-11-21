import Image from 'next/image'
import Link from 'next/link'
import { LiaViber } from 'react-icons/lia'

export const Footer = () => {
  return (
    <footer className=' bg-footer-gradient-linear-green'>
      <div className='container relative flex flex-col items-start gap-[52px] py-14 md:flex-row md:justify-between md:px-0 xl:gap-[130px]'>
        <div className='z-1 absolute left-[261px] top-0 h-full w-auto md:flex'>
          <Image
            src='/background-flicker-footer-pc.svg'
            width={1008}
            height={321}
            alt='flicker'
          />
        </div>
        <div className='flex gap-3 transition-opacity hover:opacity-80 focus:opacity-80 '>
          <Link
            href='/'
            className='flex items-center gap-1 transition-opacity hover:opacity-80 focus:opacity-80 max-lg:flex-col max-md:m-0 max-md:flex-row  '
          >
            <Image
              className='h-auto w-[65px]'
              src='/logoR.svg'
              alt='logo'
              width='0'
              height='0'
              priority
            />
            <Image
              className=' h-auto w-[215px] max-lg:w-[160px]'
              src='/logoText.svg'
              alt='logo'
              width='0'
              height='0'
              priority
            />
          </Link>
        </div>
        <div className='z-10 flex max-md:w-full max-md:justify-between max-md:gap-0 md:gap-[133px]'>
          <ul className='flex flex-col items-start gap-[10px] max-md:justify-evenly'>
            <li>
              <Link
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Правила
              </Link>
            </li>
            <li>
              <Link
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Таблиці розмірів
              </Link>
            </li>
            <li>
              <Link
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Способи оплати
              </Link>
            </li>
            <li>
              <Link
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Час і способи доставки
              </Link>
            </li>
            <li>
              <Link
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Політика конфіденційності
              </Link>
            </li>
          </ul>
          <ul className='flex flex-col gap-[29px] max-md:gap-4 md:hidden'>
            <li>
              <Link
                className='flex h-12 w-12 items-center justify-center rounded-[50%] bg-white-dis uppercase '
                href='/#'
              >
                <Image
                  className='h-[25px] w-[25px]'
                  src='/icons/skill-icons_instagram.svg'
                  width='0'
                  height='0'
                  alt='Instagram icon'
                />
              </Link>
            </li>
            <li>
              <Link
                className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase '
                href='/#'
              >
                <Image
                  className='h-[25px] w-[25px]'
                  src='/icons/logos_telegram.svg'
                  width='0'
                  height='0'
                  alt='Telegram icon'
                />
              </Link>
            </li>
            <li>
              <Link
                className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase '
                href='/#'
              >
                <LiaViber size={28} fill='#8c5da7' />
              </Link>
            </li>
          </ul>
        </div>
        <div className='z-10 flex gap-24 max-md:hidden max-md:w-full  max-md:justify-center max-md:gap-0 lg:flex-row lg:gap-[130px]'>
          <ul className='flex flex-col gap-2 max-md:hidden'>
            <li>
              <Link
                href='/mens'
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Чоловіки
              </Link>
            </li>
            <li>
              <Link
                href='/women'
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Жінки
              </Link>
            </li>
            <li>
              <Link
                href='/kids'
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Діти
              </Link>
            </li>
            <li>
              <Link
                href='/blog'
                className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
          </ul>
          <div className='flex flex-col items-end gap-4   md:flex-col md:items-start md:gap-[20px] lg:flex lg:items-end lg:gap-[15px]'>
            <p className='text-center font-exo_2 text-base font-semibold uppercase tracking-wide text-white-dis  '>
              Звʼязатися з нами
            </p>
            <a
              href='tel:380631111111'
              className='text-base font-medium leading-7 tracking-wide text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
            >
              +38 050 111 11 11
            </a>

            <ul className='flex  max-md:hidden md:flex md:gap-3'>
              <li>
                <Link
                  className='flex h-12 w-12 items-center justify-center rounded-[50%] bg-white-dis uppercase  transition-opacity hover:opacity-80  focus:opacity-80 '
                  href='/#'
                  aria-label='Соціальні мережі'
                >
                  <Image
                    className='h-[25px] w-[25px]'
                    src='/icons/skill-icons_instagram.svg'
                    width='0'
                    height='0'
                    alt='Instagram icon'
                  />
                </Link>
              </li>
              <li>
                <Link
                  className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase  transition-opacity hover:opacity-80  focus:opacity-80 '
                  href='/#'
                  aria-label='Соціальні мережі'
                >
                  <Image
                    className='h-[25px] w-[25px]'
                    src='/icons/logos_telegram.svg'
                    width='0'
                    height='0'
                    alt='Telegram icon'
                  />
                </Link>
              </li>
              <li>
                <Link
                  className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase  transition-opacity hover:opacity-80  focus:opacity-80 '
                  href='/#'
                  aria-label='Соціальні мережі'
                >
                  <LiaViber size={28} fill='#8c5da7' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
