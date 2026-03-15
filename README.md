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
│   │
│   ├── db/
│   │   └── index.ts
│   │
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   │
│   ├── models/
│   │   ├── interfaces/
│   │   │   ├── IFile.ts
│   │   │   ├── IFolder.ts
│   │   │   └── IUser.ts
│   │   │
│   │   ├── file.model.ts
│   │   ├── folder.model.ts
│   │   └── user.model.ts
│   │
│   ├── routes/
│   │   └── user.route.ts
│   │
│   ├── utils/
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── asyncHandler.ts
│   │   └── HttpStatus.ts
│   │
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

---

## 🚀 Day 13: File Upload Setup (Multer & Cloudinary)

| Task                              | Status |
| --------------------------------- | ------ |
| Configured Multer Disk Storage    | ✅     |
| Implemented Cloudinary Utility    | ✅     |
| Added Stream-based Upload Logic   | ✅     |
| Integrated Automatic File Cleanup | ✅     |

## Commit: 4ad3708

### What I Did

- **Multer Integration**: Created a middleware to handle `multipart/form-data`. The **application** now has a designated spot on the server (`public/temp`) to catch files before they are processed.
- **Cloudinary Stream Utility**: Instead of loading whole files into the server's memory (RAM), I implemented a **streaming** approach. The **system** now "pipes" data directly from the local disk to Cloudinary, which is much more efficient for a drive-clone project.
- **File Cleanup**: Added logic to ensure that once a file is successfully uploaded (or if the upload fails), the temporary file is deleted from the server to prevent storage leaks.

### How it Works (Technical Flow)

1.  **Request**: The user sends a file via a `POST` request.
2.  **Multer**: Intercepts the request and saves the file to `./public/temp` with a unique timestamped name.
3.  **Cloudinary Utility**:
    - Opens a `ReadStream` from the local path.
    - Uses `.pipe()` to send the data chunks to Cloudinary.
    - Waits for the cloud provider to return a secure URL and public ID.
4.  **Cleanup**: The `fs.unlinkSync` command removes the file from our server's local storage.

### Difficulties Faced

- **Understanding Streams**: It was a bit challenging to understand how `pipe()` works, but I realized it acts like a plumbing system—moving data from point A to point B without filling up a "bucket" (RAM) in between.
- **Async Promises**: Since Cloudinary's `upload_stream` uses callbacks, I had to wrap it in a `New Promise` to make it work smoothly with `async/await` in the rest of the **backend**.

### Lessons Learned

- **Memory Management**: Streaming is essential for a cloud storage app to keep it from crashing when handling large files.
- **Naming Collisions**: Using a `uniqueSuffix` in Multer is a vital safety step to ensure one user's file doesn't overwrite another's during the upload process.

---

## 📁 Day 14: Folder Creation & Security

| Task                                | Status |
| ----------------------------------- | ------ |
| Created `createFolder` Controller   | ✅     |
| Added Ownership & Parent Validation | ✅     |
| Integrated Routes into App          | ✅     |

## Commit: 498bf50

### What I Did

- **Folder Hierarchy**: Built a system that supports nested folders. By using a `parentId`, the **application** can now distinguish between "Root" folders and "Subfolders."
- **Security Validation**: Implemented an ownership check. The **system** now verifies that if you are creating a folder inside another one, you actually own the parent folder. This prevents unauthorized users from modifying others' file structures.
- **Type-Safe Handling**: Refined the controller to use TypeScript narrowing. By checking for the `user` object early, I removed the need for complex casting, making the code cleaner and more readable.

### How it Works (Technical Flow)

1. **Auth Check**: The request passes through JWT middleware to ensure a user is logged in.
2. **Parent Validation**: If a `parentId` is provided in the request body, the **backend** performs a `findOne` query looking for that specific `_id` AND the current user's ID as the `owner`.
3. **Creation**: A new entry is made in the Database. If no `parentId` was provided, the `parent` field is set to `null` (making it a top-level folder).
4. **Response**: The newly created folder object is sent back via a standardized `ApiResponse`.

