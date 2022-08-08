const bcrypt = require('bcrypt');
const { ERROR_CODE } = require('../../constants');
const { ERROR_MESSAGE } = require('../../constants/error');
const { CustomError } = require('../../errors');

const hash = async (plaintextPassword, saltRounds = Number(process.env.HASH_SALT)) => {
  try {
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);

    return hashedPassword;
  } catch (err) {
    throw new CustomError(ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR.STANDARD);
  }
};

const compare = async (plaintextPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plaintextPassword, hashedPassword);

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR.STANDARD);
  }
};

module.exports = {
  hash,
  compare,
};
