module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '해당 컬럼은 사용자의 email을 나타냅니다.',
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      comment: '해당 컬럼은 사용자의 비밀번호를 나타냅니다. 해당값은 복호화 불가능한 해시값 입니다.',
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      comment: '해당 컬럼은 사용자의 핸드폰 번호를 나타냅니다. ex) "01021215353"',
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '해당 컬럼은 사용자의 이름을 나타냅니다.',
    },
    isBlack: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '해당 컬럼은 사용자가 블랙 유저인지를 나타냅니다.',
    },
    rentalCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '해당 컬럼은 사용자가 대여한 도서 권수를 나타냅니다.',
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    paranoid: true,
  });
  User.associate = (models) => {
    User.hasOne(models.Auth, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
    User.hasMany(models.Rental, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
    User.hasMany(models.Reservation, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
  };

  return User;
};
