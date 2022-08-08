const { reservationService } = require('../../services');

const createReservation = async (ctx) => {
  const { bookInfoId } = ctx.params;
  const { id: userId } = ctx.user;

  try {
    const reservation = await reservationService.createReservation(userId, bookInfoId);

    ctx.body = reservation;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUsersReservations = async (ctx) => {
  try {
    const allReservations = await reservationService.getUsersReservations(ctx.request.query);

    ctx.body = allReservations;
  } catch (err) {
    ctx.throw(err);
  }
};

const getUserReservations = async (ctx) => {
  const { id: userId } = ctx.user;

  try {
    const reservations = await reservationService.getUserReservations(userId, ctx.request.query);

    ctx.body = reservations;
  } catch (err) {
    ctx.throw(err);
  }
};

const deleteReservation = async (ctx) => {
  const { id } = ctx.params;

  try {
    const reservation = await reservationService.deleteReservation(id);

    ctx.body = reservation;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createReservation,
  getUsersReservations,
  getUserReservations,
  deleteReservation,
};
