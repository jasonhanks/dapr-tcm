import React, { useState } from 'react'

import { 
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"

import './Login.css'
import submitJSON from '../../utils'

import {userContext} from '../App/context'



export default function Login(args: any) {  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrors('')

        // Post the login form to the backend
        const results = await submitJSON('/api/users/login', {
            username: username,
            password: password
        }, "POST")
        
        // Check to see if we received our token
        if (results.user != null) {
            console.log("User "+ username +" was logged in with token: ")
            console.log(results.user)
            args.setUser(results.user)
        } else {
            console.log("User "+ username +" was not logged in")
            setErrors("Invalid username or password")
        }
    }

    const validatePassword = (): boolean => {
        if (password.length < 8) return false
        return true
    }

    // Render the login form
    return(
        <div>
            <Center
                height="12"
                alignItems="center"
                bg={useColorModeValue('teal.400', 'teal.700')}
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                >
            
                <Text fontSize={20} fontWeight={500}>Login to Account</Text>
            </Center>
            <br/>
            <div className="login-wrapper">
            <form action="" method="post" onSubmit={handleSubmit}>

            <FormControl isRequired isInvalid={username.length < 5}>
                <FormLabel htmlFor='username'>Email address</FormLabel>
                <Input id='username' name="username" type='text' data-test="username" onChange={(e) => setUsername(e.target.value)} />
                <FormHelperText data-test="username-help">Email address is required as your login.</FormHelperText>
            </FormControl>
            <br/>
            <FormControl isRequired isInvalid={!validatePassword()}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' name="password" type='password' data-test="password" onChange={(e) => setPassword(e.target.value)} />
                {validatePassword() ? 
                        <FormHelperText data-test="password-help">Never reuse or share your passwords with anyone.</FormHelperText>
                     : 
                        <FormErrorMessage data-test="password-error">Enter a valid password.</FormErrorMessage>
                }
            </FormControl>
            <br/>
            <FormControl>
                <Input id='submit' type='Submit' data-test="submit" bg={useColorModeValue('teal.400', 'teal.700')} onClick={handleSubmit} />
                <FormHelperText data-test="submit-help">Login to your account.</FormHelperText>
                {errors.length > 0 && <FormErrorMessage data-test="submit-error">Enter your login email address.</FormErrorMessage>}
            </FormControl>
            </form>

            <br/>
            <div id="errors" className="errors" data-test="errors">{ errors }</div>
            <br/>
            <div>
                <userContext.Consumer>
                    {({toggleSignup}) => <button data-test="signup" onClick={() =>  toggleSignup() }>New user? Click here to Sign Up!</button>}
                </userContext.Consumer>

                <br/>
            </div>
            </div>
        </div>
    )
}
