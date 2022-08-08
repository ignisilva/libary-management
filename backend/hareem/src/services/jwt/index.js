const jwt = require('jsonwebtoken');
const { ERROR_CODE } = require('../../constants');
const { ERROR_MESSAGE } = require('../../constants/error');
const { CustomError } = require('../../errors');

const sign = ({ payload, secretKey, options }) => {
  try {
    const token = jwt.sign(payload, secretKey, options);

    return token;
  } catch {
    throw new CustomError(ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR.STANDARD);
  }
};

const verify = ({ token, secretKey }) => {
  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded;
  } catch (err) {
    throw new CustomError(ERROR_CODE.VERIFY_FAIL_TOKEN, ERROR_MESSAGE.VERIFY_FAIL_TOKEN.STANDARD);
  }
};

module.exports = {
  sign,
  verify,
};
