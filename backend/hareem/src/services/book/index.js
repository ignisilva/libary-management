/* eslint-disable max-len */
const { bookRepository } = require('../../repositories');
const { BUSINESS, ERROR_CODE, ERROR_MESSAGE } = require('../../constants');
const { CustomError } = require('../../errors');

const createBookInfoWithBook = async (createBookData) => {
  const { isbn } = createBookData;

  // isbn(책 종류 고유번호)로 정보가 등록된 책인지 확인, 등록되있지 않다면, 책 정보 등록 + 책 (실물) 입고 처리
  const bookInfo = await bookRepository.getBookInfoByISBN(isbn);
  if (!bookInfo) {
    const result = await bookRepository.createBookInfoWithBook(createBookData);
    return result;
  }

  // 한 종류의 책 당 등록할 수 있는 권 수 제한을 넘어선다면, error
  if (bookInfo.Books && bookInfo.Books.length >= BUSINESS.BOOK_REGIGISTATION_LIMIT) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.NO_MORE_REGISTER_BOOK);
  }

  // 정보가 등록되어 있다면, 책만 입고 처리
  const book = await bookRepository.createBook({
    bookInfoId: bookInfo.id,
  });

  bookInfo.dataValues.Books = [book];
  return bookInfo;
};

const getBookInfos = async (getBooksQuery) => {
  const bookInfos = await bookRepository.getBookInfos(getBooksQuery);
  return bookInfos;
};

const getBookInfo = async (bookInfoId, only = false) => {
  const bookInfo = await bookRepository.getBookInfo(bookInfoId, only);
  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_RESOURCE, ERROR_MESSAGE.NOT_FOUND_RESOURCE.BOOK_INFO);
  }
  return bookInfo;
};

const updateBookInfo = async (bookInfoId, updateBookData) => {
  const { only } = updateBookData;

  await bookRepository.updateBookInfo(bookInfoId, updateBookData);

  const bookInfo = await bookRepository.getBookInfo(bookInfoId, only);
  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_RESOURCE, ERROR_MESSAGE.NOT_FOUND_RESOURCE.BOOK_INFO);
  }
  return bookInfo;
};

const getBooks = async (bookInfoId) => {
  const books = await bookRepository.getBooks(bookInfoId);
  return books;
};

const getBook = async (bookId) => {
  const book = await bookRepository.getBook(bookId);
  if (!book) {
    throw new CustomError(ERROR_CODE.NOT_FOUND_RESOURCE, ERROR_MESSAGE.NOT_FOUND_RESOURCE.BOOK);
  }
  return book;
};

const deleteBook = async (bookId) => {
  const result = await bookRepository.deleteBook(bookId);
  if (!result) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.DELETE_FAIL_BOOK);
  }
  return '도서 정보 말소 완료';
};

const createBookInfoWithBookGql = async (input) => {
  const { isbn } = input;

  // isbn(책 종류 고유번호)로 정보가 등록된 책인지 확인, 등록되있지 않다면, 책 정보 등록 + 책 (실물) 입고 처리
  const bookInfo = await bookRepository.getBookInfoByISBN(isbn);
  if (!bookInfo) {
    const result = await bookRepository.createBookInfoWithBookGql(input);
    return result;
  }

  // 한 종류의 책 당 등록할 수 있는 권 수 제한을 넘어선다면, error
  if (bookInfo.Books && bookInfo.Books.length >= BUSINESS.BOOK_REGIGISTATION_LIMIT) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.NO_MORE_REGISTER_BOOK);
  }

  // 정보가 등록되어 있다면, 책만 입고 처리
  const book = await bookRepository.createBook({
    bookInfoId: bookInfo.id,
  });

  return book;
};

module.exports = {
  createBookInfoWithBook,
  getBookInfos,
  getBookInfo,
  updateBookInfo,
  getBooks,
  getBook,
  deleteBook,
  createBookInfoWithBookGql,
};
