/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
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

  return (
    <div className='mt-12 flex flex-col items-center justify-center gap-4'>
      <form>
        <div className='flex w-[400px] rounded-2xl border-[1px] bg-[#fff] p-1 text-mid-grey shadow-xl max-md:w-[280px]'>
          <input
            type='text'
            name='query'
            placeholder='Знайти...'
            value={queryValue}
            onChange={e => setQueryValue(e.target.value)}
            className=' h-[40px] w-full bg-[#fff] p-1 pl-2 font-exo_2 text-black-dis outline-none  focus:outline-none'
          />
          <button
            onClick={() => {
              setPageValue('')
              router.push(`/search?query=${queryValue}`)
            }}
            type='button'
            className='pr-2'
          >
            <FaSearch
              color='#17696A'
              className=' transition-opacity  hover:opacity-80 focus:opacity-80 '
              size={30}
            />
          </button>
        </div>
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
                onClick={() => {
                  router.push(
                    `/search?query=${queryValue}${
                      pageValue && ` &pageFilter=${item.title}`
                    }`,
                  )
                  setPageValue(item.title)
                }}
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
