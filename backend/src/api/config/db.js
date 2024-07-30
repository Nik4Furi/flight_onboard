const mongoose = require('mongoose');


//Connect app with database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI). 
  then( ()=> console.log('Connection to database')). 
  catch((e) => console.error('Error occured during connection to database ',e))
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
