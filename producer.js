const KafkaService = require('./kafka-service');

const send = async (message) => {
  const producer = new KafkaService('producer');
  await producer.connect();
  await producer.send(message);
  await producer.disconnect();
  return;
}

const message = {
  topic: 'transactions',
  messages: [
    { value: 'MONEY IN - PARTITION 0' },
    { value: 'MONEY IN - PARTITION 1' },
    { value: 'MONEY OUT - PARTITION 1' },
    { value: 'MONEY OUT - PARTITION 2' },
  ],
};

send(message);
