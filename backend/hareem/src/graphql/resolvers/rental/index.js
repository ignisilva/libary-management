const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { USER_ROLE, TOPIC } = require('../../../constants');
const kafka = require('../../../kafka');
const { authMiddleware } = require('../../../middlewares');
const { rentalService } = require('../../../services');
const { logger } = require('../../../utils');

const rentalResolver = {
  Rental: {
    user: async ({ userId }, _, { loaders }) => {
      const user = loaders.rental.getUser.load(userId);

      return user;
    },

    book: async ({ bookId }, _, { loaders }) => {
      const book = loaders.rental.getBook.load(bookId);

      return book;
    },
  },

  Query: {
    getRentalHistory: async (_, { input }) => {
      const rental = await rentalService.getRentalHistory(input.rentalId);

      return { rental };
    },
  },

  Mutation: {
    createRentalStart: async (_, { input }) => {
      const rental = await rentalService.createRentalStart(input.userId, input);

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

      return { rental };
    },

    createRentalExtend: async (_, { input }, { ctx }) => {
      const { user } = ctx;

      const rental = await rentalService.createRentalExtend(user.id, input);

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

      return { rental };
    },

    createRentalEnd: async (_, { input }) => {
      const rental = await rentalService.createRentalEnd(input.userId, input);

      return { rental };
    },
  },
};

const resolversComposition = {
  'Query.getRentalHistory': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
  'Mutation.createRentalStart': [authMiddleware([USER_ROLE.ADMIN], true)],
  'Mutation.createRentalExtend': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
  'Mutation.createRentalEnd': [authMiddleware([USER_ROLE.ADMIN], true)],
};

const composedRentalResolver = composeResolvers(rentalResolver, resolversComposition);

module.exports = composedRentalResolver;
