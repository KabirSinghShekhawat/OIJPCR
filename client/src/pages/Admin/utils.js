import axios from 'axios'

const authHeader = (token) => {
  return {
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
}


async function deleteOldImage({imagePath, routePrefix, authToken}) {
  const imageName = imagePath.split('/').pop()
  const url = `${routePrefix}${imageName}`

  const config = authHeader(authToken)

  await axios.delete(url, { ...config })
}


async function uploadMultipart(file, {url, authToken}) {
  const formData = new FormData()
  formData.append('image', file)

  const config = authHeader(authToken)

  const { data } = await axios.post(url, formData, { ...config })
  return data.file.url
}


export {deleteOldImage, uploadMultipart}