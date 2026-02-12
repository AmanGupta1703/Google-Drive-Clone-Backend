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

---

## 🚀 Day 6

| Task                                  | Status |
| ------------------------------------- | ------ |
| Implement `login` Controller          | ✅     |
| Secure Password Verification          | ✅     |
| JWT Access & Refresh Token Generation | ✅     |
| Fix Password Selection Logic          | ✅     |
| Set Secure HttpOnly Cookies           | ✅     |

## Commit: cb5d8d5

### What I Did

- **Authentication Logic:** Developed the `login` controller to authenticate users, verify passwords, and manage sessions via JWTs.
- **Token Dual-Strategy:** Configured the generation of both short-lived Access Tokens and long-lived Refresh Tokens for a seamless session experience.
- **Cookie Security:** Implemented `httpOnly` and `secure` flags for cookies to prevent XSS and ensure tokens are only transmitted over HTTPS.
- **Manual Data Sanitization:** Chose to manage field visibility at the controller level using `.select('-password')` to ensure sensitive credentials are never sent to the frontend.

### Difficulties Faced

- **Schema vs. Instance Methods:** Encountered a bug where setting `select: false` on the password field in the User Model prevented `this.password` from being accessible in the `isPasswordCorrect` method.
- **Debugging `undefined` Hashes:** Identified that the bcrypt comparison was failing because the password was not being pulled from the database, leading to "Invalid Password" errors even with correct input.

### Lessons Learned

- **Model Design Trade-offs:** Decided to remove `select: false` from the schema level to ensure internal methods (like password validation) always have access to the necessary data without extra query modifiers.
- **Explicit Exclusion:** Reinforced the habit of using `.select('-password')` in query chains to manually sanitize user objects before returning them in API responses.
- **Security Best Practices:** Confirmed that generic error messages ("Invalid email or password") are essential to prevent account enumeration, even when debugging internal selection issues.

---

## 🚀 Day 7

| Task                             | Status |
| -------------------------------- | ------ |
| Create Logout Function           | ✅     |
| Build a "Gatekeeper" (verifyJWT) | ✅     |
| Clear Tokens from Database       | ✅     |
| Clear Cookies from Browser       | ✅     |

## Commit: b22a5c5

### What I Did

- **The Logout "Eraser":** I wrote a function that tells the database to "forget" the user's Refresh Token using `$unset`. This ensures that even if someone steals the old token, it won't work anymore.
- **The Gatekeeper (Middleware):** I created a reusable "verifyJWT" tool. It sits in front of private routes and checks if a user has a valid "VIP pass" (Access Token) before letting them in.
- **Flexible Token Checking:** I made the code smart enough to look for the token in two places: inside cookies (for websites) or in the "Header" (for mobile apps).
- **Clean Slate:** Used `.clearCookie()` to make sure the user's browser automatically deletes their login info when they click "Logout."

### Difficulties Faced

- **TypeScript "Missing Property" Error:** TypeScript got confused because the standard Express "Request" doesn't usually have a "user" inside it. I had to create a custom "AuthenticatedRequest" to tell TypeScript, "Trust me, I'm adding a user object here."
- **Middleware Flow:** I had to make sure to call `next()` at the end of my gatekeeper. If you forget this, the website just spins forever and never reaches the next page!

### Lessons Learned

- **Middleware is like a Security Guard:** Instead of writing login-checking code over and over for every page, I can just write it once and "plug it in" wherever I need it.
- **Why Clear the Database?** I learned that just deleting a cookie isn't enough. By removing the token from the database too, we make the app much safer because the server officially "un-recognizes" that session.
- **Staying Organized:** Keeping user data (like passwords) out of the `req.user` object using `.select('-password')` is a simple but powerful way to prevent accidental data leaks.

---

---

## 🚀 Day 8

