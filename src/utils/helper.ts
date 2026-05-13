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

/**
 * Calculates the percentage of used capacity.
 *
 * @param totalCapacity - Total storage capacity in bytes.
 * @param usedCapacity - Used storage capacity in bytes.
 * @returns The percentage of used capacity.
 */
function getUsedPercentage(
  totalCapacity: number,
  usedCapacity: number
): number {
  if (totalCapacity === 0) return 0

  return (usedCapacity / totalCapacity) * 100
}

/**
 * Converts bytes into a formatted GB string.
 *
 * @param bytes - Size in bytes.
 * @returns Formatted string in GB (e.g. "1.25 GB").
 */
function bytesToGB(bytes: number): string {
  const gb = bytes / 1024 ** 3

  return `${gb.toFixed(2)} GB`
}

export { getCloudinaryParamsFromUrl, getUsedPercentage, bytesToGB }
