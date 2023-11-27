const { Kafka } = require('kafkajs');
const { KAFKA_AUTH_MECHANISM, KAFKA_CLIENT_USERNAME, KAFKA_CLIENT_PASSWORD, KAFKA_CLIENT_ID, KAFKA_BROKERS } = require('./app-references');

class KafkaService {
  constructor(role, partition = []) {
    console.info(`Kafka Service: ${role}:${partition.length > 0 ? partition : 'partition-off'}`);
    if (role === 'producer') {
      this.producer = new Kafka({
        brokers: KAFKA_BROKERS.split(','),
        clientId: KAFKA_CLIENT_ID,
        sasl: {
          mechanism: KAFKA_AUTH_MECHANISM,
          username: KAFKA_CLIENT_USERNAME,
          password: KAFKA_CLIENT_PASSWORD,
        }
      }).producer();
    } else if (role === 'consumer') {
      this.partition = partition;
      this.queue = [];
      this.consumer = new Kafka({
        brokers: KAFKA_BROKERS.split(','),
        clientId: KAFKA_CLIENT_ID,
        sasl: {
          mechanism: KAFKA_AUTH_MECHANISM,
          username: KAFKA_CLIENT_USERNAME,
          password: KAFKA_CLIENT_PASSWORD,
        }
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
    await this.consumer.subscribe({ topic: 'transactions', fromBeginning: true });

    console.info('Consumer attempting to start ...');
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.queue.push([topic, message.value.toString()]);
        console.table(this.queue);

        // Temporarily exclude partition matching
        // if (this.partition.includes(partition)) {
        // this.queue.push([topic, message.value.toString()]);
        // console.table(this.queue);
        // }
      },
    })
  }
}

module.exports = KafkaService;
