const KafkaService = require('../kafka-service');

const consumer = new KafkaService('consumer', [0, 2]);

consumer
  .subscribe()
  .catch(e => console.error(`[example/consumer] ${e.message}`, e));
