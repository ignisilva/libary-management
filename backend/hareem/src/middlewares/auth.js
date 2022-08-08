/* eslint-disable no-underscore-dangle */
const { ERROR_CODE, ERROR_MESSAGE } = require('../constants');
const { CustomError } = require('../errors');
const { jwtService } = require('../services');

const _authLogic = async (permissions, ctx) => {
  // Authorization 헤더가 없다면, error
  const { authorization } = ctx.headers;
  if (!authorization) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_TOKEN, ERROR_MESSAGE.NOT_FOUND_TOKEN.ACCESS);
  }

  const accessToken = authorization.substring('Bearer '.length);

  // Access token 이 만료됐다면, error
  const { id: userId, role } = await jwtService.verify({
    token: accessToken,
    secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  });

  // 해당 경로에 대한 권한이 없다면, error
  if (!permissions.includes(role)) {
    throw new CustomError(ERROR_CODE.PERMISSION_DENIED, ERROR_MESSAGE.PERMISSION_DENIED.STANDARD);
  }

  ctx.user = {
    id: userId,
    role,
  };
};

const authMiddleware = (permissions = [], isGql = false) => {
  if (isGql) {
    return (next) => async (root, args, context, info) => {
      const { ctx } = context;

      await _authLogic(permissions, ctx);

      return next(root, args, context, info);
    };
  }

  return async (ctx, next) => {
    await _authLogic(permissions, ctx);

    return next();
  };
};

module.exports = authMiddleware;
