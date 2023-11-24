import getHeaders from '@/app/(utils)/getHeaders'

export default async function fetchData(url: string) {
  try {
    const res = await fetch(`https://shop-strapi.onrender.com/api${url}`, {
      headers: getHeaders(),
    })

    if (!res.ok) {
      throw new Error(res.status.toString() + res.statusText)
    }

    return await res.json()
  } catch (error) {
    throw error
  }
}
