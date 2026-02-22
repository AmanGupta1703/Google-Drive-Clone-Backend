const getEnv = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

const config = {
  port: getEnv('PORT'),
  mongodbUri: getEnv('MONGODB_URI'),
  corsOrigin: getEnv('CORS_ORIGIN'),

  auth: {
    accessToken: {
      secret: getEnv('ACCESS_TOKEN_SECRET'),
      expiry: getEnv('ACCESS_TOKEN_EXPIRY'),
    },
    refreshToken: {
      secret: getEnv('REFRESH_TOKEN_SECRET'),
      expiry: getEnv('REFRESH_TOKEN_EXPIRY'),
    },
  },

  cloudinary: {
    cloud_name: getEnv('CLOUDINARY_CLOUD_NAME'),
    api_key: getEnv('CLOUDINARY_API_KEY'),
    api_secret: getEnv('CLOUDINARY_API_SECRET'),
  },
} as const

export default config
