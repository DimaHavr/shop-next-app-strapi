import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const { NEXT_PUBLIC_SERVER_API_KEY } = process.env

interface UploadFileParams {
  fileInput: File
}

const uploadImg = async ({ fileInput }: UploadFileParams) => {
  const url = 'https://ropeaccess-hub.onrender.com/api/upload'
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_SERVER_API_KEY}`,
    },
  }
  if (!fileInput) {
    throw new Error('No file')
  }
  const formData = new FormData()
  formData.append('files', fileInput)
  formData.append('ref', 'api::blog.blog')
  formData.append('refId', '1111')
  formData.append('field', 'image')
  try {
    const response = await axios.post(url, formData, config)
    return response
  } catch (error) {
    throw new Error('Error post')
  }
}

export default uploadImg
