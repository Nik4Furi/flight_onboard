const router = require('express').Router();

//------------------- Controllers specific stuffs -------------------X
const {FlightControllers} = require('../controllers');


//------------------ Start to create the routes related to the flights
router.put('/updateStatus', FlightControllers.updateFlightStatus); //update flight status 
router.get('/get', FlightControllers.getAllFlights); //update flight status 


module.exports = router;
