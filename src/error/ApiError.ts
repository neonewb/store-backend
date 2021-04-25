export class ApiError {
  status: number
  message: string
  constructor(status: number, name: string, message: string) {
    this.status = status
    this.message = message
  }

  static badRequest(message: string) {
    const apiError = new ApiError(404, 'NOT FOUND', message)
    return apiError
  }

  static internal(message: string) {
    const apiError = new ApiError(500, 'INTERNAL SERVER ERROR', message)
    return apiError
  }

  static forbidden(message: string) {
    const apiError = new ApiError(403, 'FORBIDDEN', message)
    return apiError
  }
}
