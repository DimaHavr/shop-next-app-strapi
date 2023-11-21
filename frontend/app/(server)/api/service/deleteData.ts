import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const { NEXT_PUBLIC_SERVER_API_KEY } = process.env
const deleteData = async (endpoint: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_SERVER_API_KEY}`,
    },
  }

  if (!endpoint) {
    throw new Error('No endpoint')
  }

  const url = `https://ropeaccess-hub.onrender.com/api${endpoint}`
  try {
    return await axios.delete(url, config)
  } catch (error) {
    throw new Error('Failed to delete data')
  }
}

export default deleteData
