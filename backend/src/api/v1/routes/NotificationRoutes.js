const router = require('express').Router();


//--------------- Controllers specific stuffs
const {NotificationControllers} = require('../controllers');

router.post('/create', NotificationControllers.createNotification);

module.exports = router;
