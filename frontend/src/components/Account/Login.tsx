import React from 'react'

import { 
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
    useToast,
    VStack,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import './Login.css'

import AlertPop from '../App/AlertPop'
import submitJSON from '../../utils'

import {userContext} from '../App/context'



export default function Login(args: any) {  
    const { register, handleSubmit, formState: { errors } } = useForm()
    const toast = useToast( )

    const onSubmit = async (data: any) => {
        // Post the login form to the backend
        const results = await submitJSON('/api/users/login', {
            username: data.username,
            password: data.password
        }, "POST")
        
        // Check to see if we received our token
        if (results.user != null) {
            console.log("User "+ data.username +" was logged in with token: ")
            console.log(results.user)
            args.setUser(results.user)
            toast({
                title: "Login successful!",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } else {
            console.log("User "+ data.username +" was not logged in")
            toast({
                title: "Invalid username or password!",
                status: "error",
                duration: 3000,
                isClosable: true
            })        
        }
    }

    // Render the login form
    return(
        <div>
            <Center
                height="12"
                alignItems="center"
                bg={useColorModeValue('teal.400', 'teal.700')}>
            
                <Text fontSize={20} fontWeight={500}>Login to Account</Text>
            </Center>
            <br/>
            <div className="login-wrapper">
            <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                <VStack>
                    <FormControl isRequired>
                        <FormLabel htmlFor='username'>Email address</FormLabel>
                        <Input type='text' data-test="username" {...register("username", { 
                            required: "Please enter email address",
                            minLength: { value: 5, message: "Minimum length is 5" }, 
                            maxLength: { value: 255, message: "Maximum length is 255" }
                        })} />
                        <FormHelperText data-test="username-help">Email address is required as your login.</FormHelperText>
                        {errors.username && <AlertPop title={errors.username.message} />}
                    </FormControl>
                    <br/>
                    <FormControl isRequired>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input type='password' data-test="password" {...register("password", { 
                            required: "Please enter email address",
                            minLength: { value: 8, message: "Minimum length is 8" }, 
                            maxLength: { value: 255, message: "Maximum length is 255" }
                        })} />
                        <FormHelperText data-test="password-help">Never reuse or share your passwords with anyone.</FormHelperText>
                        {errors.password && <AlertPop title={errors.password.message} />}
                    </FormControl>
                    <br/>
                    <FormControl>
                        <Input id='submit' type='Submit' data-test="submit" bg={useColorModeValue('teal.400', 'teal.700')} />
                    </FormControl>
                </VStack>
            </form>

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
