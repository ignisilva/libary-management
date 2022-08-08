const DataLoader = require('dataloader');
const { Op } = require('sequelize');
const { authRepository } = require('../../../repositories');

const getAuth = new DataLoader(async (userIds) => {
  const auths = await authRepository.getAuthsByOptions({
    where: {
      userId: { [Op.in]: userIds },
    },
  });

  return auths;
});

module.exports = {
  getAuth,
};
