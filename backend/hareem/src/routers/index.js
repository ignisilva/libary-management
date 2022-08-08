const Router = require('@koa/router');

const authRouter = require('./auth');
const userRouter = require('./user');
const bookRouter = require('./book');
const rentalRouter = require('./rental');
const reservationRouter = require('./reservation');

const router = new Router();

router.use('/auth', authRouter.routes());
router.use('/users', userRouter.routes());
router.use('/books', bookRouter.routes());
router.use('/rental', rentalRouter.routes());
router.use('/reservation', reservationRouter.routes());

module.exports = router;
