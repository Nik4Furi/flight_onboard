const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notification_id: String,
  flight_id: String,
  message: String,
  timestamp: Date,
  method: String,
  recipient: String,
});

module.exports = mongoose.model('Notification', NotificationSchema);