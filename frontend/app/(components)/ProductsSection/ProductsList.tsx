'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import EmptySection from '../EmptySection'
import ProductsListItem from './ProductsListItem'
import Toolbar from './Toolbar'

export interface ProductItem {
  id: number
  attributes: {
    discount?: number
    price: number
    description: string
    img: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
        }
      }[]
    }
    title: string
    sizes: {
      data: {
        id: number
        attributes: {
          size: string
        }
      }[]
    }
    colors: {
      data: {
        id: number
        attributes: {
          name: string
        }
      }[]
    }
    reviews: {
      data: {
        id: number
        attributes: {
          comment: string
          rating: number
          name: string
          createdAt: string
        }
      }[]
    }
    page: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    category: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    subcategory: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    isNewProduct: boolean
  }
}

interface ProductsListProps {
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
const ProductsList: React.FC<ProductsListProps> = ({
  productsData,
  filterStartData,
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
    <>
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
      />
      {productsData.data.length === 0 ? (
        <EmptySection />
      ) : (
        <ul className='container flex flex-wrap items-center justify-center gap-6'>
          {productsData.data.map(item => (
            <ProductsListItem key={item.id} item={item} />
          ))}
        </ul>
      )}
      {productsData.data.length > 0 && (
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
        />
      )}
    </>
  )
}

export default ProductsList
