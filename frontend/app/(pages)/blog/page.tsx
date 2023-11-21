import EmptySection from '@/app/(components)/EmptySection'
import Breadcrumb from '@/app/(components)/ProductsSection/Breadcrumb'
import SubscribeSection from '@/app/(layouts)/SubscribeSection'

export default async function IndexPage() {
  const breadCrumbArr = [
    {
      slug: `/blog`,
      title: 'Блог',
    },
  ]
  return (
    <main className='mt-[89px] flex-auto'>
      <Breadcrumb breadCrumbArr={breadCrumbArr} />
      <EmptySection />
      <SubscribeSection />
    </main>
  )
}
