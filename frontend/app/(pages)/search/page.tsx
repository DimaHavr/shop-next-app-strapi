import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'

import SearchBarSection from './(components)/SearchBarSection'
import SearchProductsList from './(components)/SearchProductsList'

export default async function IndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const pageFilterValue = searchParams?.pageFilter
    ? searchParams?.pageFilter.toString()
    : ''
  const pageValueFilterUrl = pageFilterValue
    ? `&filters[page][name][$eq]=${pageFilterValue}`
    : ''
  const currentPage = Number(searchParams?.page) || 1
  const sortLatestUrl =
    searchParams?.sort === 'latest' ? `&sort=createdAt:desc` : ''
  const sortLowestPriceUrl =
    searchParams?.sort === 'lowest_price' ? `&sort=price:asc` : ''
  const sortHighestPriceUrl =
    searchParams?.sort === 'highest_price' ? `&sort=price:desc` : ''
  const sortDefaultUrl =
    !sortLatestUrl && !sortLowestPriceUrl && !sortHighestPriceUrl
      ? '&sort=title'
      : ''
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
              `&filters[title][$containsi][${index + 1}]=${item}`,
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

  const searchUrl = `/products?populate=*&pagination[pageSize]=12&filters[title][$containsi]=${searchParams?.query}${pageValueFilterUrl}&pagination[page]=${currentPage}${sortDefaultUrl}${sortLatestUrl}${sortLowestPriceUrl}${sortHighestPriceUrl}${filterMinMaxPrice}${colorsFilterUrl}${sizesFilterUrl}`
  const pageFilterUrl = `/products?populate=colors,sizes,category,subcategory,page&filters[title][$containsi]=${searchParams?.query}${pageValueFilterUrl}`
  const searchData = await fetchData(searchUrl)
  const pageProductsFilterData = await fetchData(pageFilterUrl)

  const breadCrumbArr = [
    {
      slug: `/search`,
      title: 'Пошук',
    },
  ]
  return (
    <main className='mt-[89px] flex-auto'>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <SearchBarSection />
      <SearchProductsList
        productsData={searchData}
        filterStartData={pageProductsFilterData}
      />
      <SubscribeSection />
    </main>
  )
}
