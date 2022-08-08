const {
  Sequelize: { Op }, sequelize, BookInfo, Book,
} = require('../../database/models');
const { timer } = require('../../utils');
const {
  QUERY, BUSINESS, ERROR_CODE, ERROR_MESSAGE,
} = require('../../constants');
const { CustomError } = require('../../errors');

const createBookInfoWithBook = async (createBookInfoWithBookData) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const {
        isbn,
        title,
        author,
        publisher,
        publishDate,
        description,
      } = createBookInfoWithBookData;

      const bookInfo = await BookInfo.create({
        isbn,
        title,
        author,
        publisher,
        publishDate,
        description,
      }, {
        transaction,
      });

      const book = await Book.create({
        bookInfoId: bookInfo.id,
      }, {
        transaction,
      });

      bookInfo.dataValues.Books = [book];
      return bookInfo;
    });
    return result;
  } catch (err) {
    console.log(err);
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBookInfos = async (getBooksQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    isbn,
    title,
    author,
    publisher,
    from,
    to,
    filter = QUERY.FILTER.NONE,
    eachFrom,
    eachTo,
    only,
  } = getBooksQuery;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { createdAt: { [Op.gte]: timer.beforeNDate(30) } };
  const order = [['createdAt', 'DESC']];
  const paranoid = filter === QUERY.FILTER.NONE; // filter가 ALL or DELETE 라면 paranoid = false

  if (isbn) {
    where.isbn = { [Op.eq]: isbn };
  }

  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }

  if (author) {
    where.author = { [Op.like]: `%${author}%` };
  }

  if (publisher) {
    where.publisher = { [Op.like]: `%${publisher}%` };
  }

  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }

  if (filter === QUERY.FILTER.DELETED) {
    where.deletedAt = { [Op.not]: null };
  }

  const bookWhere = {};

  if (eachFrom && eachTo) {
    bookWhere.createdAt = {
      [Op.between]: [timer.stringToDate(eachFrom), timer.stringToDate(eachTo)],
    };
  } else if (eachFrom) {
    bookWhere.createdAt = { [Op.gte]: timer.stringToDate(eachFrom) };
  } else if (eachTo) {
    bookWhere.createdAt = { [Op.lte]: timer.stringToDate(eachTo) };
  }

  const options = {
    where,
    limit,
    offset,
    paranoid,
    order,
  };

  if (!only) {
    options.include = {
      model: Book,
      paranoid,
      where: bookWhere,
    };
  }

  try {
    const bookInfos = await BookInfo.findAll(options);

    return bookInfos;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBookInfo = async (bookInfoId, only = false) => {
  const options = {};
  if (!only) {
    options.include = { model: Book };
  }

  try {
    const bookInfo = await BookInfo.findByPk(bookInfoId, options);

    return bookInfo;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBookInfoByISBN = async (isbn) => {
  try {
    const bookInfo = await BookInfo.findOne({
      where: { isbn },
      include: { model: Book },
    });

    return bookInfo;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const updateBookInfo = async (bookInfoId, updateBookData) => {
  const {
    isbn,
    title,
    author,
    publisher,
    publishDate,
    description,
  } = updateBookData;

  try {
    const result = await BookInfo.update({
      isbn,
      title,
      author,
      publisher,
      publishDate,
      description,
    }, {
      where: { id: bookInfoId },
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const createBook = async (createBookData) => {
  try {
    const book = await Book.create(createBookData);

    return book;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBooks = async (bookInfoId) => {
  try {
    // 도서관에 등록 가능한 한 종류의 도서는 최대 5권 -> limit 옵션?? 사용하지 않음
    const books = await Book.findAll({
      where: { bookInfoId },
      order: [['createdAt', 'DESC']],
    });

    return books;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBook = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId, {
      include: {
        model: BookInfo,
      },
    });

    return book;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const deleteBook = async (id) => {
  try {
    const result = await Book.destroy({
      where: { id },
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const createBookInfoWithBookGql = async (createBookInput) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const {
        isbn,
        title,
        author,
        publisher,
        publishDate,
        description,
      } = createBookInput;

      const bookInfo = await BookInfo.create({
        isbn,
        title,
        author,
        publisher,
        publishDate,
        description,
      }, {
        transaction,
      });

      const book = await Book.create({
        bookInfoId: bookInfo.id,
      }, {
        transaction,
      });

      return book;
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBooksByBookInfoIds = async (bookInfoIds) => {
  try {
    const books = await Book.findAll({
      where: {
        bookInfoId: { [Op.in]: bookInfoIds },
      },
      order: [['createdAt', 'DESC']],
    });

    return books;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBookInfosByIds = async (ids) => {
  try {
    const bookInfos = await BookInfo.findAll({
      where: {
        id: { [Op.in]: ids },
      },
      order: [['createdAt', 'DESC']],
    });

    return bookInfos;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBooksByOptions = async (options) => {
  try {
    const books = await Book.findAll(options);

    return books;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getBookInfosByOptions = async (options) => {
  try {
    const bookInfos = await BookInfo.findAll(options);

    return bookInfos;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

module.exports = {
  createBookInfoWithBook,
  getBookInfos,
  getBookInfo,
  getBookInfoByISBN,
  updateBookInfo,
  createBook,
  getBooks,
  getBook,
  deleteBook,
  createBookInfoWithBookGql,
  getBooksByBookInfoIds,
  getBookInfosByIds,
  getBooksByOptions,
  getBookInfosByOptions,
};
