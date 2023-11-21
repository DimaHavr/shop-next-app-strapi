import fetchData from '@/app/(server)/api/service/strapi/fetchData'

export async function generateStaticParams() {
  const url = `/pages?populate=category`
  const category = await fetchData(url)
  return category.data.map(
    (item: {
      attributes: {
        slug: string
      }
    }) => ({
      category: item.attributes.slug,
    }),
  )
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
