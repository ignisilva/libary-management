const business = require('./business');
const role = require('./role');
const query = require('./query');
const cookie = require('./cookie');
const topic = require('./topic');
const httpStatusCode = require('./httpStatusCode');
const error = require('./error');

module.exports = {
  ...business,
  ...role,
  ...query,
  ...cookie,
  ...topic,
  ...httpStatusCode,
  ...error,
};
