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
} as const

export default config
