import path from 'node:path'

import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Where the file will get upload on the server
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    /** * We add a unique suffix to prevent files with the same name
     * from overwriting each other if uploaded at the same time.
     */
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  },
})

/** * Create the multer instance with storage configuration and file size limits
 */
export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
})
