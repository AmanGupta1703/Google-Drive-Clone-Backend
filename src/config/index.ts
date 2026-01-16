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
  accessTokenSecret: getEnv('ACCESS_TOKEN_SECRET'),
  accessTokenExpiry: getEnv('ACCESS_TOKEN_EXPIRY'),
  refreshTokenSecret: getEnv('REFRESH_TOKEN_SECRET'),
  refreshTokenExpiry: getEnv('REFRESH_TOKEN_EXPIRY'),
}

export default config
