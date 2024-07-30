const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flight_id: String,
  airline: String,
  status: String,
  departure_gate: String,
  arrival_gate: String,
  scheduled_departure: Date,
  scheduled_arrival: Date,
  actual_departure: Date,
  actual_arrival: Date,
});

module.exports = mongoose.model('Flight', FlightSchema);