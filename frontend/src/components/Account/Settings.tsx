import React, {useContext} from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"

import { useForm } from "react-hook-form"

import AlertPop from '../App/AlertPop'

import submitJSON from '../../utils'
import {userContext} from '../App/context'
import NavBar from "../Dashboard/NavBar"


export default function AccountSettings(args: any) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const toast = useToast( )
  const context = useContext(userContext)

  const onSubmit = async (data: any) => {
    // Post the form to the backend
    const results = await submitJSON('/api/users', {
      _id: context.user._id,
      username: data.username,
      full_name: data.full_name,
      initials: data.initials
    }, "PUT")
    
    // Check for errors
    if (results.user != null) {
        console.log("User "+ data.username +" was updated:")
        console.log(results.user)
        args.setUser(results.user)

        toast({
          title: "Account details were updated!",
          status: "success",
          duration: 3000,
          isClosable: true
        })
    } else {
        console.log("User "+ data.username +" was not updated")
        toast({
          title: "Account details were not updated!",
          status: "error",
          duration: 3000,
          isClosable: true
        })
    }
  }

  return(
    <div>
      <NavBar title="Account Settings" />
    
      <br />
      <div className="login-wrapper">
            <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
              <VStack>
                <FormControl>
                    <FormLabel htmlFor='username'>Email address</FormLabel>
                    <Input disabled type='text' placeholder="Email address" data-test="username" {...register("username", { 
                      value: context.user.username,
                      required: "Please enter email address",
                      minLength: { value: 5, message: "Minimum length is 5" }, 
                      maxLength: { value: 255, message: "Maximum length is 255" }
                      })} />
                    <FormHelperText data-test="username-help">Email address is required as your login.</FormHelperText>
                    {errors.username && <AlertPop title={errors.username.message} />}
                </FormControl>  
                <br/>
                <FormControl>
                    <FormLabel htmlFor='full_name'>Full Name</FormLabel>
                    <Input type='text' placeholder="Full name" data-test="full-name" {...register("full_name", { 
                      value: context.user.full_name,
                      required: "Please enter your full name",
                      minLength: { value: 4, message: "Minimum length is 4" }, 
                      maxLength: { value: 255, message: "Maximum length is 255" }
                    })} />
                    <FormHelperText data-test="full-name-help">Full name is required to display to other users.</FormHelperText>
                    {errors.full_name && <AlertPop title={errors.full_name.message} />}
                </FormControl>
                <br/>
                <FormControl>
                    <FormLabel htmlFor='initials'>Initials</FormLabel>
                    <Input type='text' placeholder="Initials" data-test="initials" {...register("initials", { 
                      value: context.user.initials,
                      required: "Please enter your initials",
                      minLength: { value: 2, message: "Minimum length is 2" }, 
                      maxLength: { value: 5, message: "Maximum length is 5" }
                    })}/>
                    <FormHelperText data-test="initials-help">Initials are required to display your name shortened.</FormHelperText>
                    {errors.initials && <AlertPop title={errors.initials.message} />}
                </FormControl>
                <br/>
                <FormControl>
                  <Input id='submit' type='Submit' data-test="submit" bg={useColorModeValue('teal.400', 'teal.700')} />
                </FormControl>
              </VStack>
            </form>
            <br/>
          </div>
    </div>)
}
