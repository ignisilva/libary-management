/* eslint-disable no-underscore-dangle */
const { Kafka, CompressionTypes } = require('kafkajs');
const { TOPIC } = require('../../constants');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [
    `${process.env.KAFKA_BROKER}`,
  ],
});

const getKafkaClient = () => kafka;

const getCompression = () => {
  const compression = CompressionTypes.GZIP;

  return compression;
};

const getTopics = () => {
  const {
    MESSAGE_TYPE,
    DATASET_NAME,
    DATA_NAME,
  } = TOPIC;

  return [
    `${MESSAGE_TYPE.EVENT}.${DATASET_NAME}.${DATA_NAME.RENTALS}`,
  ];
};

module.exports = {
  getKafkaClient,
  getCompression,
  getTopics,
};
