module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: '해당 컬럼은 사용자의 email을 나타냅니다.',
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        comment: '해당 컬럼은 사용자의 비밀번호를 나타냅니다. 해당값은 복호화 불가능한 해시값 입니다.',
      },
      phone: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        comment: '해당 컬럼은 사용자의 핸드폰 번호를 나타냅니다. ex) "01021215353"',
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '해당 컬럼은 사용자의 이름을 나타냅니다.',
      },
      isBlack: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '해당 컬럼은 사용자가 블랙 유저인지를 나타냅니다.',
      },
      rentalCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '해당 컬럼은 사용자가 대여한 도서 권수를 나타냅니다.',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
