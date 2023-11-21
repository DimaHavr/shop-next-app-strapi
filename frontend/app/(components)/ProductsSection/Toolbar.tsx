/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { Pagination, Select, SelectItem } from '@nextui-org/react'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState , useMemo} from 'react'
import { ImEqualizer } from 'react-icons/im'

import useLocalStorage from '@/app/(hooks)/useLocalStorage '
import getHeaders from '@/app/(utils)/getHeaders'

import FilterSidebar from './FilterSidebar'
import type { ProductItem } from './ProductsList'

interface ISortValue {
  label: string
  value: string
}

export const sortValues: ISortValue[] = [
  {
    label: 'За замовчуванням',
    value: 'default',
  },
  {
    label: 'Найновіше',
    value: 'latest',
  },
  {
    label: 'Найвища ціна',
    value: 'highest_price',
  },
  {
    label: 'Найнижча ціна',
    value: 'lowest_price',
  },
]

interface ToolbarProps {
  setCurrentPage: (value: number) => void
  currentPage: number
  totalPages: number
  setTotalPages: (value: number) => void
  filterStartData: {
    data: ProductItem[]
    meta: {
      pagination: {
        total: number
      }
    }
  }

  productsUrl: string
  setProducts: React.Dispatch<
    React.SetStateAction<{
      data: ProductItem[]
      meta: {
        pagination: {
          total: number
        }
      }
    }>
  >
  handleSelectionChangeSortValue: (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => void
  sortValue: string
}

export interface IFilterData {
  priceValues?: [number, number]
  colorValues?: string[]
  sizeValues?: string[]
}
const Toolbar: React.FC<ToolbarProps> = ({
  filterStartData,
  setProducts,
  productsUrl,
  handleSelectionChangeSortValue,
  sortValue,
  totalPages,
  setTotalPages,
  setCurrentPage,
  currentPage,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const listRef = useRef<HTMLDivElement>(null)

  const [filterSidebarOpen, setFilterSidebarOpen] = useState<boolean>(false)
  const [filterData, setFilterData] = useLocalStorage<IFilterData>(
    'filterData',
    {},
  )
  const minPrice: number | null = filterData?.priceValues?.[0] || null
  const maxPrice: number | null = filterData?.priceValues?.[1] || null
  const toggleFilterSidebar = useCallback(() => {
    setFilterSidebarOpen(prev => !prev)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const colorsFilterUrl = filterData.colorValues?.length
    ? filterData.colorValues
        ?.map(
          (item, index) => `&filters[colors][name][$in][${index + 1}]=${item}`,
        )
        .join('')
    : ''

  const sizesFilterUrl = filterData.sizeValues?.length
    ? filterData.sizeValues
        ?.map(
          (item, index) => `&filters[sizes][size][$in][${index + 1}]=${item}`,
        )
        .join('')
    : ''

  const sortLatestUrl = sortValue === 'latest' ? `&sort=createdAt:desc` : ''
  const sortLowestPriceUrl =
    sortValue === 'lowest_price' ? `&sort=price:asc` : ''
  const sortHighestPriceUrl =
    sortValue === 'highest_price' ? `&sort=price:desc` : ''
  const filterMinMaxPrice =
    minPrice !== null
      ? `&filters[price][$gte]=${minPrice}&filters[price][$lte]=${maxPrice}`
      : ''
  const paginationUrl = currentPage && `&pagination[page]=${currentPage}`

 const memoizedDependencies = useMemo(
   () => ({
     sortValue,
     filterData,
     currentPage,
   }),
   [sortValue, filterData, currentPage],
 )

 useEffect(() => {
   async function fetchData() {
     try {
       const url = `${productsUrl}${paginationUrl}${sortLatestUrl}${sortLowestPriceUrl}${sortHighestPriceUrl}${filterMinMaxPrice}${colorsFilterUrl}${sizesFilterUrl}`

       const res = await axios.get(
         `https://shop-strapi.onrender.com/api${url}`,
         {
           headers: getHeaders(),
         },
       )
       router.push(
         `${pathname}?page=${currentPage}${
           sortValue !== 'default' ? `&sort=${sortValue}` : ''
         }${minPrice !== null ? `&price=${minPrice},${maxPrice}` : ''}${
           filterData.colorValues?.length
             ? `&color=${filterData.colorValues}`
             : ''
         }${
           filterData.sizeValues?.length ? `&size=${filterData.sizeValues}` : ''
         }
          `,
       )
       setProducts(res.data)
       setTotalPages(Math.ceil(res.data.meta.pagination.total / 12))
     } catch (error) {
       throw new Error('Fetch error')
     }
   }
   fetchData()
 }, [memoizedDependencies])
  
  return (
    <div
      ref={listRef}
      className='container flex flex-wrap items-center justify-center  gap-6 py-7 lg:justify-evenly'
    >
      <button
        onClick={toggleFilterSidebar}
        type='button'
        className='flex w-[300px] items-center justify-center  rounded-2xl bg-primary-green px-10 py-3 text-center font-exo_2 text-xl font-bold text-white-dis shadow-button transition-all duration-300  hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-sm:w-[250px] max-sm:text-md'
      >
        <ImEqualizer size={30} />
        <span className='ml-3'> Фільтер</span>
      </button>
      <div className='flex w-[200px] flex-col gap-2'>
        <Select
          label='Сортувати'
          variant='bordered'
          className='max-w-xs'
          selectedKeys={[sortValue]}
          onChange={handleSelectionChangeSortValue}
        >
          {sortValues.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      {totalPages > 1 && (
        <Pagination
          showControls
          showShadow
          classNames={{
            wrapper: 'gap-2',
            item: 'w-8 h-8 z-1 text-primary-green font-exo_2 text-md font-bold bg-transparent',
            cursor:
              'bg-primary-green shadow-box text-white-dis font-exo_2 text-lg font-bold transition-color',
          }}
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
      {filterSidebarOpen && (
        <AnimatePresence>
          <FilterSidebar
            filterData={filterData}
            filterPriceValues={[minPrice, maxPrice]}
            filterStartData={filterStartData}
            toggleFilterSidebar={toggleFilterSidebar}
            setFilterData={setFilterData}
          />
        </AnimatePresence>
      )}
    </div>
  )
}

export default Toolbar
