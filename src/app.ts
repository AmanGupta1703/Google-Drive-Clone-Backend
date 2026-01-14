import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// 1. Cross-Origin Resource Sharing (CORS) configuration
// Allows your backend to communicate with a frontend hosted on a different domain.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Defines which domains are allowed to access your resources
    credentials: true, // Allows the server to accept cookies/headers from the frontend
  })
)

// 2. JSON Body Parser
// Parses incoming requests with JSON payloads.
// The 'limit' prevents "Payload Too Large" attacks by capping the body size at 16kb.
app.use(express.json({ limit: '16kb' }))

// 3. URL-Encoded Body Parser
// Parses data from HTML forms (e.g., application/x-www-form-urlencoded).
// 'extended: true' allows for parsing nested objects using the 'qs' library.
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

// 4. Static File Server
// Serves assets like images, PDF files, or CSS from a local folder named 'public'.
// Example: access 'public/temp.txt' via 'http://localhost:8000/temp.txt'
app.use(express.static('public'))

// 5. Cookie Parser
// Parses the 'Cookie' header and populates 'req.cookies' with an object keyed by cookie names.
// This allows the server to read, create, and update cookies on the user's browser.
app.use(cookieParser())

export { app }
