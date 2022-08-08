const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { USER_ROLE } = require('../../../constants');
const { authMiddleware } = require('../../../middlewares');
const { bookService } = require('../../../services');

const bookResolver = {
  Book: {
    bookInfo: async ({ bookInfoId }, _, { loaders }) => {
      const bookInfo = loaders.book.getBookInfo.load(bookInfoId);
      return bookInfo;
    },
  },

  BookInfo: {
    books: async ({ id: bookInfoId }, _, { loaders }) => {
      const books = loaders.book.getBooks.load(bookInfoId);
      return books;
    },
  },

  Query: {
    getBookInfosWithBooks: async (_, { input }) => {
      const bookInfos = await bookService.getBookInfos({ ...input, only: true });
      return { bookInfos };
    },
  },

  Mutation: {
    createBook: async (_, { input }) => {
      const book = await bookService.createBookInfoWithBookGql(input);
      return { book };
    },

    updateBookInfo: async (_, { input }) => {
      const { id: bookInfoId } = input;
      const bookInfo = await bookService.updateBookInfo(bookInfoId, { ...input, only: true });
      return { bookInfo };
    },

    deleteBook: async (_, { input }) => {
      const { bookId } = input;
      const result = await bookService.deleteBook(bookId);
      return { result };
    },
  },
};

const resolversComposition = {
  'Mutation.createBook': [authMiddleware([USER_ROLE.ADMIN], true)],
  'Mutation.updateBookInfo': [authMiddleware([USER_ROLE.ADMIN], true)],
  'Mutation.deleteBook': [authMiddleware([USER_ROLE.ADMIN], true)],
};

const composedBookResolver = composeResolvers(bookResolver, resolversComposition);

module.exports = composedBookResolver;
