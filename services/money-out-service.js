const producer = require("./kafka-service");

const moneyOut = async () => {
  await producer.connect();
  await producer.send({
    topic: 'transaction',
    messages: [{ value: 'Money Out - 200', partition: 3 }],
  });
  
  await producer.send({
    topic: 'transaction',
    messages: [{ value: 'Money Out - 200', partition: 2 }],
  });
  await producer.disconnect();
  return;
}

moneyOut();
