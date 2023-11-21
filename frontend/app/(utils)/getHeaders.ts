export default function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  }
}
