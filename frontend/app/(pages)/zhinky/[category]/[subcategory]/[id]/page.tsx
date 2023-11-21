import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import type { ProductItem } from '@/app/(components)/ProductsSection/ProductsList'
import SingleProductSection from '@/app/(components)/SingleProductSection/SingleProductSection'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'

export interface ProductsSectionProps {
  productsData: ProductItem
}
interface IndexPageProps {
  params: {
    id: number
  }
}

export default async function IndexPage({ params }: IndexPageProps) {
  const productUrl = `/products/${params.id}?populate=*`
  const productData = await fetchData(productUrl)
  const attributesData = productData.data
  const breadCrumbArr = [
    {
      slug: `/${attributesData.attributes.page.data.attributes.slug}`,
      title: attributesData.attributes.page.data.attributes.name,
    },
    {
      slug: `/${attributesData.attributes.page.data.attributes.slug}/${attributesData.attributes.category.data.attributes.slug}`,
      title: attributesData.attributes.category.data.attributes.title,
    },
    {
      slug: `/${attributesData.attributes.page.data.attributes.slug}/${attributesData.attributes.category.data.attributes.slug}/${attributesData.attributes.subcategory.data.attributes.slug}`,
      title: attributesData.attributes.subcategory.data.attributes.title,
    },
    {
      slug: `${attributesData.id}`,
      title: attributesData.attributes.title,
    },
  ]
  return (
    <main className='mt-[89px] flex-auto'>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <SingleProductSection productData={productData.data} />
      <SubscribeSection />
    </main>
  )
}
export async function generateStaticParams() {
  const url = `/products?populate=category,subcategory`
  const products = await fetchData(url)
  return products.data.map((item: { attributes: any; id: number }) => ({
    id: item.id.toString(),
  }))
}
