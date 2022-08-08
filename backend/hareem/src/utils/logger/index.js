/* eslint-disable no-underscore-dangle */
const path = require('path');
const pino = require('pino');

const utilsIndex = path.resolve(__dirname).lastIndexOf('/utils');
const fileName = `${process.env.PROJECT_NAME}.json`;
const logPath = `${path.resolve(__dirname).substring(0, utilsIndex)}/logs/${fileName}`;

const _logger = pino({
  mixin(_context, level) {
    return {
      app: 'library-server',
      'level-label': _logger.levels.labels[level],
    };
  },
}, pino.destination({ dest: logPath }));

const debug = (options) => {
  _logger.debug(options);
};

const info = (options) => {
  _logger.info(options);
};

const warn = (options) => {
  _logger.warn(options);
};

const error = (options) => {
  _logger.error(options);
};

const fatal = (options) => {
  _logger.fatal(options);
};

module.exports = {
  debug,
  warn,
  info,
  error,
  fatal,
};
