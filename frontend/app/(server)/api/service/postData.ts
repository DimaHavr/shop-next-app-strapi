import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const { NEXT_PUBLIC_SERVER_API_KEY } = process.env

const postData = async (data: any, endpoint: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_SERVER_API_KEY}`,
    },
  }
  if (!endpoint) {
    throw new Error('No endpoint')
  }
  const url = `https://ropeaccess-hub.onrender.com/api${endpoint}`

  if (!data) {
    throw new Error('No data')
  }

  try {
    return await axios.post(url, data, config)
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export default postData
