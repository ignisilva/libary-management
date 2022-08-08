/* eslint-disable no-underscore-dangle */
const { getKafkaClient } = require('../client');

const kafka = getKafkaClient();

const getConsumerInstance = (consumerOptions) => {
  const _consumer = kafka.consumer(consumerOptions);

  const _topicHandlers = {};

  const connectConsumer = async () => {
    await _consumer.connect();
  };

  const disconnectConsumer = async () => {
    await _consumer.disconnect();
  };

  const topicsSubscribe = async (topics) => {
    await _consumer.subscribe({
      topics,
    });
  };

  const addTopicHandler = (topic, cb) => {
    _topicHandlers[topic] = cb;
  };

  const runTopicHandler = async () => {
    await _consumer.run({
      eachMessage: async ({
        topic, partition, message, heartbeat,
      }) => {
        try {
          await _topicHandlers[topic](topic, partition, message, heartbeat);
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return {
    connectConsumer,
    disconnectConsumer,
    topicsSubscribe,
    addTopicHandler,
    runTopicHandler,
  };
};

module.exports = {
  getConsumerInstance,
};
