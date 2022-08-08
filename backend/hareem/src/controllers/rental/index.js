const { TOPIC } = require('../../constants');
const kafka = require('../../kafka');
const { rentalService } = require('../../services');
const { logger } = require('../../utils');

const createRentalStart = async (ctx) => {
  // 어드민 관리자가 대출 시작을 담당해주므로,
  // target userId를 받아와야 함
  const { userId } = ctx.request.body;

  try {
    const rental = await rentalService.createRentalStart(userId, ctx.request.body);

    try {
      await kafka.sendMessage(kafka.makeMessage({
        topic: `${TOPIC.MESSAGE_TYPE.EVENT}.${TOPIC.DATASET_NAME}.${TOPIC.DATA_NAME.RENTALS}`,
        messages: [{
          method: 'createRentalStart',
          data: rental,
        }],
      }));
    } catch (err) {
      logger.warn({
        data: rental,
        msg: 'Kafka send message fail',
      });
    }

    ctx.body = rental;
  } catch (err) {
    ctx.throw(err);
  }
};

const createRentalExtend = async (ctx) => {
  try {
    const rental = await rentalService.createRentalExtend(ctx.request.body);

    try {
      await kafka.sendMessage(kafka.makeMessage({
        topic: `${TOPIC.MESSAGE_TYPE.EVENT}.${TOPIC.DATASET_NAME}.${TOPIC.DATA_NAME.RENTALS}`,
        messages: [{
          method: 'createRentalExtend',
          data: rental,
        }],
      }));
    } catch (err) {
      logger.warn({
        data: rental,
        msg: 'Kafka send message fail',
      });
    }

    ctx.body = rental;
  } catch (err) {
    ctx.throw(err);
  }
};

const createRentalEnd = async (ctx) => {
  try {
    const rental = await rentalService.createRentalEnd(ctx.request.body);

    ctx.body = rental;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUsersRentals = async (ctx) => {
  try {
    const rentals = await rentalService.getUsersRentals(ctx.request.query);

    ctx.body = rentals;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUserRentals = async (ctx) => {
  const { id: userId } = ctx.user;

  try {
    const rental = await rentalService.getUserRentals(userId, ctx.request.query);

    ctx.body = rental;
  } catch (err) {
    ctx.throw(err);
  }
};

const getRentalsByRentalId = async (ctx) => {
  const { rentalId } = ctx.params;

  try {
    const rentalHistory = await rentalService.getRentalHistory(rentalId);

    ctx.body = rentalHistory;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  createRentalStart,
  createRentalExtend,
  createRentalEnd,
  getUsersRentals,
  getUserRentals,
  getRentalsByRentalId,
};
