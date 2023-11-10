const { Kafka } = require('kafkajs');

const producer = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  }).producer();

const sendMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'quickstart',
    messages: [{ value: 'BLUE' }],
  });
  await producer.disconnect();
  return;
}

sendMessage();