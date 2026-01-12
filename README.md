# Google Drive Clone – Backend

A lightweight, TypeScript-first backend that powers a Google Drive–style file manager.
Built with Node.js, Express, MongoDB, and Multer.

---

## 📁 Project Structure

```text
backend/
│
├── public/
│   └── temp/               # Temporary staging folder for uploads
│
├── src/
│   ├── controllers/        # Route handlers (business logic)
│   ├── db/                 # MongoDB connection logic
│   ├── middlewares/        # Auth, validation, error handlers
│   ├── models/             # Mongoose schemas & models
│   ├── routes/             # Express routers
│   ├── utils/              # Shared helpers (validators, logger, etc.)
│   │
│   ├── app.ts              # Express app configuration
│   ├── constants.ts        # Environment-based constants
│   └── index.ts            # Application entry point
│
├── .env.example             # Environment variable template
├── .gitignore
├── .prettierrc
├── .prettierignore
├── nodemon.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 🚀 Day 1 – Bootstrap

| Task | Status |
|------|--------|
| Scaffold folder structure | ✅ |
| Install dev dependencies | ✅ |
| Configure Prettier | ✅ |
| Add `.gitignore` & `.prettierignore` | ✅ |

### Dev Dependencies Installed
- `typescript`
- `ts-node`
- `nodemon`
- `prettier`
- `@types/node`

### Prettier Config (`.prettierrc`)
```json
{
  "singleQuote": true,
  "bracketSpacing": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "semi": false
}
```
