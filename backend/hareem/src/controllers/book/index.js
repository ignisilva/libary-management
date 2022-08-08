const { bookService } = require('../../services');

const createBookInfoWithBook = async (ctx) => {
  try {
    const book = await bookService.createBookInfoWithBook(ctx.request.body);

    ctx.body = book;
  } catch (err) {
    ctx.throw(err);
  }
};

const getBookInfos = async (ctx) => {
  try {
    const bookInfos = await bookService.getBookInfos(ctx.request.query);

    ctx.body = bookInfos;
  } catch (err) {
    ctx.throw(err);
  }
};

const getBookInfo = async (ctx) => {
  const { bookInfoId } = ctx.params;

  try {
    const bookInfo = await bookService.getBookInfo(bookInfoId);

    ctx.body = bookInfo;
  } catch (err) {
    ctx.throw(err);
  }
};

const updateBookInfo = async (ctx) => {
  const { bookInfoId } = ctx.params;

  try {
    const book = await bookService.updateBookInfo(bookInfoId, ctx.request.body);

    ctx.body = book;
  } catch (err) {
    ctx.throw(err);
  }
};

const deleteBook = async (ctx) => {
  const { id } = ctx.params;

  try {
    const book = await bookService.deleteBook(id);

    ctx.body = book;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createBookInfoWithBook,
  getBookInfos,
  getBookInfo,
  updateBookInfo,
  deleteBook,
};
