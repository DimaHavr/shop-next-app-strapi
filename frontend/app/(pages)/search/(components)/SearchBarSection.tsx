'use client'

import { Field, Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FaSearch } from 'react-icons/fa'
import * as Yup from 'yup'

const SearchSchema = Yup.object().shape({
  query: Yup.string().required('Please enter a search query'),
})



const SearchBarSection = () => {
  const router = useRouter()
  return (
    <Formik
      initialValues={{
        query: '',
      }}
      validationSchema={SearchSchema}
      onSubmit={values => {
        router.push(`/search?query=${values.query}`)
        router.replace('/search')
      }}
    >
      <Form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className='flex rounded-2xl border-[1px] bg-white-dis p-1 text-mid-grey'
        >
          <Field
            type='text'
            name='query'
            placeholder='Знайти...'
            className='h-[35px] w-[250px] bg-white-dis p-1 pl-2 font-exo_2 text-black-dis outline-none  focus:outline-none'
          />
          <button type='submit' className='pr-2'>
            <FaSearch

              color='#17696A'
              className=' transition-opacity  hover:opacity-80 focus:opacity-80 '
              size={20}
            />
          </button>
        </motion.div>
        {/* <ErrorMessage
              name='query'
              component='div'
              className='mt-2 text-[red]'
            /> */}
      </Form>
    </Formik>
  )
}

export default SearchBarSection
