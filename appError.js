export class AppError extends Error {
    constructor(message, statusCode) {
      super(message); // Call the parent constructor (Error)
      this.statusCode = statusCode; // Set the status code
      this.isOperational = true; // Indicate if the error is operational (not a programming error)
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
  }
  