'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'

interface Subcategory {
  id: string
  attributes: {
    title: string
    slug: string
  }
}

interface Category {
  id: string
  attributes: {
    title: string
    slug: string
    page: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    subcategories: {
      data: Subcategory[]
    }
  }
}

interface CategoriesLayoutProps {
  categoriesData: {
    data: Category[]
  }
}

const CategoriesLayout: React.FC<CategoriesLayoutProps> = ({
  categoriesData,
}) => {
  return (
    <ul className="after:content-[' '] container relative mt-4 flex w-full gap-3 pb-3 after:absolute after:top-[60px] after:w-full after:border-b-1 after:border-[#E5E8ED] max-lg:justify-center max-md:items-center max-md:gap-1 ">
      {categoriesData.data.map(category => {
        return (
          <li key={category.id}>
            <div
              className={` flex items-center justify-center gap-4 px-[20px] py-[5px] text-center font-exo_2 text-md font-semibold text-primary-green transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03] max-md:gap-2 max-md:px-[10px]  max-md:py-0 max-md:text-sm max-sm:gap-1 max-sm:px-0`}
            >
              <Link
                href={`/${category.attributes.page.data.attributes.slug}/${category.attributes.slug}`}
              >
                {category.attributes.title}
              </Link>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly className=' bg-white-dis'>
                    <IoIosArrowDown size={25} className=' text-primary-green' />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Dynamic Actions'
                  items={category.attributes.subcategories.data}
                >
                  {category.attributes.subcategories.data.map(subcategory => {
                    return subcategory.attributes.title ? (
                      <DropdownItem
                        textValue='1'
                        key={subcategory.id}
                        className='transition'
                      >
                        <Link
                          className='flex'
                          href={`/${category.attributes.page.data.attributes.slug}/${category.attributes.slug}/${subcategory.attributes.slug}/`}
                        >
                          {subcategory.attributes.title}
                        </Link>
                      </DropdownItem>
                    ) : (
                      <DropdownItem key={category.id} className='transition'>
                        <p>Пусто</p>
                      </DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoriesLayout
