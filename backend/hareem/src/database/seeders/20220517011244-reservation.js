module.exports = {
  async up(queryInterface, Sequelize) {
    const dummy = [{
      id: 1,
      doneDate: '2022-05-23T15:00:00.000Z',
      createdAt: '2022-05-17T00:35:25.324Z',
      userId: '26637c74-34ae-4de0-a129-6a040b7a3bba',
      bookInfoId: 1,
    }, {
      id: 2,
      doneDate: '2022-05-27T15:00:00.000Z',
      createdAt: '2022-05-21T00:36:33.930Z',
      userId: '26637c74-34ae-4de0-a129-6a040b7a3bba',
      bookInfoId: 1,
    }, {
      id: 3,
      doneDate: '2022-06-1T15:00:00.000Z',
      createdAt: '2022-05-26T00:38:00.116Z',
      userId: '26637c74-34ae-4de0-a129-6a040b7a3bba',
      bookInfoId: 1,
    }, {
      id: 4,
      doneDate: '2022-06-3T15:00:00.000Z',
      createdAt: '2022-05-28T00:38:00.116Z',
      userId: '26637c74-34ae-4de0-a129-6a040b7a3bba',
      bookInfoId: 1,
    }];

    await queryInterface.bulkInsert('Reservations', dummy);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {});
  },
};
