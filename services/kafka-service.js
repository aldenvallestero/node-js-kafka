const { Kafka } = require('kafkajs');

const producer = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
}).producer();

module.exports = producer;
