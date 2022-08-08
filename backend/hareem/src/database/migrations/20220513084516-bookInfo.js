module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookInfos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isbn: {
        type: Sequelize.STRING(24),
        allowNull: false,
        unique: true,
        comment: '해당 컬럼은 도서 고유번호를 나타냅니다. ex) 1166570428 9791166570421',
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '해당 컬럼은 책 제목을 나타냅니다.',
      },
      author: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '해당 컬럼은 저자들을 나타냅니다.',
      },
      publisher: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '해당 컬럼은 발행사를 나타냅니다.',
      },
      publishDate: {
        type: Sequelize.STRING(6),
        allowNull: false,
        comment: '해당 컬럼은 책 발행일을 나타냅니다. ex) "220428"',
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: '해당 컬럼은 책에 대한 소개를 나타냅니다.',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookInfos');
  },
};
