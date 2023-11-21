'use client'

import Link from 'next/link'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { TiHome } from 'react-icons/ti'

interface BreadcrumbProps {
  breadCrumbArr: Array<{
    slug: string
    title: string
  }>
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadCrumbArr }) => {
  return (
    <div className='flex  items-center bg-light-grey shadow-box '>
      <ul className='custom-scrollbar flex-w container flex items-center justify-start gap-3 overflow-auto whitespace-nowrap '>
        <li>
          <Link
            href='/'
            passHref
            className='flex items-center gap-3 py-2 transition duration-300 hover:opacity-80 focus:opacity-80'
          >
            <TiHome size={25} color='#17696A' />
            <MdOutlineArrowForwardIos size={15} color='#17696A' />
          </Link>
        </li>
        {breadCrumbArr.map((item, index) => (
          <li key={item.slug}>
            {index !== breadCrumbArr.length - 1 ? (
              <Link
                href={item.slug}
                passHref
                className='flex items-center gap-1 transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03]'
              >
                <p className='font-exo_2 text-md text-primary-green'>
                  {item.title}
                </p>
                <MdOutlineArrowForwardIos size={15} color='#17696A' />
              </Link>
            ) : (
              <p className='font-exo_2'>{item.title}</p>
            )}
          </li>
        ))}
      </ul>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 2px;
        }
      `}</style>
    </div>
  )
}

export default Breadcrumb
