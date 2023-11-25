/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaSearch } from 'react-icons/fa'

const pageValuesArr = [
  { title: 'Жінки', slug: 'zhinky' },
  { title: 'Чоловіки', slug: 'choloviky' },
  { title: 'Діти', slug: 'dity' },
]

const SearchBarSection = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [queryValue, setQueryValue] = useState<string>(
    searchParams.get('query') || '',
  )
  const [pageValue, setPageValue] = useState<string>(
    searchParams.get('pageFilter') || '',
  )

  useEffect(() => {
    router.push(
      `/search?query=${queryValue}${pageValue && `&pageFilter=${pageValue}`}`,
    )
  }, [pageValue])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (queryValue.trim().length < 2) {
      toast.error('Введіть мінімум три символи...')
      return
    }
    setPageValue('')
    router.push(`/search?query=${queryValue}`)
  }

  return (
    <div className='mt-8 flex flex-col items-center justify-center gap-4'>
      <form
        onSubmit={handleSubmit}
        className='flex h-[50px] w-[400px] gap-1 rounded-2xl border-[1px] text-mid-grey  shadow-xl max-md:w-[280px]'
      >
        <input
          type='search'
          name='query'
          minLength={3}
          placeholder='Знайти...'
          value={queryValue}
          onChange={e => setQueryValue(e.target.value)}
          className=' h-full w-full rounded-l-2xl pl-2 font-exo_2 text-black-dis outline-none focus:outline-none'
        />
        <button type='submit' className='pr-2'>
          <FaSearch
            color='#17696A'
            className=' transition-opacity  hover:opacity-80 focus:opacity-80 '
            size={30}
          />
        </button>
      </form>
      <ul className='flex flex-wrap justify-center gap-2'>
        {pageValuesArr.map((item: { title: string; slug: string }) => {
          return (
            <li key={item.slug}>
              <button
                type='button'
                className={`h-[40px] w-[100px]  ${
                  pageValue === item.title &&
                  'rounded-2xl border-1 border-white-dis text-white-dis shadow-box'
                }`}
                onClick={() => setPageValue(item.title)}
              >
                <span className='font-exo_2 text-md text-primary-green'>
                  {item.title}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchBarSection
