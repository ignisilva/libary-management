const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummy = [{
      id: '6b832069-d199-4b11-9c2c-a0454e39cd7f',
      email: 'admin@barogo.com',
      password: '$2b$10$WrkaBRbCjyhRI41JwFfV9eJKRvSelvFwalf/SoSAaRRaYQJyTSDRC',
      phone: `010${String(new Date().getTime() - 2).substring(5, 13)}`,
      name: 'admin',
      isBlack: false,
      rentalCount: 0,
      createdAt: new Date(),
      deletedAt: null,
    }, {
      id: '26637c74-34ae-4de0-a129-6a040b7a3bba',
      email: 'user@barogo.com',
      password: '$2b$10$Y7oYvngSAREYh8GpHWaGi.M2gzJpxht/DsuQzevvgO3HrA37Y90AS',
      phone: `010${String(new Date().getTime() - 1).substring(5, 13)}`,
      name: 'user',
      isBlack: false,
      rentalCount: 2,
      createdAt: new Date(),
      deletedAt: null,
    }];
    for (let i = 0; i < 20; i += 1) {
      dummy.push({
        id: uuidv4(),
        email: `test${i}@barogo.com`,
        password: `test${i}`,
        phone: `010${String(new Date().getTime() + i).substring(5, 13)}`,
        name: `test${i}`,
        isBlack: false,
        rentalCount: 0,
        createdAt: new Date(),
        deletedAt: null,
      });
    }

    await queryInterface.bulkInsert('Users', dummy);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
