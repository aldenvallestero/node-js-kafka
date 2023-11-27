# node-js-kafka
This is a beginner-friendly repository that demonstrates how to set up kafka (Raft Protocol) using [bitnami kafka image](https://hub.docker.com/r/bitnami/kafka), producers, and consumers thru [KafkaJS](http://kafka.js.org) library on top of [NodeJS](http://kafka.js.org).

## 🧱 System Architecture
![System Architecture](graphics/system-architecture-graphic.png)

## 💡 General Idea
To start, you need three components for the make the process: a Kafka server which is the bitnami/kafka, an operational application responsible for data production (producer), and a consumer application. Utilizing a YAML file, you can formulate instructions to dockerize the Kafka cluster along with its constituent parts.

In the provided illustration, it demonstrates where money transactions should be sent. There exist two producers: one for Money In events and another for Money Out events. Additionally, a topic named transactions has been established, encompassing three partitions.

The Money In producer dispatches messages to the first and second partitions of the topic. Conversely, the Money Out producer directs messages to the second and third partitions.

In this scenario, the first partition symbolizes Money In, the second partition embodies all monetary transactions, and the third partition signifies Money Out.

## 👣 3 Major steps
**STEP 1:** Set up `docker-compose.yml` file. Notice in the file that it is pointing to the latest kafka image of bitnami exposing a single port 9092.

In addition, here are some description for environment configurations:

**KRAFT CONFIG**
- `KAFKA_ENABLE_KRAFT` - Tells to Kafka to use Raft Protocol.
- `KAFKA_BROKER_ID` - Creates a broker ID.
- `KAFKA_CFG_NODE_ID` - Creates a node ID.
- `KAFKA_KRAFT_CLUSTER_ID` - Creates a cluster ID.
- `KAFKA_CFG_CONTROLLER_QUORUM_VOTERS` - Elects the broker that will serve as a controller.
- `KAFKA_CFG_PROCESS_ROLES` - Identify all the broker roles.

**LISTENERS CONFIG**
- `KAFKA_CFG_CONTROLLER_LISTENER_NAMES` - Sets the controller name.
- `KAFKA_CFG_LISTENERS`= Sets listeners address.
- `KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP` - Sets listeners communication protocol.
- `KAFKA_CFG_ADVERTISED_LISTENERS` - Sets the address for clients connection.

**SASL CONFIG**
- `KAFKA_CFG_SASL_ENABLED_MECHANISMS` - Set SASL available mechanism.
- `KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL` - Set brokers SASL protocol.
- `KAFKA_CLIENT_USERS` - Sets the client username.
- `KAFKA_CLIENT_PASSWORDS` - Sets the client password.

**STEP 2:** Create a topic (with 3 partitions for instance)

**Creating a topic**
Since the configuration is SASL/PLAIN, you will need to create a file called `config.properties` and place it under `/opt/bitnami/kafka/config`.
You will then need to put your credentials there:

```
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="alden" password="alden-secret";
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
```
From your Docker App or any available terminal that has an access to your container, use the command below to create a topic assume that you are in the root directory.

`/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic TopicName --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1 --command-config /opt/bitnami/kafka/config/config.properties`

**Describing a topic**
`/opt/bitnami/kafka/bin/kafka-topics.sh --describe --topic TopicName --bootstrap-server localhost:9092 --command-config /opt/bitnami/kafka/config/config.properties`

**Listing all topics**
Assume that you are in the root directory.

`/opt/bitnami/kafka/bin/kafka-topics.sh --list --bootstrap-server localhost:9092 --command-config /opt/bitnami/kafka/config/config.properties`

**STEP 3:** After topic is created, run the consumer first in your root directory `node handlers/analytics-handler` and lastly, the producer `node producer`. Make sure to finish the consumer joining the topic first before sending a message with your producer. Watch the consumer terminal in order to see the incoming queue messages coming.

### 🕹️ Uses of Kafka in your project
1. Process payments and financial transactions in real-time, such as in stock exchanges, banks, and insurances.

2. Track and monitor cars, trucks, fleets, and shipments in real-time, such as in logistics and the automotive industry.

3. Continuously capture and analyze sensor data from IoT devices or other equipment, such as in factories and wind parks.

4. Collect and immediately react to customer interactions and orders, such as in retail, the hotel and travel industry, and mobile applications.

5. Monitor patients in hospital care and predict changes in condition to ensure timely treatment in emergencies.

6. Connect, store, and make available data produced by different divisions of a company.

7. Serve as the foundation for data platforms, event-driven architectures, and microservices.
