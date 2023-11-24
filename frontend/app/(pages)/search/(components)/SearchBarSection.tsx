'use client'

import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import * as Yup from 'yup'

const SearchSchema = Yup.object().shape({
  query: Yup.string().required('Please enter a search query'),
})

const SearchBarSection = () => {
  const router = useRouter()
  return (
    <div className='flex justify-center items-center mt-14'>
      <Formik
        initialValues={{
          query: '',
        }}
        validationSchema={SearchSchema}
        onSubmit={values => {
          router.push(`/search?query=${values.query}`)
        }}
      >
        <Form>
          <div className='flex w-[400px] shadow-xl rounded-2xl border-[1px] bg-[#fff] p-1 text-mid-grey'>
            <Field
              type='text'
              name='query'
              placeholder='Знайти...'
              className=' bg-[#fff] h-[40px] w-full p-1 pl-2 font-exo_2 text-black-dis outline-none  focus:outline-none'
            />
            <button type='submit' className='pr-2'>
              <FaSearch
                color='#17696A'
                className=' transition-opacity  hover:opacity-80 focus:opacity-80 '
                size={30}
              />
            </button>
          </div>
          {/* <ErrorMessage
              name='query'
              component='div'
              className='mt-2 text-[red]'
            /> */}
        </Form>
      </Formik>
    </div>
  )
}

export default SearchBarSection