### Difficulties Faced

- **Query Logic**: Ensuring the database searched for the parent folder by its `_id` rather than searching for sibling folders. It was a crucial distinction to ensure the hierarchy remained intact.
- **TypeScript Null Checks**: Managing "possibly null" errors for `req.user`. I learned that performing a simple `if (!user)` check allows TypeScript to "narrow" the type, making `user._id` safe to use without extra assertions.

### Lessons Learned

- **Backend Sovereignty**: Never trust the `parentId` sent by the client at face value. Always verify ownership on the server side to prevent "Insecure Direct Object Reference" (IDOR) vulnerabilities.
- **Code Readability**: Moving `req.user` into a local constant after validation makes the subsequent logic much cleaner and easier for other developers to follow.

---

## 📁 Day 15: Content Retrieval (Nested Navigation)

| Task                             | Status |
| -------------------------------- | ------ |
| Implemented `getFolderContent`   | ✅     |
| Added Parallel Querying Logic    | ✅     |
| Handled Root vs. Subfolder Views | ✅     |
| Integrated File & Folder Results | ✅     |

## Commit: 2b208b1

### What I Did

- **Universal Retrieval**: Created a single controller that handles both the "Home" (Root) view and specific folder views by making the `folderId` optional in the route.
- **Performance Optimization**: Implemented `Promise.all` to fetch both Subfolders and Files simultaneously. The **system** no longer waits for the folder query to finish before starting the file query, making the API twice as fast.
- **Security Guard**: Added a check to ensure that if a user requests a specific folder, the **application** verifies they actually own that folder before showing its contents.

### How it Works (Technical Flow)

1. **Param Extraction**: The controller looks for a `folderId` in the URL. If it's missing, it defaults to `null` to show the "Root" directory.
2. **Ownership Check**: If an ID is provided, the **backend** performs a security check to verify the user owns that directory.
3. **Parallel Fetching**: The **system** triggers two database searches at once:
   - `Folder.find({ parent: folderId || null })`
   - `File.find({ folder: folderId || null })`
4. **Unified Response**: Both results (folders and files) are packaged into a single JSON response so the frontend can render the entire "Drive" view in one go.

### Difficulties Faced

- **Naming Consistency**: I had to be very careful with my schema fields—remembering that Folders use `parent` while Files use `folder`. Mapping these correctly in the query was essential for the data to show up.
- **Concurrency**: Learning how to handle multiple `await` calls efficiently. Using `Promise.all` was a great lesson in making the **backend** feel snappier and more professional.

### Lessons Learned

- **Parallelism**: Whenever two database queries don't depend on each other, always run them in parallel to save time and resources.
- **Clean Routing**: Using optional parameters (`/:folderId?`) makes the API much more flexible than creating separate "Home" and "Folder" endpoints.

---

### 📦 Day 16: Storage Management System

| Task                              | Status |
| --------------------------------- | ------ |
| Created Storage Schema            | ✅     |
| Defined Byte-based Capacity Logic | ✅     |
| Linked Storage to User Ownership  | ✅     |

## Commit: e1cb6d5

### What I Did

- **Usage Tracking**: Created a dedicated **Storage** model to act as a "ledger" for the drive. This keeps track of exactly how much space each user is consuming.
- **Capacity Definition**: Set a default limit of **500MB**. In the code, this is represented as **524,288,000 bytes** (500 × 1024 × 1024) to ensure the system is mathematically precise.
- **User Association**: Linked the storage record directly to the `User` model using an `owner` reference. This ensures that every user has their own private quota that others cannot access.

### How it Works (Technical Flow)

