import CategoriesLayout from '@/app/(components)/CategoriesLayout'
import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import ProductsSection from '@/app/(components)/ProductsSection/ProductsSection'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'

interface IndexPageProps {
  params: {
    subcategory: string
  }
}

export default async function IndexPage({ params }: IndexPageProps) {
  const subcategoryFilterProductsUrl = `/products?populate=colors,sizes&[filters][subcategory][slug][$eq]=${params.subcategory}`
  const subcategoryProductsUrl = `/products?populate=*&[filters][subcategory][slug][$eq]=${params.subcategory}&pagination[pageSize]=12`
  const subcategoryCategoriesUrl = `/categories?populate=*&[filters][page][slug][$eq]=choloviky`
  const currentSubcategoryUrl = `/subcategories?populate=*&[filters][slug][$eq]=${params.subcategory}`
  const subcategoryFilterProductsData = await fetchData(
    subcategoryFilterProductsUrl,
  )
  const subcategoryCategoriesData = await fetchData(subcategoryCategoriesUrl)
  const subcategoryProductsData = await fetchData(subcategoryProductsUrl)
  const currentSubcategoryData = await fetchData(currentSubcategoryUrl)
  const attributesData = currentSubcategoryData.data[0].attributes
  const breadCrumbArr = [
    {
      slug: `/${attributesData.page.data.attributes.slug}`,
      title: attributesData.page.data.attributes.name,
    },
    {
      slug: `/${attributesData.page.data.attributes.slug}/${attributesData.category.data.attributes.slug}`,
      title: attributesData.category.data.attributes.title,
    },
    {
      slug: attributesData.slug,
      title: attributesData.title,
    },
  ]
  return (
    <main className='mt-[89px] flex-auto'>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <CategoriesLayout categoriesData={subcategoryCategoriesData} />
      <ProductsSection
        filterStartData={subcategoryFilterProductsData}
        productsData={subcategoryProductsData}
        productsUrl={subcategoryProductsUrl}
      />
      <SubscribeSection />
    </main>
  )
}

export async function generateStaticParams() {
  const url = `/subcategories`
  const subcategory = await fetchData(url)
  return subcategory.data.map(
    (item: {
      attributes: {
        slug: string
      }
    }) => ({
      subcategory: item.attributes.slug,
    }),
  )
}
