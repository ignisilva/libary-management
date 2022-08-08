/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const { HTTP_STATUS, HTTP_STATUS_CODE, ERROR_CODE } = require('./constants');

class CustomError extends Error {
  code = undefined;

  filePath = undefined;

  function = undefined;

  constructor(errorCode, errorMessage, ...params) {
    super(...params);

    this.status = this._getHttpStatusByErrorCode(errorCode);
    this.code = this._getHttpStatusCodeByErrorCode(errorCode);
    this.name = errorCode;
    this.message = errorMessage;

    if (errorCode !== ERROR_CODE.INVALID_DATA) {
      this._makeFilePathAndFunction();
    }
  }

  _getHttpStatusByErrorCode(errorCode = ERROR_CODE.UNKNOWN) {
    const httpStatusErrorMappingTable = {
      // BAD_REQUEST
      INVALID_DATA: HTTP_STATUS.BAD_REQUEST,
      INVALID_REQUEST: HTTP_STATUS.BAD_REQUEST,

      // UNAUTHORIZED
      LOGIN_FAIL: HTTP_STATUS.UNAUTHORIZED,
      NOT_FOUND_TOKEN: HTTP_STATUS.UNAUTHORIZED,
      INVALID_TOKEN: HTTP_STATUS.UNAUTHORIZED,
      VERIFY_FAIL_TOKEN: HTTP_STATUS.UNAUTHORIZED,

      // FORBIDDEN
      PERMISSION_DENIED: HTTP_STATUS.FORBIDDEN,

      // NOT_FOUNT
      NOT_FOUND_RESOURCE: HTTP_STATUS.NOT_FOUND,

      // CONFLICT
      ALREADY_REGISTED_RESOURCE: HTTP_STATUS.CONFLICT,

      // INTERNAL_SERVER_ERROR
      DB_FAIL: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      UNKNOWN: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      SERVER_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };

    const httpStatus = httpStatusErrorMappingTable[errorCode] || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    return httpStatus;
  }

  _getHttpStatusCodeByErrorCode(errorCode = ERROR_CODE.UNKNOWN) {
    const httpStatusCodeErrorMappingTable = {
      // BAD_REQUEST
      INVALID_DATA: HTTP_STATUS_CODE.BAD_REQUEST,
      INVALID_REQUEST: HTTP_STATUS_CODE.BAD_REQUEST,

      // UNAUTHORIZED
      LOGIN_FAIL: HTTP_STATUS_CODE.UNAUTHORIZED,
      NOT_FOUND_TOKEN: HTTP_STATUS_CODE.UNAUTHORIZED,
      INVALID_TOKEN: HTTP_STATUS_CODE.UNAUTHORIZED,
      VERIFY_FAIL_TOKEN: HTTP_STATUS_CODE.UNAUTHORIZED,

      // FORBIDDEN
      PERMISSION_DENIED: HTTP_STATUS_CODE.FORBIDDEN,

      // NOT_FOUNT
      NOT_FOUND_RESOURCE: HTTP_STATUS_CODE.NOT_FOUND,

      // CONFLICT
      ALREADY_REGISTED_RESOURCE: HTTP_STATUS_CODE.CONFLICT,

      // INTERNAL_SERVER_ERROR
      DB_FAIL: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      UNKNOWN: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      SERVER_ERROR: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    };

    const httpStatusCode = httpStatusCodeErrorMappingTable[errorCode] || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

    return httpStatusCode;
  }

  _makeFilePathAndFunction(stack = this.stack) {
    const lastStackInfo = stack.split('\n')[1].trim().split(' ');

    this.function = lastStackInfo[1].substring('Object.'.length);

    const rootDir = '/src';
    const rootDirIndex = lastStackInfo[2].indexOf(rootDir);

    const colonIndex = lastStackInfo[2].indexOf(':');

    this.filePath = lastStackInfo[2].substring(rootDirIndex, colonIndex);
  }
}

module.exports = {
  CustomError,
};
