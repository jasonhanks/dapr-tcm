import React, { useState } from 'react'
import {
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import '../App/App.css'
import './Signup.css'
import submitJSON from '../../utils'

import {userContext} from '../App/context'


export default function Signup(args: any) {  
    const [username, setUsername] = useState('')
    const [initials, setInitials] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')
    const [full_name, setFullName] = useState('')
    const [errors, setErrors] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrors("")

        // Post the login form to the backend
        const results = await submitJSON('/api/users/', {
            username: username,
            initials: initials,
            password: password,
            password_confirm: password_confirm,
            full_name: full_name
        }, "POST")
        
        // Check to see if we received our token
        if (results.user != null) {
            console.log("User "+ username +" was logged in: ")
            console.log(results.user)
            args.setUser(results.user)
        } else {
            // Validation errors
            console.log("User "+ username +" was not created")
            let msg: string = ""
            results.errors.forEach((e: any) => msg += e.msg +"\n")
            console.log(msg)
            setErrors(msg)
        }
    }
 
    const validatePassword = (): boolean => {
        if (password.length <= 8) return false
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
            
                <Text fontSize={20} fontWeight={500}>Signup for Account</Text>
            </Center>
            <br/>
            <div className="login-wrapper">
            <form action="" method="post" onSubmit={handleSubmit}>
                <FormControl isRequired isInvalid={username.length < 5}>
                    <FormLabel htmlFor='username'>Email address</FormLabel>
                    <Input id='username' name="username" type='text' data-test="username" onChange={(e) => setUsername(e.target.value)} />
                    <FormHelperText data-test="username-help">
                        Enter the email you'd like to use as your login.
                    </FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor='full_name'>Full Name</FormLabel>
                    <Input id='full_name' name="full_name" type='text' data-test="full_name" onChange={(e) => setFullName(e.target.value)} />
                    <FormHelperText data-test="full_name-help">Enter your preferred full name to use.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor='initials'>Initials</FormLabel>
                    <Input id='initials' name="initials" type='text' data-test="initials" onChange={(e) => setInitials(e.target.value)} />
                    <FormHelperText data-test="initials-help">Enter your preferred short name / initials to use.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired isInvalid={validatePassword()}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' name="password" type='password' data-test="password" onChange={(e) => setPassword(e.target.value)} />
                    <FormHelperText data-test="password-help">Never reuse or share your passwords.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired isInvalid={validatePassword() && (password !== password_confirm)}>
                    <FormLabel htmlFor='password_confirm'>Confirm Password</FormLabel>
                    <Input id='password_confirm' name="password_confirm" type='password' data-test="password_confirm" onChange={(e) => setPasswordConfirm(e.target.value)} />
                    <FormHelperText data-test="password-confirm-help">Please confirm your new password.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <Input id='submit' type='Submit' bg={useColorModeValue('teal.400', 'teal.700')} data-test="submit" onClick={handleSubmit} />
                    <FormHelperText data-test="submit-help">Create your new account.</FormHelperText>
                </FormControl>
            </form>

            <br />
            <span className="errors" id="errors" data-test="errors">{ errors }</span>

            <br/>            
            <userContext.Consumer>
                {({toggleSignup}) => <button data-test="login-link" onClick={() => toggleSignup() }>Existing user? Login to existing account!</button>}
            </userContext.Consumer>

            <br/>
            </div>
        </div>
    )
}
