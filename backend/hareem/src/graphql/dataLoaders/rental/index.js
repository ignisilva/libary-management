const DataLoader = require('dataloader');
const { Op } = require('sequelize');
const { bookRepository, userRepository } = require('../../../repositories');

const getUser = new DataLoader(async (userIds) => {
  const users = await userRepository.getUsersByOptions({
    where: {
      id: { [Op.in]: userIds },
    },
  });

  return users;
});

const getBook = new DataLoader(async (bookIds) => {
  const books = await bookRepository.getBooksByOptions({
    where: {
      id: { [Op.in]: bookIds },
    },
  });

  return books;
});

module.exports = {
  getUser,
  getBook,
};
