'use client'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [queryValue, setQueryValue] = useState<string>('')
  const isSearchPage = pathname === '/search'

  return (
    <form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className='bg-white-dis text-mid-grey flex rounded-2xl border-[1px] p-1'
      >
        <input
          type='text'
          name='query'
          placeholder='Знайти...'
          value={queryValue}
          disabled={isSearchPage}
          onChange={e => setQueryValue(e.target.value)}
          className='font-exo_2 text-black-dis h-[35px] w-[250px] p-1 pl-2 outline-none  focus:outline-none'
        />
        <button
          type='button'
          disabled={isSearchPage}
          onClick={() => {
            router.push(`/search?query=${queryValue}`)
            setQueryValue('')
          }}
          className='pr-2'
          aria-label='Пошук'
        >
          <FaSearch
            color='#17696A'
            className={`${
              !isSearchPage &&
              'transition-opacity  hover:opacity-80 focus:opacity-80'
            }`}
            size={20}
          />
        </button>
      </motion.div>
    </form>
  )
}

export default SearchInput
