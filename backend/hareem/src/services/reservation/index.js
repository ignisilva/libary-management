/* eslint-disable max-len */
const { bookService, userService } = require('../index');
const { reservationRepository } = require('../../repositories');
const { timer } = require('../../utils');
const { CustomError } = require('../../errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../../constants/error');

const createReservation = async (userId, bookInfoId) => {
  const books = await bookService.getBooks(bookInfoId);
  // 대여할 수 있는 책이 남아있을 경우, 예약 진행 불가 error
  const rentalableBooks = books.filter((book) => !book.isRentaled);
  if (rentalableBooks.length > 0) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.THE_BOOK_IS_RENTALABLE);
  }

  // 연체한 사람이라면, error
  const user = await userService.getUser({ id: userId });
  if (user.isBlack) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.BLACK_USER_CAN_NOT_RESERVATION);
  }

  // 같은 책에 대해 예약을 진행 중이라면, error
  const getReservationsQuery = {
    from: timer.dateToString(new Date()),
    bookInfoId,
  };
  const reservation = await reservationRepository.getUserReservations(userId, getReservationsQuery);

  if (reservation.length > 0) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.ALREADY_RESERVATIONED);
  }

  // 예약 진행
  const newReservation = await reservationRepository.createReservation({
    userId,
    bookInfoId,
  });

  return newReservation;
};

const getUsersReservations = async (getUsersReservationsQuery) => {
  const reservations = reservationRepository.getUsersReservations(getUsersReservationsQuery);

  return reservations;
};

const getUserReservations = async (userId, getReservationsQuery) => {
  const reservations = reservationRepository.getUserReservations(userId, getReservationsQuery);

  return reservations;
};

const deleteReservation = async (reservationId) => {
  const result = await reservationRepository.deleteReservation({
    id: reservationId,
  }, true);

  if (result <= 0) {
    throw new CustomError(ERROR_CODE.INVALID_REQUEST, ERROR_MESSAGE.INVALID_REQUEST.DELETE_FAIL_RESERVATION);
  }

  return '예약 취소 완료';
};

const countByBookInfo = async (bookInfoId) => {
  const reservationCount = await reservationRepository.countReservation({
    bookInfoId,
  });

  return reservationCount;
};

module.exports = {
  createReservation,
  getUsersReservations,
  getUserReservations,
  deleteReservation,
  countByBookInfo,
};
