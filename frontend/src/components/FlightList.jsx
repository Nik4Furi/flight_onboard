import React, { useEffect, useState } from 'react';
import { getFlights, updateFlightStatus } from '../services/APIService';



//------------ packages 
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Text,
    Box,

    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Heading,
    Spinner,
    Select,
} from '@chakra-ui/react'
import NotificationForm from './NotificationForm';
import { CONTANTS_FLIGHT_STATUS } from '../constant';
import toast from 'react-hot-toast';


const FlightList = () => {

    //----------- States specific stuffs
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [flights, setFlights] = useState([]);
    const [form,setForm] = useState({flight_id:'', departure_gate:'', arrival_gate:'', actual_departure:'', actual_arrival:''})

    //flight_id, status, departure_gate, arrival_gate, actual_departure, actual_arrival
    const [isFlightsLoading, setIsFlightsLoading] = useState(false);
    const [flightId,setFlightId] = useState(null);
    const [flightStatus,setFlightStatus] = useState('on-time');
    const [departureGate,setDepartureGate] = useState('');
    const [close,setClose] = useState(false)

    const token = localStorage.getItem('token');

    //-----------Function stuff
    const handleStatusChange = async(e)=>{
        const status = e.target.value;

        setFlightStatus(status)

        try {
            const data = await updateFlightStatus(form,token,status);
            if(!data || data?.success === false){
                toast.error(data?.msg || "Error occured to change the status")
                
                return;
            }
            else toast.success(data?.msg);
    
        } catch (error) {
           toast.error(error); 
        }
    }


    useEffect(() => {
        const fetchFlights = async () => {
            setIsFlightsLoading(true);
            try {
                const data = await getFlights();
                if (data?.flights)
                    setFlights(data?.flights);
            } catch (err) {
                console.error('Error fetching flights:', err);
            }
            setIsFlightsLoading(false);

        };

        fetchFlights();
    }, []);

   

    return (
        <div>

            {/* ------------------ Modal Component ---------------------------X */}
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Subscribe to get notify</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='bold' mb='1rem'>
                            Enter mail and get latest notification of flight status
                        </Text>

                        {/* --------------- Notification Component ---------------X */}
                        <NotificationForm flight_id={flightId} status={flightStatus} departure_gate={departureGate} setClose={setClose} />

                    </ModalBody>

                    <ModalFooter>

                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Box>

                <Heading as={'h4'} my='7' textAlign={'center'}>Flights Detailed List</Heading>
                {
                    (!flights || flights?.lenght === 0) ? <Heading as='h6' my='4' textAlign={'center'} colorScheme='red'>No Flights Details Found</Heading> :

                    isFlightsLoading ? <Spinner /> :

                        <TableContainer>
                            <Table size='sm' >
                                <Thead>
                                    <Tr>
                                        <Th>Flight ID</Th>
                                        <Th>Airline</Th>
                                        <Th>Status</Th>
                                        <Th>Departure Gate</Th>
                                        <Th>Arrival Gate</Th>
                                        <Th>Scheduled Departure</Th>
                                        <Th>Scheduled Arrival</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {flights?.map((flight) => (
                                        <Tr key={flight.flight_id}>
                                            <Td>{flight.flight_id}</Td>
                                            <Td>{flight.airline}</Td>
                                            <Td> {
                                                
                                                    token 
                                                    ?
                                                    <Box p={4}>
                                                    <Select value={flightStatus} placeholder="Select Status" onChange={(e) =>{
                                                        setForm({flight_id:flight?.flight_id,departure_gate:flight?.departure_gate,arrival_gate:flight?.arrival_gate,actual_arrival:flight?.actual_arrival,actual_departure:flight?.actual_departure})
                                                        handleStatusChange(e);
                                                    }}>
                                                        {
                                                            CONTANTS_FLIGHT_STATUS?.map(status =>
                                                                <option value={status} key={status}>{status}</option>

                                                            )
                                                        }
                                                      </Select>
                                                  </Box>
                                            
                                                    : flight?.status
                                                }


                                            </Td>
                                            <Td>{flight.departure_gate}</Td>
                                            <Td>{flight.arrival_gate}</Td>
                                            <Td>{new Date(flight.scheduled_departure).toLocaleString()}</Td>
                                            <Td>{new Date(flight.scheduled_arrival).toLocaleString()}</Td>
                                            <Td>
                                                <Button onClick={()=>{
                                                    console.log('flightid ',flight?.flight_id)
                                                    setFlightId(flight?.flight_id)
                                                    setFlightStatus(flightStatus ? flightStatus : flight?.status)
                                                    setDepartureGate(flight?.departure_gate)
                                                    onOpen()
                                                }} colorScheme='blue' rounded={'full'}>Notify</Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>

                            </Table>
                        </TableContainer>
                }
            </Box>

        </div>
    );
};

export default FlightList;
