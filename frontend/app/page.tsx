import BlogSection from './(layouts)/BlogSection'
import CategoriesSection from './(layouts)/CategoriesSection'
import HeroBanner from './(layouts)/HeroSection'
import NewArrivalsSection from './(layouts)/NewArrivalsSection'
import PopularCategories from './(layouts)/PopularCategories'
import ServicesSection from './(layouts)/ServicesSection'
import SubscribeSection from './(layouts)/SubscribeSection'
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
