const Router = require('@koa/router');
const { USER_ROLE } = require('../../constants');
const { userController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const userRouter = new Router();

userRouter.get('/self', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), userController.getUserSelf);
userRouter.patch('/self', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), userController.updateUserSelf); // userController.updateUserSelf
userRouter.delete('/self', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), userController.deleteUserSelf);

userRouter.get('/', authMiddleware([USER_ROLE.ADMIN]), userController.getUsers);
userRouter.get('/:id', authMiddleware([USER_ROLE.ADMIN]), userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', authMiddleware([USER_ROLE.ADMIN]), userController.updateUser);
userRouter.delete('/:id', authMiddleware([USER_ROLE.ADMIN]), userController.deleteUser);

module.exports = userRouter;
