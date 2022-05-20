import React, { useState } from 'react'

import { 
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Text,
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
        <div className="login-wrapper">
            <Text fontSize={20} fontWeight={500}>Login to Account</Text>
            <br/>
            <form action="" method="post" onSubmit={handleSubmit}>

            <FormControl isRequired isInvalid={username.length < 5}>
                <FormLabel htmlFor='username'>Email address</FormLabel>
                <Input id='username' name="username" type='text' onChange={(e) => setUsername(e.target.value)} />
                {username === '' ? (
                        <FormHelperText>Email address is required as your login.</FormHelperText>
                    ) : (
                        <FormErrorMessage>Enter your login email address.</FormErrorMessage>
                )}
            </FormControl>
            <br/>
            <FormControl isRequired isInvalid={!validatePassword()}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' name="password" type='password' onChange={(e) => setPassword(e.target.value)} />
                {validatePassword() ? 
                        <FormHelperText>Never reuse or share your passwords with anyone.</FormHelperText>
                     : 
                        <FormErrorMessage>Enter a valid password.</FormErrorMessage>
                }
            </FormControl>
            <br/>
            <FormControl>
                <Input id='login' type='Submit' onClick={handleSubmit} />
                <FormHelperText>Login to your account.</FormHelperText>
            </FormControl>
            </form>

            <br/>
            <FormControl>
                {() => errors.length > 0 &&
                    <FormErrorMessage>Enter your login email address.</FormErrorMessage>
                }
            </FormControl>

            <div id="errors" className="errors">{ errors }</div>
            <br/>
            <div>
                <userContext.Consumer>
                    {({toggleSignup}) => {
                    return (
                        <button onClick={(e) =>  toggleSignup() }>New user? Click here to Sign Up!</button>
                        )
                    }}
                </userContext.Consumer>

                <br/>
            </div>
        </div>
    )
}
