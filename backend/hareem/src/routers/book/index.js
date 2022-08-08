const Router = require('@koa/router');
const { USER_ROLE } = require('../../constants');
const { bookController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const bookRouter = new Router();

bookRouter.get('/', bookController.getBookInfos);
bookRouter.get('/:bookInfoId', bookController.getBookInfo);
bookRouter.post('/', authMiddleware([USER_ROLE.ADMIN]), bookController.createBookInfoWithBook);
bookRouter.patch('/:bookInfoId', authMiddleware([USER_ROLE.ADMIN]), bookController.updateBookInfo);
bookRouter.delete('/:id', authMiddleware([USER_ROLE.ADMIN]), bookController.deleteBook);

module.exports = bookRouter;
