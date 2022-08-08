const { USER_ROLE } = require('../../constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummy = [{
      userId: '6b832069-d199-4b11-9c2c-a0454e39cd7f',
      role: USER_ROLE.ADMIN,
      refreshToken: null,
      updatedAt: new Date(),
    }, {
      userId: '26637c74-34ae-4de0-a129-6a040b7a3bba',
      role: USER_ROLE.USER,
      refreshToken: null,
      updatedAt: new Date(),
    }];

    await queryInterface.bulkInsert('Auths', dummy);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Auths', null, {});
  },
};
