const { Kafka } = require('kafkajs');

class KafkaService {
  constructor(role, partition = []) {
    console.info(`Kafka Service: ${role}:${partition}`);
    if (role === 'producer') {
      this.producer = new Kafka({
        clientId: 'my-app-10',
        brokers: ['localhost:9092'],
      }).producer();
    } else if (role === 'consumer') {
      this.partition = partition;
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
    await this.consumer.subscribe({ topic: 'transfers', fromBeginning: true });

    console.info('Consumer attempting to start ...');
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (this.partition.includes(partition)) {
          this.queue.push([topic, message.value.toString()]);
          console.table(this.queue);
        }
      },
    })
  }
}

module.exports = KafkaService;
