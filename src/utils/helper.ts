import type { IFolder } from '../models/interfaces/IFolder.js'
import { Folder } from '../models/folder.model.js'
import type { IUser } from '../models/interfaces/IUser.js'

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

/**
 * Recursively checks if a destination folder is a child/descendant of the target folder.
 * Returns true if a circular reference is detected (unsafe move).
 */
async function isDescendant(
  targetFolder: IFolder,
  destinationFolder: IFolder,
  user: IUser
): Promise<boolean> {
  if (destinationFolder.parent === null) return false

  if (targetFolder._id.toString() === destinationFolder.parent.toString())
    return true

  const parentDestinationFolder = (await Folder.findOne({
    _id: destinationFolder.parent,
    owner: user._id,
  }).lean()) as IFolder

  if (!parentDestinationFolder) return false

  return isDescendant(targetFolder, parentDestinationFolder, user)
}

export {
  getCloudinaryParamsFromUrl,
  getUsedPercentage,
  bytesToGB,
  isDescendant,
}
