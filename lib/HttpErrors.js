if (process._HttpErrors) { // Make sure only one version of this module. Kind of a hack, kind of the best way.
  return module.exports = process._HttpErrors
}

/***************************************************************************************************
 * @namespace http-errors 
 */

var util = require('util')
    
/***************************************************************************************************
 * @class HttpError
 * @description HttpError class description
 * @memberof http-errors
 */
function HttpError(message, code, description, response, captureStackTrace) {
  Error.call(this)
	
  // capture stack trace unless passed false
  if (captureStackTrace !== false) {
    Error.captureStackTrace(this, arguments.callee)
  }
  
  /*****************************************************************************
   * @property {xxx} code -- xxx
   */
  this.code = code || 500

  /*****************************************************************************
   * @property {string} description -- xxx
   */
  this.description = description || "InternalServiceError"

  /*****************************************************************************
   * @property {xxx} message -- xxx
   */
  this.message = message

  /*****************************************************************************
   * @property {xxx} response -- xxx
   */

  this.response = response
}
util.inherits(HttpError, Error)

/***************************************************************************************************
 * @class makeHttpErrorClass
 * @description makeHttpErrorClass class description
 * @memberof http-errors
 */
function makeHttpErrorClass(code, description) {
  /*****************************************************************************
   * @method C
   * @description C description
   * @param {string} message -- xxx
   * @param {xxx} response -- xxx
   * @returns {xxx} -- xxx
   */
  var C = function(message, response) {
    HttpError.call(this, message, code, description, response, false)
    Error.captureStackTrace(this, arguments.callee)
  }
  util.inherits(C, HttpError)
  C.code = code // Tag class with code as well for convenience
  
  return C
}

/******************************************************************************
 * module.exports
 */

var HTTP_ERRORS_BY_NAME = {
  // 400's
  BadRequest: makeHttpErrorClass(400, "Bad Request"),
  Unauthorized: makeHttpErrorClass(401, 'Unauthorized'),
  PaymentRequired: makeHttpErrorClass(402, 'Payment Required'),
  Forbidden: makeHttpErrorClass(403, "Forbidden"),
  NotFound: makeHttpErrorClass(404, 'Not Found'),
  MethodNotAllowed: makeHttpErrorClass(405, 'Method Not Allowed'),
  NotAcceptable: makeHttpErrorClass(406, 'Not Acceptable'),
  ProxyAuthenticationRequired: makeHttpErrorClass(407, 'Proxy Authentication Required'),
  RequestTimeout: makeHttpErrorClass(408, 'Request Time-out'),
  Conflict: makeHttpErrorClass(409, 'Conflict'),
  Gone: makeHttpErrorClass(410, 'Gone'),
  LengthRequired: makeHttpErrorClass(411, 'Length Required'),
  PreconditionFailed: makeHttpErrorClass(412, 'Precondition Failed'),
  RequestEntityTooLarge: makeHttpErrorClass(413, 'Request Entity Too Large'),
  RequestURITooLarge: makeHttpErrorClass(414, 'Request-URI Too Large'),
  UnsupportedMediaType: makeHttpErrorClass(415, 'Unsupported Media Type'),
  RequestedRangenotSatisfiable: makeHttpErrorClass(416, 'Requested Range not Satisfiable'),
  ExpectationFailed: makeHttpErrorClass(417, 'Expectation Failed'),
  ImATeapot: makeHttpErrorClass(418, 'I\'m a teapot'),
  MisdirectedRequest: makeHttpErrorClass(421, 'Misdirected Request'),
  UnprocessableEntity: makeHttpErrorClass(422, 'Unprocessable Entity'),
  Locked: makeHttpErrorClass(423, 'Locked'),
  FailedDependency: makeHttpErrorClass(424, 'Failed Dependency'),
  UpgradeRequired: makeHttpErrorClass(426, 'Upgrade Required'),
  PreconditionRequired: makeHttpErrorClass(428, 'Precondition Required'),
  TooManyRequests: makeHttpErrorClass(429, 'Too Many Requests'),
  RequestHeaderFieldsTooLarge: makeHttpErrorClass(431, 'Request Header Fields Too Large'),
  // 500's
  InternalServerError: makeHttpErrorClass(500, "Internal Server Error"),
  NotImplemented: makeHttpErrorClass(501, 'Not Implemented'),
  BadGateway: makeHttpErrorClass(502, 'Bad Gateway'),
  ServiceUnavailable: makeHttpErrorClass(503, 'Service Unavailable'),
  GatewayTimeOut: makeHttpErrorClass(504, 'Gateway Time-out'),
  HTTPVersionNotSupported: makeHttpErrorClass(505, 'HTTP Version not Supported'),
  VariantAlsoNegotiates: makeHttpErrorClass(506, 'Variant Also Negotiates'),
  InsufficientStorage: makeHttpErrorClass(507, 'Insufficient Storage'),
  LoopDetected: makeHttpErrorClass(508, 'Loop Detected'),
  NotExtended: makeHttpErrorClass(510, 'Not Extended'),
  NetworkAuthenticationRequired: makeHttpErrorClass(511, 'Network Authentication Required'),
}

// create mapping by code
var HTTP_ERRORS_BY_CODE = {}

for (var name in HTTP_ERRORS_BY_NAME) {
  var httpError = HTTP_ERRORS_BY_NAME[name]
  HTTP_ERRORS_BY_CODE[httpError.code] = httpError
}

// create the module export
var HTTP_ERRORS_EXPORT = {
  HttpError: HttpError,
  names: HTTP_ERRORS_BY_NAME,
  codes: HTTP_ERRORS_BY_CODE
}


// default mapping by name
for (var name in HTTP_ERRORS_BY_NAME) {
  var httpError = HTTP_ERRORS_BY_NAME[name]
  HTTP_ERRORS_EXPORT[name] = httpError
}

process._HttpErrors = module.exports = HTTP_ERRORS_EXPORT
