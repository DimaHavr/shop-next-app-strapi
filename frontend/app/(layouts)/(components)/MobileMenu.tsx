import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { LiaViber } from 'react-icons/lia'
import { MdOutlineClose } from 'react-icons/md'

import useCustomScrollbarLock from '@/app/(hooks)/useCustomScrollbarLock'

interface MobileMenuProps {
  toggleMobileMenu: () => void
}
const MobileMenu: React.FC<MobileMenuProps> = ({ toggleMobileMenu }) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const onBackdropCloseMobileMenu = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleMobileMenu()
      }
    },
    [toggleMobileMenu],
  )

  const handleEscKeyPressContent = useCallback(
    (event: { code: string }) => {
      if (event.code === 'Escape') {
        toggleMobileMenu()
      }
    },
    [toggleMobileMenu],
  )

  useCustomScrollbarLock({ handleEscKeyPressContent })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ transition: { duration: 0.1 } }}
      ref={mobileMenuRef}
      onClick={onBackdropCloseMobileMenu}
      className='absolute left-0 top-0 z-10 h-[100vh] w-full overflow-y-auto overflow-x-hidden bg-modal-overlay'
    >
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: 500, transition: { duration: 0.3 } }}
        className='fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between bg-footer-gradient-linear-green px-4 pb-[10px] pt-[30px] sm:ring-1 md:max-w-[400px]'
      >
        <div className='flex h-[100vh] flex-col justify-between gap-[50px] overflow-auto'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              className='flex items-center gap-1 transition-opacity hover:opacity-80 focus:opacity-80 max-md:m-0  xl:mr-9'
            >
              <Image
                className='h-auto w-[55px]'
                src='/logoR.svg'
                alt='logo'
                width='0'
                height='0'
                priority
              />
              <Image
                className=' h-auto w-[155px] '
                src='/logoText.svg'
                alt='logo'
                width='0'
                height='0'
                priority
              />
            </Link>
            <button
              type='button'
              className='white-dis-700 text-center'
              onClick={toggleMobileMenu}
            >
              <MdOutlineClose
                className='h-10 w-10 fill-white-dis  transition-opacity hover:opacity-80 focus:opacity-80'
                aria-hidden='true'
              />
            </button>
          </div>
          <ul className='flex flex-col items-center gap-4 max-md:justify-center md:items-start'>
            <li className='w-full  text-center  text-white-dis'>
              <Link
                href='/choloviky'
                onClick={toggleMobileMenu}
                className='w-full  font-exo_2 text-xl font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Чоловіки
              </Link>
            </li>
            <li className='w-full  text-center  text-white-dis'>
              <Link
                href='/zhinky'
                onClick={toggleMobileMenu}
                className='font-exo_2 text-xl font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Жінки
              </Link>
            </li>
            <li className='w-full  text-center  text-white-dis'>
              <Link
                href='/dity'
                onClick={toggleMobileMenu}
                className='font-exo_2 text-xl font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Діти
              </Link>
            </li>
            <li className='w-full  text-center  text-white-dis'>
              <Link
                href='/blog'
                onClick={toggleMobileMenu}
                className='font-exo_2 text-xl font-semibold capitalize text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
          </ul>
          <ul className='mb-[50px] flex items-center justify-center gap-8'>
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
      </motion.div>
    </motion.div>
  )
}

export default MobileMenu
