const {
  Sequelize: { Op }, User, BookInfo, Reservation,
} = require('../../database/models');
const { timer } = require('../../utils');
const { QUERY, BUSINESS } = require('../../constants');
const { CustomError } = require('../../errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../../constants/error');

const createReservation = async (createReservationData) => {
  try {
    const newReservation = await Reservation.create(createReservationData);

    return newReservation;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getUsersReservations = async (getUsersReservationsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    from,
    to,
    filter = QUERY.FILTER.NONE,
    bookInfoId,
    userId,
    only = false,
  } = getUsersReservationsQuery;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { createdAt: { [Op.gte]: timer.beforeNDate(30) } };
  const order = [['createdAt', 'DESC']];
  const paranoid = filter === QUERY.FILTER.NONE;
  const include = [
    { model: BookInfo },
    {
      model: User,
      attributes: { exclude: ['password'] },
    },
  ];

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

  if (bookInfoId) {
    where.bookInfoId = { [Op.eq]: bookInfoId };
  }
  if (userId) {
    where.userId = { [Op.eq]: userId };
  }

  const options = {
    where,
    limit,
    offset,
    order,
    paranoid,
  };

  if (!only) {
    options.include = include;
  }

  try {
    const reservations = await Reservation.findAll(options);

    return reservations;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getUserReservations = async (userId, getReservationsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    from,
    to,
    filter = QUERY.FILTER.NONE,
    bookInfoId,
  } = getReservationsQuery;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { userId, createdAt: { [Op.gte]: timer.beforeNDate(30) } };
  const order = [['createdAt', 'DESC']];
  const include = [{ model: BookInfo }];
  const paranoid = filter === QUERY.FILTER.NONE;

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

  if (bookInfoId) {
    where.bookInfoId = { [Op.eq]: bookInfoId };
  }

  try {
    const reservations = await Reservation.findAll({
      where,
      limit,
      offset,
      order,
      include,
      paranoid,
    });

    return reservations;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const getNextReservationByBookInfo = async (bookInfoId) => {
  try {
    const reservation = await Reservation.findAll({
      where: {
        bookInfoId,
      },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    return reservation;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const deleteReservation = async (deleteBy) => {
  try {
    const result = await Reservation.update({
      doneDate: new Date(),
    }, {
      where: deleteBy,
    });

    return result;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

const countReservation = async (countBy) => {
  try {
    const reservationCount = await Reservation.count({
      where: countBy,
    });

    return reservationCount;
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_FAIL, ERROR_MESSAGE.DB_FAIL.STANDARD);
  }
};

module.exports = {
  createReservation,
  getUsersReservations,
  getUserReservations,
  getNextReservationByBookInfo,
  deleteReservation,
  countReservation,
};
