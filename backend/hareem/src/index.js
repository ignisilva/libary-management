/* eslint-disable no-underscore-dangle */
const httpServer = require('http').createServer();

require('dotenv').config();
const db = require('./database/models');
const kafka = require('./kafka');
const app = require('./app');
const apollo = require('./apollo');
const scheduler = require('./scheduler');
const { logger } = require('./utils');

const _dbInitialize = async () => {
  if (process.env.NODE_ENV === 'production') {
    await db.sequelize.authenticate();
  } else {
    await db.sequelize.sync();
  }
  console.log('db is connected');
};

const _kafkaInitialize = async () => {
  if (process.env.NODE_ENV === 'production') {
    await kafka.producerRun();
    await kafka.consumerRun();
  } else {
    await kafka.syncTopics();

    await kafka.producerRun();
    await kafka.consumerRun();
  }
  logger.info('Kafka is connected');
};

const _kafkaShutdown = async () => {
  await kafka.producerShutdown();
  await kafka.consumerShutdown();

  logger.info('Kafka is shut down');
};

const serverRun = async () => {
  try {
    const PORT = process.env.PORT || 4001;

    await _dbInitialize();

    await _kafkaInitialize();

    scheduler.start();

    await apollo.start();
    apollo.applyMiddleware({ app });

    httpServer.on('request', app.callback());
    httpServer.listen({ port: PORT });

    logger.info(`Server ready at http://localhost:${PORT}${apollo.graphqlPath}`);

    return { apollo, app };
  } catch (error) {
    logger.fatal({
      error,
      msg: 'Server initialize fail',
    });

    _kafkaShutdown();

    process.exit(1);
  }
};

serverRun();

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received');
  _kafkaShutdown();
  httpServer.close(() => {
    logger.info('Http server closed');
    process.exit(0);
  });
});
