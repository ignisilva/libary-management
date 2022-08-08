const { ERROR_CODE } = require('../../constants');
const { ERROR_MESSAGE } = require('../../constants/error');
const { Auth } = require('../../database/models');
const { CustomError } = require('../../errors');

const saveRefreshToken = async (userId, refreshToken) => {
  try {
    const result = await Auth.update({
      refreshToken,
    }, {
      where: { userId },
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getAuth = async (getBy) => {
  try {
    const auth = await Auth.findOne({
      where: getBy,
    });

    return auth;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getAuthsByOptions = async (options) => {
  try {
    const auths = await Auth.findAll(options);

    return auths;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

module.exports = {
  saveRefreshToken,
  getAuth,
  getAuthsByOptions,
};
