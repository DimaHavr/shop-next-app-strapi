'use client'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { FaBars, FaHeart, FaOpencart, FaSearch } from 'react-icons/fa'

import Cart from '../(components)/Cart/Cart'
import SearchBar from '../(components)/SearchBar'
import SearchInput from '../(components)/SearchInput'
import { useWindowSize } from '../(hooks)/useWindowResize'
import { setShowCart } from '../(redux)/cart/cartSlice'
import { selectShowCart } from '../(redux)/cart/selectors'
import { useAppDispatch, useAppSelector } from '../(redux)/hooks'
import MobileMenu from './(components)/MobileMenu'

export const Header: React.FC = () => {
  const showCart = useAppSelector(selectShowCart)
  const dispatch = useAppDispatch()
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const toggleSearchBar = useCallback(() => {
    setShowSearchBar(prev => !prev)
  }, [])


  const screenSize = useWindowSize()
  return (
    <header className='padding-lock max-md fixed left-0 top-0 z-50 flex w-full items-center  bg-footer-gradient-linear-green '>
      <nav
        className='container mx-auto flex w-full items-center  justify-between py-4 max-md:justify-between lg:px-0'
        aria-label='Global'
      >
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
            className='flex h-auto w-[155px] max-md:hidden'
            src='/logoText.svg'
            alt='logo'
            width='0'
            height='0'
            priority
          />
        </Link>

        <ul className=' hidden gap-12 max-xl:gap-6 lg:flex'>
          <li>
            <Link
              href='/choloviky'
              className='font-exo_2 text-lg font-semibold text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
            >
              Чоловіки
            </Link>
          </li>
          <li>
            <Link
              href='/zhinky'
              className='font-exo_2 text-lg font-semibold  text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
            >
              Жінки
            </Link>
          </li>
          <li>
            <Link
              href='/dity'
              className='font-exo_2 text-lg font-semibold text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
            >
              Діти
            </Link>
          </li>
          <li>
            <Link
              href='/blog'
              className='font-exo_2 text-lg font-semibold text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
            >
              Блог
            </Link>
          </li>
        </ul>
        <div className='flex items-center gap-8 max-md:gap-6 max-sm:gap-3'>
          {screenSize.width > 767 ? (
            <SearchInput />
          ) : (
            <button aria-label='Пошук' type='button' onClick={toggleSearchBar}>
              <FaSearch
                color='#fff'
                className=' transition-opacity   hover:opacity-80 focus:opacity-80'
                size={25}
              />
            </button>
          )}
          <Link href='/favorites'>
            <FaHeart
              color='#fff'
              className='transition-opacity hover:opacity-80  focus:opacity-80'
              size={30}
            />
          </Link>
          <button
            aria-label='Кошик'
            type='button'
            onClick={() => dispatch(setShowCart(true))}
          >
            <FaOpencart
              color='#fff'
              className='transition-opacity hover:opacity-80  focus:opacity-80'
              size={40}
            />
          </button>
          <button
            aria-label='Меню'
            type='button'
            className='text-gray-700 -m-2.5 hidden cursor-pointer items-center justify-center rounded-md p-2.5 transition-opacity hover:opacity-80 focus:opacity-80  max-lg:block md:pl-8'
            onClick={toggleMobileMenu}
          >
            <FaBars className='h-8 w-8' aria-hidden='true' color='#fff' />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu toggleMobileMenu={toggleMobileMenu} />}
      </AnimatePresence>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
      <AnimatePresence>
        {showSearchBar && (
          <SearchBar
            toggleSearchBar={toggleSearchBar}
          />
        )}
      </AnimatePresence>
    </header>
  )
}
