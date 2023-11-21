'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { DotLoader } from 'react-spinners'

const Loader = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.1 } }}
        exit={{ transition: { duration: 0.1 } }}
        className='item-center fixed left-1/2 top-1/2 z-50 flex  h-full w-full -translate-x-1/2 -translate-y-1/2 justify-center bg-modal-overlay'
      >
        <div className='absolute left-1/2 top-1/2 z-50   -translate-x-1/2 -translate-y-1/2'>
          <DotLoader size={70} color='#F8FCFF' />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
export default Loader
