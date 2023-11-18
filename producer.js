const KafkaService = require('./kafka-service');

const moneyIn = async () => {
  const message = {
    topic: 'transaction',
    messages: [
      { value: 'MONEY IN' },
      { value: 'MONEY IN' },
    ],
  };

  const producer = new KafkaService('producer');
  await producer.connect();
  await producer.send(message);
  await producer.disconnect();
  return;
}

const moneyOut = async () => {
  const message = {
    topic: 'transaction',
    messages: [
      { value: 'MONEY OUT' },
      { value: 'MONEY OUT' },
    ],
  };

  const producer = new KafkaService('producer');
  await producer.connect();
  await producer.send(message);
  await producer.disconnect();
  return;
}

moneyIn();
moneyOut();
