import React, { useState } from 'react'

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
            <h1>Please Log In</h1>
            <form action="" method="post" onSubmit={handleSubmit}>
            <label>
                <p>Email Address</p>
                <input name="username" type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <div>
                <br />
                <button type="submit">Submit</button>
            </div>
            </form>

            <br /> <br />
            <div id="errors">{ errors }</div>

            <br/><br/>
            New user? 
            <userContext.Consumer>
                {({toggleSignup}) => {
                  return (
                    <a href="#" onClick={(e) =>  toggleSignup() }>Sign Up!</a>
                    )
                }}
            </userContext.Consumer>
        </div>
    )
}
