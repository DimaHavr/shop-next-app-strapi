import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'

import FavoriteProductsList from './(components)/FavoriteProductsList'

export default async function IndexPage() {
  const breadCrumbArr = [
    {
      slug: `/favorites`,
      title: 'Улюблені товари',
    },
  ]
  return (
    <main className='mt-[89px] flex-auto'>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <FavoriteProductsList />
      <SubscribeSection />
    </main>
  )
}
