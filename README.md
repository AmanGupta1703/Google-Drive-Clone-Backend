# Google Drive Clone – Backend

A lightweight, TypeScript-first backend that powers a Google Drive–style file manager.
Built with Node.js, Express, MongoDB, and Multer.

---

## 📁 Project Structure

```text
backend/
│
├── public/
│   └── temp/
│
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── asyncHandler.ts
│   │   └── HttpStatus.ts
│   │
│   ├── app.ts
│   ├── constants.ts
│   └── index.ts
│
├── .env.example
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

| Task                                 | Status |
| ------------------------------------ | ------ |
| Scaffold folder structure            | ✅     |
| Install dev dependencies             | ✅     |
| Configure Prettier                   | ✅     |
| Add `.gitignore` & `.prettierignore` | ✅     |

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

## Commit: 196a391

### What I Did

- Implemented a **custom API error handling system** in TypeScript.
- Created an `ApiError` class extending the built-in `Error` to standardize API error responses.
- Defined a structured `ApiErrorDetails` interface for field-specific error messages.
- Added **typed properties** to `ApiError`:
  - `statusCode` – HTTP status code
  - `success` – always `false` for errors
  - `errors` – array of detailed error messages
  - `data` – always `null`
- Ensured proper **prototype chain** handling so `instanceof ApiError` works correctly.
- Added support for **optional custom stack traces**, with automatic stack capture if not provided.
- Wrote **detailed JSDoc comments** and inline explanations for future reference.
- Structured the code in a TypeScript-friendly way to leverage **type safety** and clear error contracts.

## Difficulties Faced

- Understanding how to **extend built-in classes** like `Error` in TypeScript while keeping the prototype chain intact.
- Ensuring **type-safe error structures** that can handle both simple strings and detailed field-based errors.
- Balancing **automatic stack trace capture** with the ability to provide a custom stack trace.
- Writing JSDoc that is **clear and easy to understand** for when I revisit this code later.

## Lessons Learned

- Extending built-in classes in TypeScript requires careful handling of the **prototype chain**.
- TypeScript **type safety** makes structured error handling much more reliable.
- Writing **detailed JSDoc and inline comments** is extremely valuable for future reference.
- Small design decisions, like supporting both custom and automatic stack traces, save headaches later.

## 🚀 Day 2

| Task                       | Status |
| -------------------------- | ------ |
| Create `ApiResponse` class | ✅     |
| Add simple JSDoc comments  | ✅     |

## Commit: fb019cb

### What I Did

- Created an `ApiResponse` class in TypeScript to handle **successful API responses**.
- Used **generics** so the `data` field can work with different types of responses.
- Added a `success` property that is always set to `true`.
- Used `readonly` properties to prevent accidental changes after the response is created.
- Used a custom `HttpStatus` enum instead of raw numbers for status codes.
- Kept the constructor simple by using TypeScript’s parameter properties.
- Added simple JSDoc comments for better readability and IntelliSense.

### Difficulties Faced

- Understanding how generics work and where to use them.
- Deciding how to represent a successful response without mixing in error logic.
- Learning how `readonly` and `as const` affect TypeScript types.

### Lessons Learned

- Generics are useful when response data can have different shapes.
- Using `readonly` helps keep API responses immutable.
- Keeping success and error responses separate makes the code cleaner.
- Simple documentation is helpful when coming back to the code later.

## 🚀 Day X

| Task                          | Status |
| ----------------------------- | ------ |
| Create `asyncHandler` utility | ✅     |
| Add proper TypeScript typing  | ✅     |

## Commit: 8b36fd8

### What I Did

- Created an `asyncHandler` utility function to wrap Express route handlers.
- Used Express’s built-in `RequestHandler` type for proper typing.
- Ensured both **synchronous errors** and **async promise rejections** are handled.
- Forwarded errors to Express using `next(err)` so they reach error middleware.
- Kept the function small and easy to understand without advanced TypeScript.

### Difficulties Faced

- Understanding why Express doesn’t automatically catch errors from async functions.
- Learning the difference between normal middleware and error-handling middleware.
- Figuring out how to type the function without using overly complex generics.

### Lessons Learned

- Express needs `next(err)` to handle errors correctly.
- `Promise.resolve()` allows handling both sync and async errors in one place.
- Using `RequestHandler` is better than using the generic `Function` type.
- Simple utility functions can greatly reduce repeated `try/catch` blocks.
