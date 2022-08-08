const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { USER_ROLE } = require('../../../constants');
const { authMiddleware } = require('../../../middlewares');
const { userService } = require('../../../services');

const userResolver = {
  User: {
    auth: async ({ id: userId }, _, { loaders }) => {
      const auth = loaders.user.getAuth.load(userId);

      return auth;
    },
  },

  Query: {
    getUsers: async (_, { input }) => {
      const users = await userService.getUsers({ ...input, only: true });

      return { users };
    },

    getUser: async (_, { input }) => {
      const { id: userId } = input;

      const user = await userService.getUserById(userId, true);

      return { user };
    },

    getUserSelf: async (_, { input }, { ctx }) => {
      const { user: self } = ctx;

      const user = await userService.getUserById(self.id, true);

      return { user };
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const user = await userService.createUser({ ...input, only: true });

      return { user };
    },

    updateUser: async (_, { input }) => {
      const { id: userId } = input;

      const user = await userService.updateUser(userId, { ...input, only: true });

      return { user };
    },

    deleteUser: async (_, { input }) => {
      const { id: userId } = input;

      const result = await userService.deleteUser(userId);

      return { result };
    },
  },
};

const resolversComposition = {
  'Query.getUserSelf': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
  'Query.getUser': [authMiddleware([USER_ROLE.ADMIN], true)],
  'Query.getUsers': [authMiddleware([USER_ROLE.ADMIN], true)],
  'Mutation.updateUser': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
  'Mutation.deleteUser': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
};

const composedUserResolver = composeResolvers(userResolver, resolversComposition);

module.exports = composedUserResolver;
