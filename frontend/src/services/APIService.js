import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api/v1';

const FLIGHT = 'flight', NOTIFICATION = 'notification',AUTH= 'auth'; 

export const getFlights = async () => { //fetch all the flights
  try {
    const response = await axios.get(`${API_URL}/${FLIGHT}/get`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const authLogin = async (form) => { //fetch all the flights
  try {
    const response = await axios.post(`${API_URL}/${AUTH}/login`,form);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const notifyUser = async (form,flight_id,status,departure_gate) => { //fetch all the flights

    const  timestamp = new Date().getTime(),
    recipient = form?.recipient,
    message = `Your flight ${flight_id} is ${status}. New departure time: ${timestamp}. Departure gate: ${departure_gate}`,
    method = 'Email';

  try {
    const response = await axios.post(`${API_URL}/${NOTIFICATION}/create`,{flight_id,timestamp,message,method,recipient});
    return response.data;
  } catch (err) {
    throw err;
  }
};
