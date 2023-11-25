/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { Pagination, Select, SelectItem } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ImEqualizer } from 'react-icons/im'

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
  queryValue?: string
  pageFilterValue?: string
  sizeValueParams: any
  setSizeValueParams: any
  setColorValueParams: any
  colorValueParams: any
  setPriceValueParams: any
  priceValueParams: any
  pageValue: number
  sortValue: any
  setSortValue: any
  setPageValue: (page: number) => void
  totalPages: number
  filterStartData: {
    meta: {
      pagination: {
        total: number
      }
    }
    data: ProductItem[]
  }
  productsData: {
    meta: {
      pagination: {
        total: number
      }
    }
    data: ProductItem[]
  }
}

const Toolbar: React.FC<ToolbarProps> = ({
  queryValue,
  pageFilterValue,
  colorValueParams,
  setColorValueParams,
  totalPages,
  filterStartData,
  pageValue,
  sortValue,
  setPageValue,
  setSortValue,
  setPriceValueParams,
  priceValueParams,
  setSizeValueParams,
  sizeValueParams,
  productsData,
}) => {
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const [filterSidebarOpen, setFilterSidebarOpen] = useState<boolean>(false)
  const toggleFilterSidebar = useCallback(() => {
    setFilterSidebarOpen((prev: boolean) => !prev)
  }, [])

  const queryValueUrl = queryValue ? `&query=${queryValue}` : ''

  const pagesFilterValueUrl = pageFilterValue
    ? `&pageFilter=${pageFilterValue}`
    : ''
  const priceValueParamsArr = priceValueParams
    ? priceValueParams.split(',')
    : null

  const colorValueParamsArr = colorValueParams.length
    ? colorValueParams?.toString().split(',')
    : []

  const sizeValueParamsArr = sizeValueParams.length
    ? sizeValueParams?.toString().split(',')
    : []

  const priceFiltersUrl =
    priceValueParamsArr !== null
      ? `&price=${priceValueParamsArr[0]},${priceValueParamsArr[1]}`
      : ''

  const colorsFilterUrl =
    Array.isArray(colorValueParamsArr) && colorValueParamsArr.length > 0
      ? `&color=${colorValueParamsArr.map(item => item)}`
      : ''

  const sizesFilterUrl =
    Array.isArray(sizeValueParamsArr) && sizeValueParamsArr.length > 0
      ? `&size=${sizeValueParamsArr.map((item: any) => item)}`
      : ''

  const handleSelectionChangeSortValue = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = e.target.value
    setSortValue(newValue)
  }

  const handleChangePriceFilterValue = (prices: number[]) => {
    setPriceValueParams(prices.toString() || '')
  }
  const handleChangeColorFilterValue = (colors: string[]) => {
    setColorValueParams(colors.toString() || [])
  }
  const handleChangeSizeFilterValue = (sizes: string[]) => {
    setSizeValueParams(sizes.toString() || [])
  }

  useEffect(() => {
    router.push(
      `${pathname}?page=${pageValue}${queryValueUrl}${pagesFilterValueUrl}${
        sortValue === 'default' ? '' : `&sort=${sortValue}`
      }${priceFiltersUrl}${colorsFilterUrl}${sizesFilterUrl}`,
    )
    router.refresh()
  }, [sortValue, pageValue, priceFiltersUrl, colorsFilterUrl, sizesFilterUrl])

  return (
    <div
      ref={listRef}
      className='container flex flex-wrap items-center justify-center  gap-6 py-7 lg:justify-evenly'
    >
      <button
        onClick={() => setFilterSidebarOpen(true)}
        type='button'
        className='flex w-[300px] items-center justify-center  rounded-2xl bg-primary-green px-10 py-3 text-center font-exo_2 text-xl font-bold text-white-dis shadow-button transition-all duration-300  hover:scale-[1.03] hover:opacity-80 focus:scale-[1.03] focus:opacity-80 max-sm:w-[250px] max-sm:text-md'
      >
        <ImEqualizer size={30} />
        <span className='ml-3'> Фільтер</span>
      </button>
      {productsData.data.length > 0 && (
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
      )}
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
          page={Number(pageValue)}
          onChange={setPageValue}
        />
      )}
      {filterSidebarOpen && (
        <AnimatePresence>
          <FilterSidebar
            filterStartData={filterStartData}
            toggleFilterSidebar={toggleFilterSidebar}
            handleChangePriceFilterValue={handleChangePriceFilterValue}
            handleChangeColorFilterValue={handleChangeColorFilterValue}
            handleChangeSizeFilterValue={handleChangeSizeFilterValue}
            setPriceValueParams={setPriceValueParams}
            setColorValueParams={setColorValueParams}
            setSizeValueParams={setSizeValueParams}
            priceValueParamsArr={priceValueParamsArr}
            colorValueParamsArr={colorValueParamsArr}
            sizeValueParamsArr={sizeValueParamsArr}
          />
        </AnimatePresence>
      )}
    </div>
  )
}

export default Toolbar
