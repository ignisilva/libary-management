/* eslint-disable no-underscore-dangle */
const { TOPIC, BUSINESS } = require('../constants');
const { User } = require('../database/models');
const { getRentalTemplate } = require('../utils/mailer/templates');
const { timer, mailer, logger } = require('../utils');
const admin = require('./admin');
const client = require('./client');
const consumer = require('./consumer');
const producer = require('./producer');

const consumerInstance = consumer.getConsumerInstance({
  groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
});

const consumerRun = async () => {
  await consumerInstance.connectConsumer();

  // 차후 topic 구독 및 consumer 핸들링 로직 추가
  await consumerInstance.topicsSubscribe(client.getTopics());

  const _noticeDueDate = async (noticeDueDateData) => {
    try {
      const user = await User.findByPk(noticeDueDateData.userId);

      const mailInfo = {
        subject: '[바로고 도서관] 반납 예정일 안내',
        to: 'elaha00@naver.com',
        html: getRentalTemplate({
          email: user.email,
          dueDate: timer.dateToString(timer.afterNDate(BUSINESS.RENTAL_PERIOD), '-'),
        }),
      };

      await mailer.sendMail(mailInfo);
    } catch (error) {
      logger.warn({
        error,
        msg: 'Send mail fail',
      });
    }
  };

  consumerInstance.addTopicHandler(
    `${TOPIC.MESSAGE_TYPE.EVENT}.${TOPIC.DATASET_NAME}.${TOPIC.DATA_NAME.RENTALS}`,
    async (topic, partition, message, heartbeat) => {
      const { method, data } = JSON.parse(message.value);

      switch (method) {
        case 'createRentalStart':
        case 'createRentalExtend':
          await _noticeDueDate(data);
          break;

        default: break;
      }
    },
  );

  await consumerInstance.runTopicHandler();
};

const consumerShutdown = async () => {
  await consumerInstance.disconnectConsumer();
};

const producerRun = async () => {
  await producer.connectProducer();
};

const producerShutdown = async () => {
  await producer.disconnectProducer();
};

module.exports = {
  ...admin,
  ...consumer,
  ...producer,
  consumerRun,
  consumerShutdown,
  producerRun,
  producerShutdown,
};
