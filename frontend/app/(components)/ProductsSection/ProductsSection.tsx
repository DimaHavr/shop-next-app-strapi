import type { ProductItem } from './ProductsList'
import ProductsList from './ProductsList'

interface ProductsSectionProps {
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

const ProductsSection: React.FC<ProductsSectionProps> = ({
  productsData,
  filterStartData,
}) => {
  return (
    <section className='pb-14'>
      <ProductsList
        productsData={productsData}
        filterStartData={filterStartData}
      />
    </section>
  )
}

export default ProductsSection
