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

const getBookInfo = new DataLoader(async (bookInfoIds) => {
  const bookInfos = await bookRepository.getBookInfosByOptions({
    where: {
      id: { [Op.in]: bookInfoIds },
    },
  });

  return bookInfos;
});

module.exports = {
  getUser,
  getBookInfo,
};
