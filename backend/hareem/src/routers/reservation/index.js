const Router = require('@koa/router');
const { USER_ROLE } = require('../../constants');
const { reservationController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const reservationRouter = new Router();

reservationRouter.get('/users', authMiddleware([USER_ROLE.ADMIN]), reservationController.getUsersReservations);
reservationRouter.get('/', authMiddleware([USER_ROLE.USER]), reservationController.getUserReservations);
reservationRouter.post('/:bookInfoId', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), reservationController.createReservation);
reservationRouter.delete('/:id', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), reservationController.deleteReservation);

module.exports = reservationRouter;
