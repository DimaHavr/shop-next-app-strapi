import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface ApiResponse {
  status: number
}

const { NEXT_PUBLIC_SERVER_API_KEY } = process.env
const sendPutRequest = async (
  data: any,
  endpoint: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_SERVER_API_KEY}`,
    },
  }

  if (!endpoint) {
    throw new Error('No endpoint')
  }
  const apiUrl = `https://ropeaccess-hub.onrender.com/api/${endpoint}`
  if (!data) {
    throw new Error('No data')
  }
  try {
    const response = await axios.put(apiUrl, data, config)
    return response
  } catch (error) {
    throw new Error('Failed to update data')
  }
}

export default sendPutRequest
