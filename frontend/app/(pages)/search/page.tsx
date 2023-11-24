import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'
import SearchProductsList from './(components)/SearchProductsList'
import SearchBarSection from './(components)/SearchBarSection'

export default async function IndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const pagesFilterValuesParams = searchParams?.pageFilter
    ? [searchParams?.pageFilter].toString().split(',')
    : ''
  const pagesValuesFilterUrl =
    Array.isArray(pagesFilterValuesParams) && pagesFilterValuesParams.length > 0
      ? pagesFilterValuesParams
          .map(
            (item, index) => `&filters[page][name][$in][${index + 1}]=${item}`,
          )
          .join('')
      : ''

  const searchUrl = `/products?populate=*&filters[title][$containsi]=${searchParams?.query}${pagesValuesFilterUrl}`
  const searchData = await fetchData(searchUrl)

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
      <SearchProductsList productsData={searchData} />
      <SubscribeSection />
    </main>
  )
}
