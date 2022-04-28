import React, { useState } from 'react'

import { 
    FormControl,
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
        setErrors("")

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
    
    // Render the login form
    return(

        <div className="login-wrapper">
            <Text fontSize={20} fontWeight={500}>Login to Account</Text>
            <br/>
            <form action="" method="post" onSubmit={handleSubmit}>

            <FormControl isRequired>
                <FormLabel htmlFor='username'>Email address</FormLabel>
                <Input id='username' name="username" type='text' onChange={(e) => setUsername(e.target.value)} />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <br/>
            <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' name="password" type='password' onChange={(e) => setPassword(e.target.value)} />
                <FormHelperText>Never reuse or share your passwords.</FormHelperText>
            </FormControl>
            <br/>
            <FormControl>
                <Input id='login' type='Submit' onClick={handleSubmit} />
                <FormHelperText>Login to your account.</FormHelperText>
            </FormControl>
            </form>

            <div id="errors">{ errors }</div>
            <br/>
            <div>
                <userContext.Consumer>
                    {({toggleSignup}) => {
                    return (
                        <a href="#" onClick={(e) =>  toggleSignup() }>New user? Click here to Sign Up!</a>
                        )
                    }}
                </userContext.Consumer>
            </div>
        </div>
    )
}
