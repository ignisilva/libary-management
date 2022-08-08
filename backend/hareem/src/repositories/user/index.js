const {
  User, Auth, sequelize, Sequelize: { Op },
} = require('../../database/models');
const { timer } = require('../../utils');
const { QUERY, BUSINESS, USER_ROLE } = require('../../constants');
const { CustomError } = require('../../errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../../constants/error');

const createUser = async (createData) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const {
        email,
        password,
        phone,
        name,
        role = USER_ROLE.USER,
        only = false,
      } = createData;

      const user = await User.create({
        email,
        password,
        phone,
        name,
      }, {
        transaction,
      });

      const auth = await Auth.create({
        role,
        userId: user.id,
      }, {
        transaction,
      });

      delete user.password;
      if (!only) {
        user.dataValues.Auth = auth;
      }

      return user;
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getUsers = async (getUsersQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    email,
    isBlack = false,
    role,
    from,
    to,
    filter,
    only = false,
  } = getUsersQuery;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { createdAt: { [Op.gte]: timer.beforeNDate(30) } };
  const order = [['createdAt', 'DESC']];
  const paranoid = filter === QUERY.FILTER.NONE; // filter가 ALL or DELETE 라면 paranoid = false

  if (email) {
    where.email = { [Op.like]: `%${email}%` };
  }

  if (isBlack) {
    where.isBlack = { [Op.gte]: isBlack };
  }

  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }

  if (filter === QUERY.FILTER.DELETED) {
    where.deletedAt = { [Op.not]: null };
  }

  const authWhere = {};
  if (role) {
    authWhere.role = { [Op.eq]: role };
  }

  const options = {
    where,
    limit,
    offset,
    attributes: { exclude: ['password'] },
    paranoid,
    order,
  };

  if (!only) {
    options.include = {
      model: Auth,
      attributes: ['role', 'updatedAt'],
      where: authWhere,
    };
  }

  try {
    const users = await User.findAll(options);

    return users;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getUserById = async (id, only = false) => {
  const options = {
    attributes: { exclude: ['password'] },
  };

  if (!only) {
    options.include = {
      model: Auth,
      attributes: ['role', 'updatedAt'],
    };
  }

  try {
    const user = await User.findByPk(id, options);

    return user;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getUser = async (getBy, selectPassword = false) => {
  try {
    const user = await User.findOne({
      where: getBy,
      attributes: { exclude: [selectPassword ? '' : 'password'] },
      include: {
        model: Auth,
        attributes: ['role', 'updatedAt'],
      },
    });

    return user;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const updateUser = async (updateBy, updateData) => {
  const {
    password,
    phone,
    name,
  } = updateData;

  try {
    const result = await User.update({
      password,
      phone,
      name,
    }, {
      where: updateBy,
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const updateUserByAdmin = async (id, updateData) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const {
        password,
        phone,
        name,
        isBlack = false,
        rentalCount,
        role,
        refreshToken,
      } = updateData;

      const updateResult = await User.update({
        password,
        phone,
        name,
        isBlack,
        rentalCount,
      }, {
        where: { id },
        transaction,
      });

      await Auth.update({
        role,
        refreshToken,
      }, {
        where: { userId: id },
        transaction,
      });

      return updateResult;
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const deleteUser = async (deleteBy) => {
  try {
    const result = await User.destroy({
      where: deleteBy,
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getUsersByOptions = async (options) => {
  try {
    const users = await User.findAll(options);

    return users;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUser,
  updateUser,
  updateUserByAdmin,
  deleteUser,
  getUsersByOptions,
};
