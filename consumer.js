const KafkaService = require('./kafka-service');

const consumer = new KafkaService('consumer');

consumer
  .subscribe()
  .catch(e => console.error(`[example/consumer] ${e.message}`, e));
