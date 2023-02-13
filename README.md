# Requirement
Docker app installed to your local machine.

# Steps to run
1. within the project directory, run `docker-compose up -d`
2. create topic with this command: `docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic myFirstTopic`
3. run the consumer `node index`
4. run the producer `node index` and you will see the logs in consumer terminal