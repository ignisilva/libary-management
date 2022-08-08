// 차후 자동 으로 파일 가져오는 것으로 변경 고려
// (https://www.graphql-tools.com/docs/schema-merging)
const { mergeResolvers } = require('@graphql-tools/merge');
const bookResolver = require('./book');
const userResolver = require('./user');
const rentalResolver = require('./rental');
const reservationResolver = require('./reservation');
const authResolver = require('./auth');

const resolvers = [
  bookResolver,
  userResolver,
  rentalResolver,
  reservationResolver,
  authResolver,
];

module.exports = mergeResolvers(resolvers);
