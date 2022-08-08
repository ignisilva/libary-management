module.exports = {
  async up(queryInterface, Sequelize) {
    const dummy = [];

    for (let i = 0; i < 20; i += 1) {
      dummy.push({
        id: (i + 1),
        isRentaled: false,
        createdAt: new Date(),
        deletedAt: null,
        bookInfoId: (i % 4) + 1,
      });
    }

    await queryInterface.bulkInsert('Books', dummy);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
