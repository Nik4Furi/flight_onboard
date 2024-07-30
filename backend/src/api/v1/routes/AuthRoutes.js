const router = require('express').Router();

//------------------- Controllers specific stuffs -------------------X
const {AuthControllers} = require('../controllers');


//------------------ Start to create the routes related to the flights
router.post('/register', AuthControllers.Register); //update flight status 
router.post('/login', AuthControllers.Login); //update flight status 


module.exports = router;
