/* eslint-disable no-underscore-dangle */
const { getKafkaClient, getCompression } = require('../client');

const kafka = getKafkaClient();

const _producer = kafka.producer({
  allowAutoTopicCreation: false,
});

const connectProducer = async () => {
  await _producer.connect();
};

const disconnectProducer = async () => {
  await _producer.disconnect();
};

const makeMessage = (messageData) => {
  const { topic, messages } = messageData;

  const convertedMessages = messages.map((message) => {
    const { key, method, data } = message;

    const convertedMessage = {
      value: JSON.stringify({ method, data }),
    };

    if (key) {
      convertedMessage.key = key;
    }

    return convertedMessage;
  });

  return {
    topic,
    messages: convertedMessages,
  };
};

const sendMessage = async (kafkaMessage) => {
  // 들어온 토픽이 있는지 없는지 검증 가능
  const { topic, messages } = kafkaMessage;

  await _producer.send({
    topic,
    messages,
    compression: getCompression(),
    ack: 1,
  });
};

module.exports = {
  connectProducer,
  disconnectProducer,
  makeMessage,
  sendMessage,
};
