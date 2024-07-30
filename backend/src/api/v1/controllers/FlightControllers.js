
//------------- Models specific stuffs
const { FlightModel } = require('../models');

//---------- Services specific stuffs
const KafkaService = require('../services/KafkaService');


//-------------------- Flight Controllers -------------------------------------X

//------------- Update the flight system, then send the notification to consumers
// PUT: '/api/v1/flight/updateStatus'
exports.updateFlightStatus = async (req, res) => {
  const { flight_id, status, departure_gate, arrival_gate, actual_departure, actual_arrival } = req.body;
  console.log('req.body', req.body);

  try {
    const flight = await FlightModel.findOneAndUpdate(
      { flight_id },
      { status, departure_gate, arrival_gate, actual_departure, actual_arrival },
      { new: true }
    );

    console.log('flight find ', flight);

    if (!flight) return res.status(404).json({ success: false, msg: 'Flight not found' });


    KafkaService.sendFlightUpdate(flight); //running the kafka service

    const io = req.app.get('io'); // runn or emit the socket connection
    io.emit('flightUpdate', flight);

    res.status(200).json({ success: true, msg: "Successfully update the flight status", flight });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

//------------- Get all details of the flights
// GET: '/api/v1/flight/get'
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await FlightModel.find();

    return res.status(200).json({ success: true, msg: "Successfully fetch the flights", flights })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

