const { USER_ROLE } = require('../../constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Auths', {
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: USER_ROLE.USER,
        comment: '해당 컬럼은 사용자의 Role을 나타냅니다 Role에는 "USER", "ADMIN" 가 있습니다.',
      },
      refreshToken: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
        comment: '해당 컬럼은 user의 Refresh token을 나타냅니다.',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Auths');
  },
};
