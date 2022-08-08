const { USER_ROLE } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: USER_ROLE.USER,
      comment: '해당 컬럼은 사용자의 Role을 나타냅니다 Role에는 "USER", "ADMIN" 가 있습니다.',
    },
    refreshToken: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: null,
      comment: '해당 컬럼은 user의 Refresh token을 나타냅니다.',
    },
  }, {
    timestamps: true,
    createdAt: false,
    updatedAt: true,
  });
  Auth.associate = (models) => {
    Auth.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };
  Auth.removeAttribute('id');
  return Auth;
};
