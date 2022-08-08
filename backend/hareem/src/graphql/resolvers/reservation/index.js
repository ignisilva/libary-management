const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { USER_ROLE } = require('../../../constants');
const { authMiddleware } = require('../../../middlewares');
const { reservationService } = require('../../../services');

const reservationResolver = {
  Reservation: {
    user: async ({ userId }, _, { loaders }) => {
      const user = loaders.reservation.getUser.load(userId);

      return user;
    },

    bookInfo: async ({ bookInfoId }, _, { loaders }) => {
      const bookInfo = loaders.reservation.getBookInfo.load(bookInfoId);

      return bookInfo;
    },
  },

  Query: {
    getReservationsByUsers: async (_, { input }) => {
      const reservations = await reservationService.getUsersReservations({ ...input, only: true });

      return { reservations };
    },
  },

  Mutation: {
    createReservation: async (_, { input }, { ctx }) => {
      const { user } = ctx;
      const { userId, bookInfoId } = input;

      const reservatedUserId = user.role === USER_ROLE.USER ? user.id : userId;

      const reservation = await reservationService.createReservation(reservatedUserId, bookInfoId);

      return { reservation };
    },

    deleteReservation: async (_, { input }, { ctx }) => {
      const { reservationId } = input;

      const result = await reservationService.deleteReservation(reservationId);

      return { result };
    },
  },
};

const resolversComposition = {
  'Query.getReservationsByUsers': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
  'Mutation.createReservation': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
  'Mutation.deleteReservation': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
};

const composedReservationResolver = composeResolvers(reservationResolver, resolversComposition);

module.exports = composedReservationResolver;
