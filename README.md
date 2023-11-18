# node-js-kafka
This is a beginner friendly repository that demonstrates how to set up a kafka cluster, producers, and consumers using Node JS.

## 🧱 System Architecture
![System Architecture](graphics/system-architecture-graphic.png)

## 💡 General Idea
To initiate Kafka, you'll require three essential components for the entire process to function seamlessly: a Kafka server, an operational application responsible for data production, and a consumer application. Organizing these elements into distinct folders is essential for clarity and proper system comprehension. Utilizing a YAML file, you can formulate instructions to dockerize the Kafka cluster along with its constituent parts.

In the provided illustration, there exist two producers: one for incoming money events and another for outgoing money events. Additionally, a topic named transactions has been established, encompassing three partitions.

The Money In producer dispatches messages to the first and second partitions of the transactions topic. Conversely, the Money Out producer directs messages to the second and third partitions.

In this scenario, the first partition symbolizes incoming money transactions, the second partition embodies all monetary transactions, and the third partition signifies outgoing money transactions.

## 👣 Here are the steps to do that
1. **Set up zookeeper image** by creating the ```docker-compose.yml``` file first in a separate directory. In configuration below, I am using Confluent Inc. zookeeper image. You can choose any version you want. But in this repository, I will be sticking with version 7.3.0. I left everything default as it is. [This link](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiGyZGsp8WCAxXXbmwGHal1DQ8QFnoECB8QAQ&url=https%3A%2F%2Fmedium.com%2F%40logeesan%2Fzookeeper-in-kafka-ce31b3dd55b1&usg=AOvVaw0DcvpBJ2huhpu_ALBUyVuz&opi=89978449) tells what a zookeeper is.
```
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
```
2. **Set up kafka image** below the zookeeper service configuration.

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
3. **Setup Kafdrop** to allow localhost kafka management
```
  kafdrop:
    image: obsidiandynamics/kafdrop
    restart: 'no'
    ports:
      - '9000:9000'
    environment:
      KAFKA_BROKERCONNECT: 'broker:29092'
    depends_on:
      - broker
```
![Kafdrop](graphics/kafdrop-graphic.png)
4. Use `docker-compose up -d` in your terminal to create docker image and run the container.

5. Visit `localhost:9000` in your browser to launch Kafdrop and create a topic for instance called **transaction**.
6. After topic is created, run the consumer first in your root directory `node consumer` and lastly, the producer `node producer`. Make sure to watch the terminal of consumer in order to see the incoming queue messages coming from the producer.

### 🕹️ Uses of Kafka in your project
1. Process payments and financial transactions in real-time, such as in stock exchanges, banks, and insurances.

2. Track and monitor cars, trucks, fleets, and shipments in real-time, such as in logistics and the automotive industry.

3. Continuously capture and analyze sensor data from IoT devices or other equipment, such as in factories and wind parks.

4. Collect and immediately react to customer interactions and orders, such as in retail, the hotel and travel industry, and mobile applications.

5. Monitor patients in hospital care and predict changes in condition to ensure timely treatment in emergencies.

6. Connect, store, and make available data produced by different divisions of a company.

7. Serve as the foundation for data platforms, event-driven architectures, and microservices.
