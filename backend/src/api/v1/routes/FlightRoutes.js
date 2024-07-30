const router = require('express').Router();

//------------------- Controllers specific stuffs -------------------X
const {FlightControllers} = require('../controllers');

//------------ Middlewares specific stuffs
const isAuthenticated = require('../middlewares/isAuthenticated'); //check is authentication user


//------------------ Start to create the routes related to the flights
router.post('/updateStatus',isAuthenticated, FlightControllers.updateFlightStatus); //update flight status 
router.get('/get', FlightControllers.getAllFlights); //update flight status 


module.exports = router;
