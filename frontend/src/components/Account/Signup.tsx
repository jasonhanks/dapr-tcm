import React, { useState } from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Text
} from '@chakra-ui/react'

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
            setErrors(results.errors)
        }
    }
 
    const validatePassword = (): boolean => {
        if (password.length <= 8) return false
        return true
    }
        // Render the login form
    return(
        <div className="login-wrapper">

            <Text fontSize={20} fontWeight={500}>Signup for Account</Text>
            <br/>

            <form action="" method="post" onSubmit={handleSubmit}>
                <FormControl isRequired isInvalid={username.length < 5}>
                    <FormLabel htmlFor='username'>Email address</FormLabel>
                    <Input id='username' name="username" type='text' onChange={(e) => setUsername(e.target.value)} />
                    {username === '' ? (
                        <FormHelperText>
                        Enter the email you'd like to use as your login.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required in order to create your account.</FormErrorMessage>
                    )}
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor='full_name'>Full Name</FormLabel>
                    <Input id='full_name' name="full_name" type='text' onChange={(e) => setFullName(e.target.value)} />
                    <FormHelperText>Enter your preferred full name to use.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor='initials'>Initials</FormLabel>
                    <Input id='initials' name="initials" type='text' onChange={(e) => setInitials(e.target.value)} />
                    <FormHelperText>Enter your preferred short name / initials to use.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired isInvalid={validatePassword()}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' name="password" type='password' onChange={(e) => setPassword(e.target.value)} />
                    <FormHelperText>Never reuse or share your passwords.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired isInvalid={validatePassword() && (password != password_confirm)}>
                    <FormLabel htmlFor='password_confirm'>Confirm Password</FormLabel>
                    <Input id='password_confirm' name="password_confirm" type='password' onChange={(e) => setPasswordConfirm(e.target.value)} />
                    <FormHelperText>Please confirm your new password.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <Input id='login' type='Submit' onClick={handleSubmit} />
                    <FormHelperText>Create your new account.</FormHelperText>
                </FormControl>
            </form>

            <div id="errors">{ errors }</div>

            <br/>            
            <userContext.Consumer>
                {({signup, toggleSignup}) => {
                  return (
                    <a href="#" onClick={(e) =>  toggleSignup() }>Existing user? Login to existing account!</a>
                    )
                }}
            </userContext.Consumer>

            <br/>
        </div>
    )
}
