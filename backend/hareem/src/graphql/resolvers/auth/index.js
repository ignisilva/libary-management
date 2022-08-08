const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { COOKIE, USER_ROLE } = require('../../../constants');
const { authMiddleware } = require('../../../middlewares');
const { authService } = require('../../../services');

const authResolver = {
  Mutation: {
    login: async (_, { input }, { ctx }) => {
      const {
        accessToken,
        refreshTokenCookie: cookie,
      } = await authService.login(input);

      ctx.cookies.set(cookie.name, cookie.token, cookie.options);
      return { accessToken };
    },

    logout: async (_, { input }, { ctx }) => {
      const { user } = ctx;

      const result = await authService.logout(user.id);

      return { result };
    },

    refreshAccessToken: async (_, { input }, { ctx }) => {
      const refreshToken = ctx.cookies.get(COOKIE.REFRESH_TOKEN);

      const { accessToken } = await authService.refreshAccessToken(refreshToken);

      return { accessToken };
    },
  },
};

const resolversComposition = {
  'Mutation.logout': [authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN], true)],
};

const composedAuthResolver = composeResolvers(authResolver, resolversComposition);

module.exports = composedAuthResolver;
