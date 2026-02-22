import fs from 'node:fs'

import { v2 as cloudinary } from 'cloudinary'

import config from '../config/index.js'

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
})

/**
 * Uploads a file to Cloudinary using a stream.
 * @param localFilePath - The path to the file saved by Multer in public/temp
 */
const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null

    const response = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )

      /**
       * Read the local file in small chunks and 'pipe' (transfer) them
       * directly to Cloudinary's upload stream to optimize memory usage.
       */
      fs.createReadStream(localFilePath).pipe(uploadStream)
    })

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath)
    }

    return response
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
    console.log('Cloudinary upload failed: ', error)
    return null
  }
}

export { uploadOnCloudinary }
