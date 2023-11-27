import CategoriesLayout from '@/app/(components)/CategoriesLayout'
import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import ProductsSection from '@/app/(components)/ProductsSection/ProductsSection'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'
import fetchData from '@/app/(server)/api/service/strapi/fetchData'

interface IndexPageProps {
  params: {
    category: string
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

  const categoryProductsUrl = `/products?populate=*&[filters][category][slug][$eq]=${params.category}&sort=title&pagination[pageSize]=12&pagination[page]=${currentPage}${sortLatestUrl}${sortLowestPriceUrl}${sortHighestPriceUrl}${filterMinMaxPrice}${colorsFilterUrl}${sizesFilterUrl}`
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
      />
      <SubscribeSection />
    </main>
  )
}

// export async function generateStaticParams() {
//   const url = `/categories`
//   const category = await fetchData(url)
//   return category.data.map(
//     (item: {
//       attributes: {
//         slug: string
//       }
//     }) => ({
//       category: item.attributes.slug,
//     }),
//   )
// }
