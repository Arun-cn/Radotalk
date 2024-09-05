// utils/ApiResponse.js
class ApiResponse {
  constructor(success, message, data = null, errors = [], statusCode = 200) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.statusCode = statusCode;
  }

  static successResponse(
    data,
    message = 'Request successful',
    statusCode = 200,
  ) {
    return new ApiResponse(true, message, data, [], statusCode);
  }

  static errorResponse(
    message = 'An error occurred',
    errors = [],
    statusCode = 500,
  ) {
    return new ApiResponse(false, message, null, errors, statusCode);
  }
}

export default ApiResponse;
