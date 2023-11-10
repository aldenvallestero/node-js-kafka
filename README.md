# node-js-kafka
This is a beginner friendly repository that demonstrates how to set up kafka with Node JS server participants.

## 🧱 System Architecture
![System Architecture](graphics/system-architecture-graphic.png)

## 💡 General Idea
To run a kafka-based server, you will need to create a separate app for producer and consumer. The next step is to create a docker instruction that will set up the kafka and will eventually run in with existing topic/s.

## 👣 Steps to run
1. In the project directory, run `docker-compose up -d` in order to setup 2 entities, Zookeeper and Kafka both images from Confluent.
2. create topic with this command: `docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic myFirstTopic`
3. run the consumer `node index`
4. run the producer `node index` and you will see the logs in consumer terminal