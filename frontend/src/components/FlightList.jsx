import React, { useEffect, useState } from 'react';
import { getFlights } from '../services/APIService';



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
} from '@chakra-ui/react'
import NotificationForm from './NotificationForm';


const FlightList = () => {

    //----------- States specific stuffs
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [flights, setFlights] = useState([]);
    const [isFlightsLoading, setIsFlightsLoading] = useState(false);
    const [flightId,setFlightId] = useState(null);
    const [flightStatus,setFlightStatus] = useState('on-time');
    const [departureGate,setDepartureGate] = useState('');
    const [close,setClose] = useState(false)


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
            <h1>Flight Status</h1>

            {/* ------------------ Modal Component ---------------------------X */}
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={close && onClose}>
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
                                            <Td>{flight.status}</Td>
                                            <Td>{flight.departure_gate}</Td>
                                            <Td>{flight.arrival_gate}</Td>
                                            <Td>{new Date(flight.scheduled_departure).toLocaleString()}</Td>
                                            <Td>{new Date(flight.scheduled_arrival).toLocaleString()}</Td>
                                            <Td>
                                                <Button onClick={()=>{
                                                    console.log('flightid ',flight?.flight_id)
                                                    setFlightId(flight?.flight_id)
                                                    setFlightStatus(flight?.status)
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
