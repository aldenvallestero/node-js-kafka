const { Kafka } = require('kafkajs');

const queue = [];

const consumer = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'my-app',
}).consumer({ groupId: 'test-group' })

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'transaction', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      queue.push(message.value.toString());
      console.log(`Current queue: ${queue}`);
    },
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))