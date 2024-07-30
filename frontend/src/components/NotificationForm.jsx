

import { useState } from 'react'

import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react'
import { notifyUser } from '../services/APIService';
import toast from 'react-hot-toast';

export default function NotificationForm({flight_id,status,departure_gate,setClose}) {
    //------------- States specific stuffs
    const [form,setForm] = useState({recipient:'',notification_id:'',flight_id:flight_id || '',status:status || 'delay'});
    const [loading,setLoading] = useState(false);

//notification_id, flight_id, message, timestamp, method, recipient

  //-------------- Function specific stuff
  const handleChange = (e) => setForm({...form,[e.target.name]:e.target.value})


  const handleNotify = async(e)=>{
    e.preventDefault();
    setLoading(true);
// console.log('furnningnotify ',flight_id,status)


    try {
        const data = await notifyUser(form,flight_id,status,departure_gate);
        if(!data || data?.success === false){
            toast.error(data?.msg || "Error to accept your request, try again")
            setLoading(false)
            return;
        }
        else toast.success(data?.msg);

    } catch (error) {
        toast.error(error)  
    }
    setLoading(false)
    setClose(true);
    setForm({recipient:'',notification_id:'',flight_id: '',status: 'delay'})
  }

  return (
    <Flex
      
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Container
        maxW={'lg'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}>
       
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as={'form'}
          spacing={'12px'}
          onSubmit={handleNotify}
          >
            
          <FormControl>
            <Input
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id={'email'}
              type={'email'}
              name='recipient'
              required
              placeholder={'Your Email'}
              aria-label={'Your Email'}
              value={form?.recipient}
          
              onChange={handleChange}
            />
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              colorScheme={ 'blue'}
              isLoading={loading}
              w="100%"
              type={'submit'}>
              Notify ME 😷
            </Button>
          </FormControl>
          
        </Stack>
      
      </Container>
    </Flex>
  )
}