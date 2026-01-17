# Google Drive Clone – Backend

A lightweight, TypeScript-first backend that powers a Google Drive–style file manager.
Built with Node.js, Express, MongoDB, and Multer.

---

## 📁 Project Structure

```text
backend/
│
├── public/
│   └── temp/
│
├── src/
│   ├── config/
│   │   └── index.ts
│   │
│   ├── controllers/
│   │   └── user.controller.ts
│   │
│   ├── db/
│   │   └── index.ts
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │   ├── interfaces/
│   │   │   └── IUser.ts
│   │   └── user.model.ts
│   │
│   ├── routes/
│   │   └── user.route.ts
│   │
│   ├── utils/
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── asyncHandler.ts
│   │   └── HttpStatus.ts
│   │
│   ├── app.ts
│   ├── constants.ts
│   └── index.ts
│
├── .env.example
├── .gitignore
├── .prettierrc
├── .prettierignore
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

---

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

---

## 🚀 Day 3

| Task                                  | Status |
| ------------------------------------- | ------ |
| Initialize Express app & middleware   | ✅     |
| Configure MongoDB connection logic    | ✅     |
| Setup Environment Variable management | ✅     |
| Create `asyncHandler` utility         | ✅     |
| Add proper TypeScript typing          | ✅     |

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

## Commit: 24bf63e

### What I Did

- **Initialized Express Server:** Configured the core `app` instance with essential security and parsing middleware (`cors`, `cookieParser`, `json`, and `urlencoded`).
- **Database Integration:** Created a robust MongoDB connection utility using `mongoose` and handled connection lifecycle events.
- **Environment Management:** Integrated `dotenv` to manage sensitive credentials like `MONGODB_URI` and `CORS_ORIGIN`.
- **Static Asset Support:** Set up a `public` directory to serve static files locally.
- **Project Bootstrapping:** Structured the entry point to ensure the database connects successfully before the server starts listening on a port.

### Difficulties Faced

- **CORS Configuration:** Ensuring `credentials: true` was set correctly to allow the backend to receive cookies from the frontend.
- **Connection Sequencing:** Figuring out the best pattern to ensure the Express app doesn't start accepting requests until the MongoDB connection is fully established.
- **Payload Limits:** Deciding on a reasonable body size limit (`16kb`) to protect the server from large, malicious JSON payloads.

### Lessons Learned

- **Process Management:** Learned that using `process.exit(1)` is a clean way to shut down the application if a critical dependency (like the database) fails.
- **Modularization:** Discovered that separating the Express app logic from the database connection logic makes the codebase cleaner and easier to test.

---

## 🚀 Day 4

| Task                                  | Status |
| ------------------------------------- | ------ |
| Create User Schema & Email Validation | ✅     |
| Setup Password Hashing (bcrypt)       | ✅     |
| Implement JWT Token generation logic  | ✅     |
| Create TypeScript Interface for User  | ✅     |
| Add Auto-generated Avatars            | ✅     |

## Commit: cfc0994

### What I Did

- **Built the User Blueprint:** Created a Mongoose schema that defines what a "User" looks like (name, email, password, etc.).
- **Added Security:** Used `bcrypt` to scramble passwords before they are saved to the database. This ensures that even if the database is accessed, the real passwords remain hidden.
- **Automated Avatars:** Linked the email to the DiceBear API so every new user automatically gets a unique profile picture based on their email string.
- **JWT Integration:** Wrote functions to generate "Access" and "Refresh" tokens. These act like digital ID cards to keep users securely logged in.
- **Strict Typing:** Created a TypeScript interface (`IUser`) so the code editor provides helpful autocomplete and catches errors early.

### Difficulties Faced

- **Handling `this` in TypeScript:** Mongoose functions can sometimes lose track of what `this` refers to. I learned to use `HydratedDocument` to tell TypeScript that `this` represents a real User document.
- **Preventing Double Hashing:** I had to make sure the password hashing only runs when the password is actually changed, otherwise, the user would be locked out after a simple profile update.

### Lessons Learned

- **Schema Protections:** Using `select: false` on the password field is a great "safety net" to make sure passwords aren't accidentally sent back in API responses.
- **Data Cleanup:** Simple settings like `lowercase: true` and `trim` in the schema help keep the database clean and prevent login issues caused by extra spaces.
- **Instance Methods:** Putting token logic directly inside the User model makes the code much more organized and "DRY" (Don't Repeat Yourself).

---

## 🚀 Day 5

| Task                                  | Status |
| ------------------------------------- | ------ |
| Implement `createUser` Controller     | ✅     |
| Add Request Body Validation           | ✅     |
| Check for Existing User Conflict      | ✅     |
| Integrate `asyncHandler` & `ApiError` | ✅     |
| Standardize Success Response Format   | ✅     |

## Commit: bb99063

### What I Did

- **Developed Registration Logic:** Built the `createUser` controller to handle the end-to-end process of signing up a new user via an API endpoint.
- **Robust Validation:** Implemented a check to ensure `fullName`, `email`, and `password` are present and not just empty strings before hitting the database.
- **Conflict Detection:** Added a database check to verify if an email is already registered, throwing a `409 Conflict` error if the user already exists in the system.
- **Standardized Communication:** Utilized custom `ApiResponse` and `ApiError` utility classes to ensure the frontend receives consistent data structures for both success and failure states.
- **Async Wrapper:** Integrated the `asyncHandler` utility to keep the code clean and avoid repetitive `try-catch` blocks for asynchronous operations.

### Difficulties Faced

- **TypeScript Express Types:** Explicitly typing the controller parameters with `Request` and `Response` while ensuring the generic `IUser` type was passed to the response wrapper to maintain type safety.
- **Controller Flow:** Balancing the order of operations—validating input first, checking existing records second, and finally performing the write operation—to optimize performance.

### Lessons Learned

- **Early Returns:** Throwing errors early (fail-fast) prevents unnecessary database calls and keeps the logic flow linear and easy to read.
- **HTTP Semantics:** Deepened understanding of status codes, specifically choosing `400 Bad Request` for validation issues vs `409 Conflict` for duplicate entries.
- **Utility Abstractions:** Seeing the benefit of the `asyncHandler` wrapper in action, which significantly reduces boilerplate code in every controller I write.
