/**
 * Extracts Cloudinary deletion parameters from the split URL array.
 * Input: result of url.split('/')
 */
const getCloudinaryParamsFromUrl = (url: string) => {
  const parts = url.split('/')

  const resource_type = parts[4] as 'image' | 'video' | 'raw'

  const lastPart = parts[parts.length - 1]

  const publicId = lastPart?.split('.')[0]

  return { resource_type, publicId }
}

export { getCloudinaryParamsFromUrl }
