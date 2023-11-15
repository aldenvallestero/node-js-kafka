const producer = require("./kafka-service");

const moneyIn = async () => {
  await producer.connect();
  await producer.send({
    topic: 'transaction',
    messages: [{ value: 'Money In - 200' }],
  });
  
  await producer.send({
    topic: 'transaction',
    messages: [{ value: 'Money In - 200' }],
  });
  await producer.disconnect();
  return;
}

moneyIn();
