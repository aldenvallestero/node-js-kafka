const { Kafka } = require('kafkajs');

const consumer = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'my-app',
}).consumer({ groupId: 'test-group' })

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'quickstart', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString())
    },
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))