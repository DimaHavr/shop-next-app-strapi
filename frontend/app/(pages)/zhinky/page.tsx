import CategoriesLayout from '@/app/(components)/CategoriesLayout'
import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import ProductsSection from '@/app/(components)/ProductsSection/ProductsSection'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'

export default async function IndexPage() {
  const pageProductsUrl = `/products?populate=*&[filters][page][slug][$eq]=zhinky&pagination[pageSize]=12`
  const pageFilterUrl = `/products?populate=colors,sizes,category,subcategory,page&[filters][page][slug][$eq]=zhinky`
  const pageCategoriesUrl = `/categories?populate=*&[filters][page][slug][$eq]=zhinky`
  const pageCategoriesData = await fetchData(pageCategoriesUrl)
  const pageProductsData = await fetchData(pageProductsUrl)
  const pageProductsFilterData = await fetchData(pageFilterUrl)
  const attributesData = pageCategoriesData.data[0].attributes
  const breadCrumbArr = [
    {
      slug: `/${attributesData.page.data.attributes.slug}`,
      title: attributesData.page.data.attributes.name,
    },
  ]
  return (
    <main className='mt-[89px] flex-auto '>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <CategoriesLayout categoriesData={pageCategoriesData} />
      <ProductsSection
        filterStartData={pageProductsFilterData}
        productsData={pageProductsData}
        productsUrl={pageProductsUrl}
      />
      <SubscribeSection />
    </main>
  )
}
