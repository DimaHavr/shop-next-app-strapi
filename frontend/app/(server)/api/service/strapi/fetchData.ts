import getHeaders from '@/app/(utils)/getHeaders'

export default async function fetchData(url: string) {
  const res = await fetch(`https://shop-strapi.onrender.com/api${url}`, {
    cache: 'force-cache',
    headers: getHeaders(),
  })

  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
