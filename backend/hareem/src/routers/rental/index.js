const Router = require('@koa/router');
const { USER_ROLE } = require('../../constants');
const { rentalController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const rentalRouter = new Router();

rentalRouter.get('/users', authMiddleware([USER_ROLE.ADMIN]), rentalController.getUsersRentals);
rentalRouter.get('/', authMiddleware([USER_ROLE.USER], [USER_ROLE.ADMIN]), rentalController.getUserRentals);
rentalRouter.get('/:rentalId', authMiddleware([USER_ROLE.ADMIN]), rentalController.getRentalsByRentalId);
rentalRouter.post('/start', authMiddleware([USER_ROLE.ADMIN]), rentalController.createRentalStart);
rentalRouter.post('/extension', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), rentalController.createRentalExtend);
rentalRouter.post('/end', authMiddleware([USER_ROLE.ADMIN]), rentalController.createRentalEnd);

module.exports = rentalRouter;
