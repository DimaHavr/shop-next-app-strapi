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
  const searchUrl = `/products?populate=*&filters[title][$containsi]=${searchParams?.query}`
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
