class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // "message" property
    this.code = errorCode; // Error "code" property eg. 404
  }
}

module.exports = HttpError;
