const { NEXT_PUBLIC_SERVER_API_KEY } = process.env
export default async function getData(url: string) {
  const res = await fetch(`https://ropeaccess-hub.onrender.com/api${url}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_SERVER_API_KEY}`,
    },
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