1. **The Power of Bytes**: While humans prefer seeing "MB," computers calculate size in bytes. By using 1024 as our multiplier (binary system), we ensure our backend math matches exactly how the operating system and **Multer** calculate file sizes.
2. **The "Bank Account" Logic**: Think of the `Storage` model as a bank account.
   - `totalCapacity` is the credit limit.
   - `usedStorage` is the current balance.
   - Every upload is a "withdrawal" from the available space.
3. **Automated Timestamps**: Using `{ timestamps: true }` allows the system to automatically track when the storage was last modified, which is useful for debugging and audit logs.

### Difficulties Faced

- **Byte Precision**: Deciding between 1000 and 1024 for the MB calculation was tricky. I chose 1024 because it is the standard for memory and storage in software development, preventing "rounding errors" where a file might appear smaller in the UI than it actually is on the disk.
- **Choosing the Model Structure**: I chose to create a separate `Storage` model rather than putting a `usedStorage` field inside the `User` model. This keeps the code **modular**—meaning the code that handles "who you are" (User) is separate from the code that handles "what you own" (Storage).

### Lessons Learned

- **Scalability**: This setup makes it very easy to offer different "tiers" later on. To give a user more space, we only need to update a single number in their `Storage` document.
- **Layered Security**: I learned that a safe app has multiple "gates." **Multer** acts as the front gate (rejecting a single file that is too big), and the **Storage Model** acts as the vault (ensuring the total collection of files doesn't exceed the account limit).

---

### 📦 Day 17: Secure File Upload & Storage Validation

| Task                              | Status |
| --------------------------------- | ------ |
| Implemented uploadFile Controller | ✅     |
| Integrated Storage Quota Check    | ✅     |
| Added Lazy Storage Initialization | ✅     |
| Cloudinary Upload Integration     | ✅     |
| Handled Local File Cleanup        | ✅     |
| Atomic Usage Updates ($inc)       | ✅     |

## Commit: a12d0db

### What I Did

- **Smart Storage Initialization**: Used Mongoose's `findOneAndUpdate` with `upsert: true`. This ensures that if a user doesn't have a Storage record yet, one is created automatically the moment they try to upload their first file.
- **Pre-Upload Validation**: Implemented a "Gatekeeper" logic that checks the user's current `usedStorage` against their `totalCapacity` before sending the file to Cloudinary.
- **Automated Cleanup**: Added `fs.unlinkSync` to ensure that if a user is over their 500MB limit, the temporary file is deleted from the server immediately to prevent disk bloat.
- **Atomic Math with $inc**: Switched to the `$inc` operator for updating storage usage. This ensures that even if multiple files are uploaded at once, the math stays 100% accurate inside the database.

### How it Works (Technical Flow)

1. **Authentication**: The system verifies the user is logged in via the `auth` middleware.
2. **Storage Lookup**: It looks for the user's Storage document. If missing, it creates one with the default 500MB limit.
3. **The Quota Math**:
   - `current_used + incoming_file_size <= 500MB`
   - If this fails, the request is rejected, and the local temp file is deleted.
4. **Cloudinary Handshake**: The local file is sent to Cloudinary.
5. **Atomic Update**: Once Cloudinary confirms the upload, the system uses the `$inc` operator to add the file's byte size to the user's total usage.

### Difficulties Faced

- **The "Null" String Trap**: In multipart/form-data, `req.body.folderId` often arrives as the string `"null"`. I implemented a check to handle this so files land in the root directory correctly.
- **Zombie Files**: I realized that throwing an error during the storage check would leave files stranded on the server. I integrated `fs.unlinkSync` to ensure the server stays clean even when uploads are rejected.
- **Race Conditions**: I learned that adding numbers in JavaScript can lead to errors if two uploads happen at the exact same time. Using `$inc` solves this by letting MongoDB handle the math.

### Lessons Learned

- **Defense in Depth**: We now have two layers of protection. **Multer** limits the size of a single file, while the **Controller** limits the total account size.
- **Atomic Operations**: Using `$inc` is the professional way to handle counters and balances in a database to prevent data corruption.
- **Order of Operations**: Checking the limit _before_ uploading to Cloudinary saves bandwidth and prevents unnecessary cloud storage costs.

---

### 📦 Day 18: Duplicate File Prevention & Logic Refinement

| Fix                      | Description                                      |
| ------------------------ | ------------------------------------------------ |
| **Duplicate Name Check** | Prevents uploading two files with the same name. |
| **Temp File Cleanup**    | Deletes the local file if a duplicate is found.  |
| **Type Support**         | Works for both root directory and subfolders.    |

## Commit: f604d6d

### The Bug

The system allowed users to upload files with identical names in the same folder, creating data collisions. Additionally, the TypeScript compiler was throwing an error because the file name from the request could technically be `undefined`.

### The Fix

- **Collision Check**: Implemented a `File.findOne` query to ensure the file name is unique within the user's specific folder (or root).
- **TypeScript Fix**: Resolved the "No overload matches this call" error by properly handling the `req.file?.originalname` type. By ensuring the name is treated as a string, the Mongoose query now compiles correctly.
- **Immediate Cleanup**: Added `fs.unlinkSync` to delete the temporary file the moment a naming conflict is detected. This prevents rejected files from wasting server disk space.

### Lessons Learned

- **Type Strictness**: TypeScript's "No overload" errors are often a warning that a value might be `undefined`. Explicitly handling those cases makes the code much safer.
- **Resource Management**: In file uploads, unlinking the local file on _every_ error path is essential for long-term server stability.

---

### 📦 Day 18 (Part 2): Directory Navigation & Content Retrieval

| Feature          | Logic                                                     |
| ---------------- | --------------------------------------------------------- |
| **Endpoint**     | `GET /content?folderId=...`                               |
| **Security**     | Ownership validation for every directory access.          |
| **Optimization** | Parallel fetching of files and folders via `Promise.all`. |

## Commit: 418b187

### What I Did

- **Unified Navigation**: Created a single controller that returns both subfolders and files for any given location (Root or Subfolder).
- **Access Control**: Implemented a "Gatekeeper" check. If a `folderId` is provided, the system first verifies that the folder exists and belongs to that specific user.
- **Root Directory Support**: Designed the query to handle `null` folder IDs, allowing the same route to serve the main "Home" view and deeply nested subfolders.
- **Parallel Execution**: Used `Promise.all` to fetch files and folders simultaneously, reducing API latency.

### Technical Flow

1. **Extract**: Get the `folderId` from the URL query string.
2. **Authorize**: If an ID is provided, verify ownership in the `Folder` collection.
3. **Fetch**: Use the `owner` ID and `folderId` to pull matching records from both `File` and `Folder` collections.
4. **Respond**: Deliver a structured JSON object containing two arrays: `files` and `folders`.

### Lessons Learned

- **Query Params**: Using query strings (`?folderId=`) makes the API flexible for optional filters.
- **Node.js Parallelism**: `Promise.all` is essential when talking to multiple collections to avoid "Request Waterfall" delays.
- **Null Safety**: Explicitly passing `null` when a `folderId` is missing ensures we correctly target the Root directory in the database.

---

### 📦 Day 18: The "Double Vision" Refactor

| Update             | Description                                        |
| ------------------ | -------------------------------------------------- |
| **Bug Fix**        | Resolved naming collisions in file uploads.        |
| **Architecture**   | Consolidated logic into `directory.controller.ts`. |
| **Lesson Learned** | Identified and fixed a major DRY violation.        |

---

## Commit: 6d1d63d

### 🛠 The Mistake: "Double Controller" Syndrome

While building out the navigation features, I fell into a common trap: I wrote the exact same logic twice.

- I created `getFolderContent` in `folder.ts`.
- I created `getFiles` in `file.ts`.
- Both were doing the same heavy lifting: fetching subfolders and files based on a `folderId`.

Instead of having a clean codebase, I had created a maintenance nightmare where any change to the navigation logic would have to be manually synced across two files.

### 🚀 The Fix: Consolidating into `directory.controller.ts`

I stopped, took a step back, and refactored the architecture to follow the **DRY (Don't Repeat Yourself)** principle:

- **Centralized Logic**: I deleted the redundant functions from both the file and folder controllers.
- **Domain-Driven Design**: I introduced `directory.controller.ts`. This now serves as the single source of truth for "browsing" the drive.
- **Improved Performance**: Kept the `Promise.all` optimization to fetch data in parallel, but now it lives in one clean, validated function.

### 🐛 Also Fixed: Upload Naming Collision

Before the refactor, I also squashed a bug in the upload flow:

- **Collision Detection**: Added a check to prevent files with the same name from existing in the same folder.
- **Memory Safety**: Implemented `fs.unlinkSync` to wipe temporary files immediately if an upload fails due to a name conflict.

### 💡 Key Takeaway

Just because you are working with two different database models (Files and Folders) doesn't mean you need two different controllers for a shared feature (Browsing). Grouping by **feature domain** is much cleaner than grouping by **database table**.

---

### 📦 Day 19: File Management & Scoped Validation

| Update             | Description                                          |
| ------------------ | ---------------------------------------------------- |
| **New Controller** | `renameFile` via `PATCH` method.                     |
| **Logic Fix**      | Names are now unique per folder, not per drive.      |
| **Optimization**   | Handled "self-collision" when renaming to same name. |

## Commit: 5427b65

### What I Did

- **Partial Updates**: Implemented the `renameFile` controller using the `PATCH` method, allowing users to modify file metadata without re-uploading.
- **Context-Aware Validation**: Initially, the system checked for name uniqueness across the entire database. I refactored this to check only within the specific `folder` context. Users can now have files with the same name if they are in different directories.
- **Identity Protection**: Added an `_id: { $ne: fileId }` check. This prevents the API from throwing a "Name already exists" error if a user saves a file without actually changing its name.
- **State Syncing**: The controller now returns the fully updated file object, allowing the frontend to update the UI instantly without a page refresh.

### Lessons Learned

- **Scoped Uniqueness**: In a drive system, "uniqueness" is almost always relative to the parent container. Global uniqueness is rarely what the user wants.
- **Efficient Updates**: By fetching the document first to check its folder context, I can simply modify the properties and use `.save()`, which is often more readable than complex `findOneAndUpdate` filters.

---

### 📂 Day 20: Folder Management & Recursive Logic Preparation

| Feature            | Description                                       |
| ------------------ | ------------------------------------------------- |
| **New Controller** | `renameFolder` with `PATCH` support.              |
| **Validation**     | Scoped uniqueness check based on the `parent` ID. |
| **Consistency**    | Unified response structure with `renameFile`.     |

---

## Commit: 51412d2

### What I Did

- **Structural Integrity**: Built the `renameFolder` controller to allow users to update folder names without breaking the directory tree.
- **Parent-Scoped Uniqueness**: Implemented logic to ensure that folder names are unique within their specific directory level. This uses the `parent` field to distinguish between folders in the Root vs. folders inside subdirectories.
- **Conflict Prevention**: Added a check using the `$ne` (not equal) operator to ensure that if a user saves the folder without changing the name, the system doesn't trigger a "name already exists" error against itself.
- **Data Persistence**: Used the `.save()` method on the Mongoose document to ensure all middleware and validations are triggered during the update.

### Lessons Learned

- **Context is Everything**: Just like files, folders exist within a context. By fetching the folder first to identify its `parent`, I can accurately validate the namespace before committing changes.
- **API Uniformity**: Keeping the request body (`newName`) and the response object (the updated document) consistent across both file and folder controllers makes the frontend integration significantly smoother.
