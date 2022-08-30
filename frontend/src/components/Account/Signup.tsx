import React, { useContext } from 'react'
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
} from '@chakra-ui/react'
import { useForm } from "react-hook-form"

import '../App/App.css'
import './Signup.css'

import AlertPop from '../App/AlertPop'
import submitJSON from '../../utils'

import {userContext} from '../App/context'


export default function Signup(args: any) {  
    const { register, handleSubmit, formState: { errors } } = useForm()
    const toast = useToast( )
    const context = useContext(userContext)

    const onSubmit = async (data: any) => {
        // Post the login form to the backend
        const results = await submitJSON('/api/users/', {
            username: data.username,
            initials: data.initials,
            password: data.password,
            password_confirm: data.password_confirm,
            full_name: data.full_name
        }, "POST")
        
        // Check to see if we received our token
        if (results.user != null) {
            console.log("User "+ data.username +" was logged in: ")
            console.log(results.user)
            args.setUser(results.user)
            context.signup = false
            toast({
                title: "Your account has been created!",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } else {
            // Validation errors
            console.log("User "+ data.username +" was not created")
            let msg: string = ""
            results.errors.forEach((e: any) => msg += e.msg +"\n")
            console.log(msg)
            toast({
                title: `Error: ${msg}!`,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }
 
    // const validatePassword = (password: string): boolean => {
    //     if (password.length <= 8) return false
    //     return true
    // }
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
            <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                    <VStack>
                    <FormControl>
                        <FormLabel htmlFor='username'>Email address</FormLabel>
                        <Input type='text' data-test="username" {...register("username", { 
                                required: "Please enter your email address",
                                minLength: { value: 5, message: "Minimum length is 5" }, 
                                maxLength: { value: 255, message: "Maximum length is 255" }
                            })} />
                        <FormHelperText data-test="username-help">
                            Enter the email you'd like to use as your login.
                        </FormHelperText>
                        {errors.username && <AlertPop title={errors.username.message} />}
                    </FormControl>
                    <br/>
                    <FormControl>
                        <FormLabel htmlFor='full_name'>Full Name</FormLabel>
                        <Input type='text' data-test="full_name" {...register("full_name", { 
                                required: "Please enter your full name",
                                minLength: { value: 5, message: "Minimum length is 5" }, 
                                maxLength: { value: 255, message: "Maximum length is 255" }
                            })} />
                        <FormHelperText data-test="full_name-help">Enter your preferred full name to use.</FormHelperText>
                        {errors.full_name && <AlertPop title={errors.full_name.message} />}
                    </FormControl>
                    <br/>
                    <FormControl>
                        <FormLabel htmlFor='initials'>Initials</FormLabel>
                        <Input type='text' data-test="initials" {...register("initials", { 
                                required: "Please enter your initials",
                                minLength: { value: 2, message: "Minimum length is 2" }, 
                                maxLength: { value: 4, message: "Maximum length is 4" }
                            })} />
                        <FormHelperText data-test="initials-help">Enter your preferred short name / initials to use.</FormHelperText>
                        {errors.initials && <AlertPop title={errors.initials.message} />}
                    </FormControl>
                    <br/>
                    <FormControl>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input type='password' data-test="password" {...register("password", { 
                                required: "Please enter your password",
                                minLength: { value: 8, message: "Minimum length is 8" }, 
                                maxLength: { value: 255, message: "Maximum length is 255" }
                            })} />
                        <FormHelperText data-test="password-help">Never reuse or share your passwords.</FormHelperText>
                        {errors.password && <AlertPop title={errors.password.message} />}
                    </FormControl>
                    <br/>
                    <FormControl>
                        <FormLabel htmlFor='password_confirm'>Confirm Password</FormLabel>
                        <Input type='password' data-test="password_confirm" {...register("password_confirm", { 
                                required: "Please enter your password again",
                                minLength: { value: 8, message: "Minimum length is 8" }, 
                                maxLength: { value: 255, message: "Maximum length is 255" }
                            })} />
                        <FormHelperText data-test="password-confirm-help">Please confirm your new password.</FormHelperText>
                        {errors.password_confirm && <AlertPop title={errors.password_confirm.message} />}
                    </FormControl>
                    <br/>
                    <FormControl>
                    <Input id='submit' type='Submit' data-test="submit" bg={useColorModeValue('teal.400', 'teal.700')} />
                        <FormHelperText data-test="submit-help">Create your new account.</FormHelperText>
                    </FormControl>
                </VStack>
            </form>
            <br />
            <userContext.Consumer>
                {({toggleSignup}) => <button data-test="login-link" onClick={() => toggleSignup() }>Existing user? Login to existing account!</button>}
            </userContext.Consumer>
            <br/>
            </div>
        </div>
    )
}
