'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import EmptySection from '@/app/(components)/EmptySection'
import type { ProductItem } from '@/app/(components)/ProductsSection/ProductsList'
import ProductsListItem from '@/app/(components)/ProductsSection/ProductsListItem'
import Toolbar from '@/app/(components)/ProductsSection/Toolbar'

interface SearchProductsListProps {
  queryValue: string
  pageFilterValue: string
  filterStartData: {
    data: ProductItem[]
    meta: {
      pagination: {
        total: number
      }
    }
  }
  productsData: {
    data: ProductItem[]
    meta: {
      pagination: {
        total: number
      }
    }
  }
}
const SearchProductsList: React.FC<SearchProductsListProps> = ({
  filterStartData,
  productsData,
  queryValue,
  pageFilterValue,
}) => {
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(productsData.meta.pagination.total / 12)

  const [pageValue, setPageValue] = useState<number>(
    Number(searchParams.get('page')) || 1,
  )
  const [sortValue, setSortValue] = useState(
    searchParams.get('sort') || 'default',
  )
  const [priceValueParams, setPriceValueParams] = useState(
    searchParams.get('price') || '',
  )

  const [colorValueParams, setColorValueParams] = useState<string | string[]>(
    searchParams.get('color') || [],
  )

  const [sizeValueParams, setSizeValueParams] = useState<string | string[]>(
    searchParams.get('size') || [],
  )
  return (
    <section className='pb-14'>
      <div className='container'>
        {filterStartData.data.length !== 0 && (
          <Toolbar
            productsData={productsData}
            sortValue={sortValue}
            setSizeValueParams={setSizeValueParams}
            sizeValueParams={sizeValueParams}
            setColorValueParams={setColorValueParams}
            colorValueParams={colorValueParams}
            priceValueParams={priceValueParams}
            setPriceValueParams={setPriceValueParams}
            setSortValue={setSortValue}
            totalPages={totalPages}
            pageValue={pageValue}
            setPageValue={setPageValue}
            filterStartData={filterStartData}
            queryValue={queryValue}
            pageFilterValue={pageFilterValue}
          />
        )}
        {productsData.data.length === 0 ? (
          <EmptySection />
        ) : (
          <>
            <ul className=' flex flex-wrap items-center justify-center gap-6'>
              {productsData.data.map(item => (
                <ProductsListItem key={item.id} item={item} />
              ))}
            </ul>
            <Toolbar
              productsData={productsData}
              sortValue={sortValue}
              setSizeValueParams={setSizeValueParams}
              sizeValueParams={sizeValueParams}
              setColorValueParams={setColorValueParams}
              colorValueParams={colorValueParams}
              priceValueParams={priceValueParams}
              setPriceValueParams={setPriceValueParams}
              setSortValue={setSortValue}
              totalPages={totalPages}
              pageValue={pageValue}
              setPageValue={setPageValue}
              filterStartData={filterStartData}
              queryValue={queryValue}
              pageFilterValue={pageFilterValue}
            />
          </>
        )}
      </div>
    </section>
  )
}

export default SearchProductsList
