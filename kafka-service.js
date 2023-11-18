const { Kafka } = require('kafkajs');

class KafkaService {
  constructor(role) {
    if (role === 'producer') {
      this.producer = new Kafka({
        clientId: 'my-app-10',
        brokers: ['localhost:9092'],
      }).producer();
    } else if (role === 'consumer') {
      this.queue = [];
      this.consumer = new Kafka({
        brokers: ['localhost:9092'],
        clientId: 'my-app-10',
      }).consumer({ groupId: 'test-group' });
    }
  }

  // PRODUCER METHODS

  async connect() {
    console.info('Producer disconnects from the broker!');
    await this.producer.connect();
  }

  async disconnect() {
    console.info('Producer disconnects from the broker!');
    await this.producer.disconnect();
  }

  async send({ topic, messages }) {
    console.info('Sending messages to the broker');
    await this.producer.send({ topic, messages })
  }

  // CONSUMER METHOD

  async subscribe() {
    console.info('Consumer connecting to the broker ...');
    await this.consumer.connect();

    console.info('Consumer subscribing to the broker ...');
    await this.consumer.subscribe({ topic: 'transaction', fromBeginning: true });

    console.info('Consumer attempting to start ...');
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.queue.push([topic, partition, message.value.toString()]);
        console.table(this.queue);
      },
    })
  }
}

module.exports = KafkaService;
