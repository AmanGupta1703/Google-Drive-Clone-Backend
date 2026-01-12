import { HttpStatus } from './HttpStatus'

/**
 * Represents detailed information about an API error.
 */
export interface ApiErrorDetails {
  /**
   * The specific field that caused the error, if applicable.
   */
  field?: string

  /**
   * A descriptive message explaining the error.
   */
  message: string
}

class ApiError extends Error {
  /**
   * HTTP status code corresponding to the error.
   */
  public readonly statusCode: number

  /**
   * Indicates the success state of the response. Always `false` for errors.
   */
  public readonly success: false = false

  /**
   * An array of error details or simple error messages.
   */
  public readonly errors: ApiErrorDetails[] | string[]

  /**
   * Always `null` for errors.
   */
  public readonly data: null = null

  /**
   * Creates a new ApiError instance.
   *
   * @param statusCode - The HTTP status code for the error.
   * @param message - A descriptive message for the error.
   * @param errors - Optional array of error details or messages. Defaults to an empty array.
   * @param stack - Optional stack trace string. If not provided, a stack trace will be automatically captured.
   */
  constructor(
    statusCode: HttpStatus,
    message: string,
    errors: ApiErrorDetails[] | string[] = [],
    stack?: string
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors

    // Restore prototype chain for proper inheritance.
    // In JavaScript/TypeScript, extending built-in classes (like Error) can break
    // the prototype chain, causing `instanceof` checks to fail.
    // This line ensures that the ApiError instance behaves correctly as an instance
    // of ApiError, even after transpilation to ES5/ES6.
    Object.setPrototypeOf(this, new.target.prototype)

    // If a custom stack trace is provided, use it. Otherwise, automatically capture one.
    if (stack) {
      this.stack = stack
    } else {
      // Ensures the stack trace starts at the point where ApiError is instantiated
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { ApiError }
