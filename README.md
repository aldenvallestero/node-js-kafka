# node-js-kafka
This is a beginner friendly repository that demonstrates how to set up kafka, producer, and consumer apps using Node JS.

## 🧱 System Architecture
![System Architecture](graphics/system-architecture-graphic.png)

## 💡 General Idea
To start with kafka, you will need 3 entities to make the entire process work. A kafka server, data producer & consumer. You will need to create a separate Node JS app for producer and consumer. in order to understand the system properly.

Using yaml file, create an instruction that will set up kafka container and will eventually run in with existing topic/s.

## 👣 Here are the steps to do that
1. **Set up zookeeper image.** by creating the ```docker-compose.yml``` file first. In this code example below, I am using Confluent Inc. zookeeper image. You can choose any version you want. But in this repository, I will be sticking with version 7.3.0. I left everything default as it is.
```
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
```
2. **Set up kafka image.** Below the zookeeper service configuration, add the broker (kafka). The configuration is default to simplify things, you may check the apache docs to know more about it.

```
  broker:
    image: confluentinc/cp-kafka:7.3.0
    container_name: broker
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://broker:29092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
```
2. **Create topic.** with this command: `docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic myFirstTopic`
3. Run the consumer `node index` first before the Producer in order to receive all messages coming from it.
4. Lastly, run the producer `node index` and you will see messages coming from your consumer.

### 🕹️ Uses of Kafka in your project
1. Process payments and financial transactions in real-time, such as in stock exchanges, banks, and insurances.

2. Track and monitor cars, trucks, fleets, and shipments in real-time, such as in logistics and the automotive industry.

3. Continuously capture and analyze sensor data from IoT devices or other equipment, such as in factories and wind parks.

4. Collect and immediately react to customer interactions and orders, such as in retail, the hotel and travel industry, and mobile applications.

5. Monitor patients in hospital care and predict changes in condition to ensure timely treatment in emergencies.

6. Connect, store, and make available data produced by different divisions of a company.

7. Serve as the foundation for data platforms, event-driven architectures, and microservices.

