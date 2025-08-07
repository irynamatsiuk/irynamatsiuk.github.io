class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'Application Error';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
