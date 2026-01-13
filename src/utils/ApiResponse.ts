import { HttpStatus } from './HttpStatus'

/**
 * Represents a successful API response.
 * @template T Type of the response data
 */
class ApiResponse<T> {
  /** Always true for successful responses */
  public readonly success = true as const

  /**
   * @param statusCode HTTP status code
   * @param data Response payload
   * @param message Optional message (default: "Success")
   */
  constructor(
    public readonly statusCode: HttpStatus,
    public readonly data: T,
    public readonly message: string = 'Success'
  ) {}
}

export { ApiResponse }
