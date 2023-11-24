import CategoriesLayout from '@/app/(components)/CategoriesLayout'
import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import ProductsSection from '@/app/(components)/ProductsSection/ProductsSection'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'

interface IndexPageProps {
  params: {
    subcategory: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function IndexPage({
  params,
  searchParams,
}: IndexPageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const sortLatestUrl =
    searchParams?.sort === 'latest' ? `&sort=createdAt:desc` : ''
  const sortLowestPriceUrl =
    searchParams?.sort === 'lowest_price' ? `&sort=price:asc` : ''
  const sortHighestPriceUrl =
    searchParams?.sort === 'highest_price' ? `&sort=price:desc` : ''

  const priceValueParams = searchParams?.price
    ? [searchParams?.price].toString()
    : ''
  const colorValueParams = searchParams?.color
    ? [searchParams?.color].toString()
    : ''
  const sizeValueParams = searchParams?.size
    ? [searchParams?.size].toString()
    : ''

  const priceValueArr = priceValueParams?.split(',')
  const colorValueParamsArr = colorValueParams.length
    ? colorValueParams?.toString().split(',')
    : []
  const sizeValueParamsArr = sizeValueParams.length
    ? sizeValueParams?.toString().split(',')
    : []

  const filterMinMaxPrice =
    priceValueArr[0] !== ''
      ? `&filters[price][$gte]=${priceValueArr[0]}&filters[price][$lte]=${priceValueArr[1]}`
      : ''

  const colorsFilterUrl =
    Array.isArray(colorValueParamsArr) && colorValueParamsArr.length > 0
      ? colorValueParamsArr
          .map(
            (item, index) =>
              `&filters[colors][name][$in][${index + 1}]=${item}`,
          )
          .join('')
      : ''
  const sizesFilterUrl =
    Array.isArray(sizeValueParamsArr) && sizeValueParamsArr.length > 0
      ? sizeValueParamsArr
          .map(
            (item, index) => `&filters[sizes][size][$in][${index + 1}]=${item}`,
          )
          .join('')
      : ''

  const subcategoryProductsUrl = `/products?populate=*&[filters][subcategory][slug][$eq]=${params.subcategory}&pagination[pageSize]=12&pagination[page]=${currentPage}${sortLatestUrl}${sortLowestPriceUrl}${sortHighestPriceUrl}${filterMinMaxPrice}${colorsFilterUrl}${sizesFilterUrl}`
  const subcategoryFilterProductsUrl = `/products?populate=colors,sizes,category,subcategory,page&[filters][subcategory][slug][$eq]=${params.subcategory}`
  const subcategoryCategoriesUrl = `/categories?populate=*&[filters][page][slug][$eq]=zhinky`
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
