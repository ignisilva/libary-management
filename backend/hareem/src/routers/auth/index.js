const Router = require('@koa/router');
const validator = require('koa-context-validator');
const { USER_ROLE } = require('../../constants');
const { authController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const { Joi } = validator;

const authRouter = new Router();

authRouter.post(
  '/login',
  validator.default({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
    }),
  }),
  authController.login,
);
authRouter.post('/logout', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), authController.logout);
authRouter.post('/token', authController.refreshAccessToken);

module.exports = authRouter;
