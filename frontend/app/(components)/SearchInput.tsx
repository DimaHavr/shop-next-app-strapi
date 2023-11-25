'use client'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaSearch } from 'react-icons/fa'

interface SearchInputProps {
  setShowSearchBar: (value: boolean) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ setShowSearchBar }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [queryValue, setQueryValue] = useState<string>('')
  const isSearchPage = pathname === '/search'
  const handleSubmit = (e: { preventDefault: () => void })=>{
    e.preventDefault()
      if (queryValue.trim().length < 2) {
        toast.error('Введіть мінімум три символи...')
        return
      }
      router.push(`/search?query=${queryValue}`)
      setQueryValue('')
      setShowSearchBar(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className='flex gap-1 rounded-2xl border-[1px] bg-white-dis p-1 text-mid-grey'
      >
        <input
          type='search'
          name='query'
          minLength={3}
          placeholder='Знайти...'
          value={queryValue}
          disabled={isSearchPage}
          onChange={e => setQueryValue(e.target.value)}
          className='h-[35px] w-[250px] p-1 pl-2 font-exo_2 text-black-dis outline-none  focus:outline-none'
        />
        <button
          type='submit'
          disabled={isSearchPage}
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
