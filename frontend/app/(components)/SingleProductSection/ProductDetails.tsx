import RenderMarkdown from '../RenderMarkdown'
import type { ProductItemProps } from './GeneralInfo'
import ProductCard from './ProductCard'

const ProductDetails: React.FC<ProductItemProps> = ({
  productItem,
  setActiveTab,
}) => {
  return (
    <div className='mt-8 flex justify-between gap-[100px] max-md:flex-wrap max-md:items-center max-md:justify-center max-md:gap-8 '>
      <div className='max-md-px-2 flex w-full flex-col'>
        <RenderMarkdown markdown={productItem.attributes.description} />
      </div>
      <ProductCard productItem={productItem} setActiveTab={setActiveTab} />
    </div>
  )
}

export default ProductDetails