| Task                            | Status |
| ------------------------------- | ------ |
| Create Refresh Token Endpoint   | ✅     |
| Implement Token Rotation        | ✅     |
| Handle Cookie & Body Extraction | ✅     |
| Secure Token Verification       | ✅     |

## Commit: 5341268

### What I Did

- **The Token "Refresher":** I built a function that allows users to get a brand new Access Token without having to log in again. This keeps the user logged in seamlessly while maintaining high security.
- **Token Rotation:** Every time the user asks for a new Access Token, I also generate a new Refresh Token. This "rotation" makes it much harder for hackers to use a stolen token for long.
- **Dual-Source Extraction:** I set up the code to look for the Refresh Token in either the browser's cookies or the request body. This ensures the API works perfectly for both web browsers and mobile apps.
- **Auto-Update Cookies:** Used `.cookie()` to automatically send the new tokens back to the user's browser, replacing the old ones instantly.

### Difficulties Faced

- **The "Catch-All" Error Trap:** Handling JWT verification can be tricky because `jwt.verify` throws an error if the token is expired or fake. I had to use a `try-catch` block to ensure the app sends a clean "Unauthorized" message instead of crashing.
- **Decoding the Payload:** I had to ensure the data inside the token (the Payload) was correctly mapped back to a User ID so I could find the right person in my database.

### Lessons Learned

- **Short-Lived vs. Long-Lived Tokens:** I learned why we use two tokens. The Access Token is short-lived for safety, while the Refresh Token lives longer and stays tucked away until it's needed for a "refill."
- **Database Synchronization:** Even if a token is technically valid (not expired), we still check the database to make sure the user still exists. This allows us to "ban" or "delete" users instantly if needed.
- **The Power of httpOnly:** By setting the `httpOnly: true` flag on cookies, I learned that I'm protecting users from XSS attacks because JavaScript can't "read" those sensitive tokens.

---

## 🚀 Day 9

| Task                    | Status |
| ----------------------- | ------ |
| Change Password Feature | ✅     |
| Current Password Check  | ✅     |
| Password Matching Logic | ✅     |
| Secure Database Saving  | ✅     |

## Commit: 773ff34

### What I Did

- **The Identity Gatekeeper:** I created a way for users to change their password, but only if they know their old one. This adds a layer of security so that if someone walks up to your unlocked computer, they can't easily lock you out of your account.
- **The Matchmaker:** I added a check to make sure the `newPassword` and the `confirmPassword` are identical. This prevents users from accidentally locking themselves out due to a typo.

### Difficulties Faced

- **The "Missing User" Problem:** Even though the user is logged in, I had to write code to handle the rare case where a user record might be deleted while they are still browsing. Checking `if (!user)` keeps the app from breaking.
- **Handling Async Code:** In Node.js, things happen at different speeds. I had to make sure the app "waits" for the database to finish checking the password before moving on to the next step.

### Lessons Learned

- **Don't Trust User Input:** I learned that even if the frontend checks if passwords match, the backend (my code) must check again. This is called "Server-side validation," and it's the last line of defense.
- **Hashing is Automatic:** I realized that because of my Mongoose "pre-save" hooks, I don't need to manually scramble (hash) the password in this function. I just set `user.password = newPassword` and the database model handles the heavy lifting.

---

## 🚀 Day 10

| Task                    | Status |
| ----------------------- | ------ |
| Profile Update Feature  | ✅     |
| Partial Data Handling   | ✅     |
| Email & Name Validation | ✅     |
| MongoDB Atomic Updates  | ✅     |

## Commit: 90d2f21

### What I Did

- **The Dynamic Updater:** I implemented a controller that allows users to update their profile information. I designed it to be flexible, using a `Partial` type so users can update just their email, just their name, or both at the same time without overwriting existing data with null values.
- **The Sensitive Data Shield:** When returning the updated user information, I used the `.select('-password -refreshToken')` method to ensure that sensitive credentials never leave the server, keeping user data secure even in successful responses.

### Difficulties Faced

