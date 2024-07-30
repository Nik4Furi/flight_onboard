

require('dotenv').config();

//---------------- Requiring the services specific stuffs
const kafka = require('kafka-node');
const emailService = require('./EmailService');

const connectDB = require('../../config/db') //connect to the database


//------------ Models Specific Stuffs
const { NotificationModel } = require('../models');


const startConsumer = async () => {
    await connectDB();

    //------------- Make the connection of kafka client.
    const client = new kafka.KafkaClient({ kafkaHost: `${process.env.KAFKA_CONNECTION_HOST || '127.0.0.1'} :9092` });

    const consumer = new kafka.Consumer(client, [{ topic: 'flight-updates', partition: 0 }], {
        autoCommit: true,
    });

    //---------- Define the sockets connections 
    consumer.on('message', async (message) => {
        console.log(message,'msg at consumer before parse');
        const flightUpdate = JSON.parse(message.value);
        console.log(message,'msg at consumer after parse' );
        const { flight_id, status } = flightUpdate;
        const id = String(flight_id);

        // Fetch notifications related to this flight
        console.log('notifications ', typeof flight_id);
        const notifications = await NotificationModel.find({flight_id});
        // console.log('notifications ', notifications);

        let cnt = 0;
        notifications.forEach(item =>{
        console.log('notifications ',  item.flight_id,id,item?.flight_id == id,item?.flight_id == flightUpdate.flight_id);

            if(item.flight_id == flight_id) cnt +=1;
        })

        console.log('cnt',cnt);

       /* notifications.forEach((notification) => {
          emailService.sendEmail(recipient, 'Flight Status Update', message);

            
        }); */
    });

    consumer.on('error', (err) => {
        console.error('Kafka consumer error:', err);
    });
}

startConsumer();