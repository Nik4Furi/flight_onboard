import { useState } from 'react'


import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'


//----------- Packages 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

//----------- Services
import { authLogin } from '../services/APIService';


export default function Login() {
    const navigate = useNavigate();

    //-------------- States specific stuff
    const [form,setForm] = useState({email:'',password:''});
    const [loading,setLoading] = useState(false);


    //------------ Functions specific stuff
    const handleChange = (e) => setForm({...form,[e.target.name]:e.target.value});

    const handleLogin = async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const data = await authLogin(form);
            if(!data || data?.success === false){
                toast.error(data?.msg || "Error to login ")
                setLoading(false);

                return;
            }
            else toast.success(data?.msg);

            localStorage.setItem('token',data?.token);

            navigate('/')

        } catch (error) {
            toast.error(error)
        }
        setLoading(false);

    }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
            <form onSubmit={handleLogin}>

         
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' value={form.email} onChange={handleChange} required minLength={7} placeholder='admin@gmail.com' />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password' value={form.password} onChange={handleChange} required minLength={8} placeholder='password' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={loading}
                type='submit'>
                Sign in
              </Button>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}