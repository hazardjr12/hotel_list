class ErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.severError = this.constructor.severError;
  }
}