- **The "Empty Request" Trap:** I had to implement logic to catch cases where a user sends an update request but provides no new information. Without the `if (!email && !fullName)` check, the database would perform an unnecessary operation.
- **Selective Updating:** Using `$set` in Mongoose was a specific choice to ensure we only target the fields provided in the `updateData` object, preventing accidental data loss on other user fields.

### Lessons Learned

- **Atomic Operation Efficiency:** I learned the value of using `findByIdAndUpdate` with the `$set` operator for simple field updates. It’s more performant than fetching the whole document, modifying it in memory, and saving it back, especially when I don't need to trigger complex middleware.
- **Lean Responses:** I realized that after an update, it's best practice to return the _new_ version of the document (using `{ new: true }`) so the frontend can immediately reflect the changes without needing a secondary "fetch profile" call.

---

## 🚀 Day 11: Setting Up the Folder System

| Task                   | Status |
| ---------------------- | ------ |
| Created Folder Model   | ✅     |
| Enabled Folder Nesting | ✅     |
| Improved Search Speed  | ✅     |
| Added Trash Bin Logic  | ✅     |

## Commit: 0da3df6

### What I Did

- **The Folder Foundation:** I built the `Folder` model so users can organize their files. I designed it to be "self-referencing," which means a folder can live inside another folder, just like on a real desktop.
- **TypeScript Interface:** I created a clear set of rules (an interface) for what a folder should look like. This helps the **Development Environment** catch errors early by ensuring every folder has a name and an owner.
- **Speed Optimization:** I added an "Index" to the database. Think of this like a table of contents; it helps the **Database** find a user's folders instantly without having to search through every single record in the system.

### Difficulties Faced

- **Managing the "Root":** I had to decide how the **Application** should recognize folders that aren't inside anything else. I set the "parent" to `null` to represent the main Home screen.
- **Owner Tracking:** I had to ensure that every folder is strictly linked to a specific user so that people can only see their own private data.

### Lessons Learned

- **Smart Organization:** I learned that by tagging every folder with an `owner` ID, the **System** stays secure and organized.
- **The "Soft Delete" Concept:** Instead of deleting data permanently, I used an `isArchived` flag. This allows the **Application** to move items to a "Trash" folder instead of erasing them forever, giving users a chance to restore their work.

---

## 🚀 Day 12: File Metadata & Storage Design

| Task                       | Status |
| -------------------------- | ------ |
| Defined IFile Interface    | ✅     |
| Implemented File Schema    | ✅     |
| Integrated Cloudinary Keys | ✅     |
| Setup File-Folder Linking  | ✅     |

## Commit: 455c1c8

### What I Did

- **The File Metadata Blueprint:** I created the `IFile` interface and `File` schema. This allows the **application** to store crucial information like the filename, the user who owns it, and the specific folder it belongs to.
- **External Storage Integration:** I included `fileUrl` and `publicId` fields. This ensures that the **system** can point to the physical file on Cloudinary and use the unique ID to perform deletions or updates later.
- **Accurate Size Tracking:** I set up the `size` field to store data in bytes. This is vital for the **application** to correctly calculate how much storage a user has left before hitting their limit.

### Difficulties Faced

- **Timestamp Recognition:** I realized that while the **database** automatically creates `createdAt` and `updatedAt` fields, the **application** wouldn't recognize them in the code unless they were explicitly added to the TypeScript interface.
- **Flexible File Placement:** I had to design a way for files to exist either inside a folder or on the main dashboard. By allowing the `folder` field to be `null`, the **system** can successfully handle files that aren't organized into sub-directories.

### Lessons Learned

- **MIME Type Importance:** I learned that storing the `mimeType` is essential for the **application** to know what kind of file it is handling (like an image vs. a PDF) without having to download the file first.
- **Reference Logic:** I practiced linking the File model to both the User and Folder models. This creates a clean "map" in the **database** that makes it easy to fetch all files belonging to a specific user or a specific directory.
