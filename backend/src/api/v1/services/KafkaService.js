
//-------------- Configuration specific stuffs
const producer = require('../../config/kafka');


//----------------- Start to create the kafka producers services
exports.sendFlightUpdate = (flight) => {
    console.log('flight',flight);
    const payloads = [
        {
            topic: 'flight-updates',
            messages: JSON.stringify(flight),
            partition: 0,
        },
    ];

    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Kafka send error:', err);
        } else {
            console.log('Kafka send success:', data);
        }
    });
};
