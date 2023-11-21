'use client'

import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'

import SearchInput from './SearchInput'

interface SearchInputProps {
  toggleSearchBar: () => void
}

const SearchBar: React.FC<SearchInputProps> = ({
  toggleSearchBar,
}) => {
  const SearchBarRef = useRef<HTMLDivElement>(null)

  const onBackdropCloseSearchBar = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleSearchBar()
      }
    },
    [toggleSearchBar],
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ transition: { duration: 0.1 } }}
      ref={SearchBarRef}
      onClick={onBackdropCloseSearchBar}
      className=' absolute left-0 top-[-90px] z-10 h-[100vh] w-full overflow-y-auto overflow-x-hidden '
    >
      <div className='absolute  top-[170px] z-10 flex  w-full items-center justify-center'>
        <SearchInput />
      </div>
    </motion.div>
  )
}

export default SearchBar
