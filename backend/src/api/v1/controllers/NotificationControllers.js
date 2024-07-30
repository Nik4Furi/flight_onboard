
//-------------- Model specific stuff
const {NotificationModel} = require('../models')


//Creating the notification, to notify receipent
//POST : '/api/v1/notification/create'
exports.createNotification = async (req, res) => {
  const { notification_id, flight_id, message, timestamp, method, recipient } = req.body;
  try {

    const notification = new NotificationModel({
      // notification_id,
      flight_id,
      message,
      timestamp,
      method,
      recipient,
    });

    await notification.save();
    res.status(201).json({success:true,msg:"Successfully store your notification request",notification});

  } catch (err) {    res.status(500).json({success:false,msg: err.message }); }
};
