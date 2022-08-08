/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const { getKafkaClient, getTopics } = require('../client');

const kafka = getKafkaClient();
const _admin = kafka.admin();

const _createTopics = async (topicList) => {
  const topics = topicList.map((topic) => ({
    topic,
    numPartitions: 6,
    replicationFactor: 1,
  }));

  await _admin.createTopics({
    validateOnly: false,
    timeout: 3000,
    waitForLeaders: true,
    topics,
  });
};

const _deleteTopics = async (topicList) => {
  await _admin.deleteTopics({
    topics: topicList,
    timeout: 3000,
  });
};

const syncTopics = async () => {
  await _admin.connect();

  const kafkaTopicList = await _admin.listTopics();
  const topicList = kafkaTopicList.filter((topic) => !(/^__/.test(topic)));

  const topics = getTopics();

  if (topics.length > topicList.length) {
    const willCreateTopics = topics.filter((topic) => !(topicList.includes(topic)));
    await _createTopics(willCreateTopics);
  }

  if (topics.length < topicList.length) {
    const willDeleteTopics = topicList.filter((kafkaTopic) => !(topics.includes(kafkaTopic)));
    await _deleteTopics(willDeleteTopics);
  }

  const topicListNow = await _admin.listTopics();
  console.log(topicListNow);

  await _admin.disconnect();
};

module.exports = {
  syncTopics,
};
