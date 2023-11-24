'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchInput = () => {
  const [queryValue, setQueryValue] = useState<string>('')
  const router = useRouter()
  return (
    <form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className='flex rounded-2xl border-[1px] bg-white-dis p-1 text-mid-grey'
      >
        <input
          type='text'
          name='query'
          placeholder='Знайти...'
          value={queryValue}
          onChange={e => setQueryValue(e.target.value)}
          className='h-[35px] w-[250px] p-1 pl-2 font-exo_2 text-black-dis outline-none  focus:outline-none'
        />
        <button
          type='button'
          onClick={() => {
            router.push(`/search?query=${queryValue}`)
          }}
          className='pr-2'
          aria-label='Пошук'
        >
          <FaSearch
            color='#17696A'
            className=' transition-opacity  hover:opacity-80 focus:opacity-80 '
            size={20}
          />
        </button>
      </motion.div>
    </form>
  )
}

export default SearchInput
