import React, { useEffect } from "react";
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'; 
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useHistory } from 'react-router-dom';

function Homepage() {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));

        if (user) history.push('/chats');
    }, [history]);

    return (
        <Container maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg={'clear'}
                w='100%'
                m='40px 0 15px 0'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text fontSize='5xl' fontWeight='bolder' fontFamily='Roboto' color='white'>
                    ChatHub
                </Text>
            </Box>
            <Box bg='clear' w='100%' p={4} borderRadius='1g' color='white' borderWidth='1px'>
                <Tabs isFitted variant='soft-rounded' colorScheme='teal'>
                    <TabList mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {<Login />}
                        </TabPanel>
                        <TabPanel>
                            {<Signup />}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default Homepage;