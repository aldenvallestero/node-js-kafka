const { Kafka } = require('kafkajs');

const producer = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  }).producer();

const moneyIn = async () => {
  await producer.connect();
  await producer.send({
    topic: 'transaction',
    messages: [{ value: 'BLUE' }],
  });
  await producer.disconnect();
  return;
}

const moneyOut = async () => {
  await producer.connect();
  await producer.send({
    topic: 'transaction',
    messages: [{ value: 'BLUE', partition: '' }],
  });
  await producer.disconnect();
  return;
}

moneyIn();
moneyOut();
