import dynamic from 'next/dynamic'

import HeroBanner from './(layouts)/HeroSection'
import CategoriesSection from './(layouts)/CategoriesSection'
const NewArrivalsSection = dynamic(
  () => import('./(layouts)/NewArrivalsSection'),
)
const PopularCategories = dynamic(() => import('./(layouts)/PopularCategories'))
const ServicesSection = dynamic(() => import('./(layouts)/ServicesSection'))
const BlogSection = dynamic(() => import('./(layouts)/BlogSection'))
const SubscribeSection = dynamic(() => import('./(layouts)/SubscribeSection'))
import fetchData from './(server)/api/service/strapi/fetchData'
const Home = async () => {
  // const trendingWomenProductsUrl = `/api/products?populate=*&[filters][categories][title][$startsWithi]=Жіноче&[filters][type][$eq]=trending&pagination[limit]=5`
  // const trendingMensProductsUrl = `/api/products?populate=*&[filters][categories][title][$startsWithi]=Чоловіче&[filters][type][$eq]=trending&pagination[limit]=5`
  // const trendingChildrenProductsUrl = `/api/products?populate=*&[filters][categories][title][$startsWithi]=Дитяче&[filters][type][$eq]=trending&pagination[limit]=5`
  const popularCategoriesUrl = `/subcategories?populate=*&pagination[limit]=7`
  const newProductsUrl = `/products?populate=*&pagination[limit]=7`

  const newProductsData = await fetchData(newProductsUrl)
  const popularCategoriesData = await fetchData(popularCategoriesUrl)
  return (
    <main className='mt-[89px] flex-auto'>
      <HeroBanner />
      <CategoriesSection />
      <NewArrivalsSection newProductsData={newProductsData} />
      <PopularCategories popularCategoriesData={popularCategoriesData} />
      <ServicesSection />
      <BlogSection />
      <SubscribeSection />
    </main>
  )
}

export default Home
