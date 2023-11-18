const KafkaService = require('./kafka-service');

const send = async (message) => {
  const producer = new KafkaService('producer');
  await producer.connect();
  await producer.send(message);
  await producer.disconnect();
  return;
}

const message = {
  topic: 'transaction',
  messages: [
    { value: 'MONEY IN', partition: 0 },
    { value: 'MONEY IN', partition: 1 },
    { value: 'MONEY OUT', partition: 1 },
    { value: 'MONEY OUT', partition: 2 },
  ],
};

send(message);
