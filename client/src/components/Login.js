import React, { useState } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

const Login = () => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleClick = () => setShow(!show); 

    const submitHandler = () => { };

    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    placeholder='Enter Your Email Address'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' bg='clear' color='white' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme='teal'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                // isLoading={picLoading}
            >
                Login
            </Button>
            <Button
                variant='solid'
                colorScheme='red'
                width='100%'
                onClick={() => {
                    setEmail('guest@example.com');
                    setPassword('123456');
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    );
};

export default Login;