import CategoriesLayout from '@/app/(components)/CategoriesLayout'
import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import ProductsSection from '@/app/(components)/ProductsSection/ProductsSection'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'

interface IndexPageProps {
  params: {
    category: string
  }
}

export default async function IndexPage({ params }: IndexPageProps) {
  const categoryProductsUrl = `/products?populate=*&[filters][category][slug][$eq]=${params.category}&pagination[pageSize]=12`
  const categoryFilterProductsUrl = `/products?populate=colors,sizes,category,subcategory,page&[filters][category][slug][$eq]=${params.category}`
  const currentCategoryUrl = `/categories?populate=*&[filters][slug][$eq]=${params.category}`
  const categoriesUrl = `/categories?populate=*&[filters][page][slug][$eq]=zhinky`
  const categoriesData = await fetchData(categoriesUrl)
  const categoryFilterProductsData = await fetchData(categoryFilterProductsUrl)
  const categoryProductsData = await fetchData(categoryProductsUrl)
  const currentCategoryData = await fetchData(currentCategoryUrl)
  const attributesData = currentCategoryData.data[0].attributes
  const breadCrumbArr = [
    {
      slug: `/${attributesData.page.data.attributes.slug}`,
      title: attributesData.page.data.attributes.name,
    },
    {
      slug: `/${attributesData.page.data.attributes.slug}/${attributesData.slug}`,
      title: attributesData.title,
    },
  ]
  return (
    <main className='mt-[89px] flex-auto'>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <CategoriesLayout categoriesData={categoriesData} />
      <ProductsSection
        filterStartData={categoryFilterProductsData}
        productsData={categoryProductsData}
        productsUrl={categoryProductsUrl}
      />
      <SubscribeSection />
    </main>
  )
}
export async function generateStaticParams() {
  const url = `/categories`
  const category = await fetchData(url)
  return category.data.map(
    (item: {
      attributes: {
        slug: string
      }
    }) => ({
      category: item.attributes.slug,
    }),
  )
}
