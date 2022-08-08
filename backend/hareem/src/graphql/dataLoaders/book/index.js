const DataLoader = require('dataloader');
const { bookRepository } = require('../../../repositories');

const getBooks = new DataLoader(async (bookInfoIds) => {
  const books = await bookRepository.getBooksByBookInfoIds(bookInfoIds);

  const batchedBooks = bookInfoIds.map((bookInfoId) => books.filter((book) => book.bookInfoId === bookInfoId));
  return batchedBooks;
});

const getBookInfo = new DataLoader(async (bookInfoIds) => {
  const bookInfos = await bookRepository.getBookInfosByIds(bookInfoIds);
  return bookInfos;
});

module.exports = {
  getBooks,
  getBookInfo,
};
