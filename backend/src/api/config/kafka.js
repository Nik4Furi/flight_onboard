const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: `${process.env.KAFKA_CONNECTION_HOST}:9092` });

const producer = new kafka.Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
  console.error('Kafka Producer error:', err);
});

module.exports = producer;
