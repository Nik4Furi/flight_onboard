import React from 'react'

import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    VStack,
} from '@chakra-ui/react'

import { ColorModeSwitcher } from '../ColorModeSwitcher'
import FlightList from '../components/FlightList'


export default function HomePage() {

    console.log('host',process.env.REACT_APP_BACKEND_URL)

    return (
        <Container maxW={'5xl'} my='3' >
            <Flex justifyContent={'space-between'} alignItems={'center'}>

                <Heading as={'h3'}>Flight On-Board ✈️</Heading>
                <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <VStack spacing={1} align={'center'}>

                    <small>Welcome in flight on-board</small>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Fligt on-board scheduling{' '}
                        <Text as={'span'} color={'orange.400'}>
                            made easy ✨
                        </Text>
                    </Heading>
                </VStack>

                <Text color={'gray.500'} maxW={'3xl'}>

                    Come and see list of all the flights, and subscribe to notification, when your flight status change.
                </Text>
                <Stack spacing={2} direction={'column'}>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}>
                        Login
                    </Button>
                    <small>Only for admin</small>

                </Stack>
                <Flex w={'full'}>

                    {/* ------------ List of the flights ----------- X  */}
                    <FlightList />
                </Flex>
            </Stack>
        </Container>
    )
}