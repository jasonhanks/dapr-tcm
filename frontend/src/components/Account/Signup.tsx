import React, { useState } from 'react'

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
    
    // Render the login form
    return(
        <div className="login-wrapper">
            <h1>Sign Up</h1>
            <form action="" method="post" onSubmit={handleSubmit}>
            <label>
                <p>Email Address</p>
                <input name="username" type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Full Name</p>
                <input name="full_name" type="text" onChange={(e) => setFullName(e.target.value)} />
            </label>
            <label>
                <p>Initials</p>
                <input name="initials" type="text" onChange={(e) => setInitials(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                <p>Password Confirmation</p>
                <input name="password_confirm" type="password" onChange={(e) => setPasswordConfirm(e.target.value)} />
            </label>
            <div>
                <br />
                <button type="submit">Submit</button>
            </div>
            </form>

            <br /> <br />
            <div id="errors">{ errors }</div>

            <br/><br/>
            Existing user? 
            {/* <a href="#"  onClick={(e) => args.setSignup(false)}>Login to your account</a> */}
            <userContext.Consumer>
                {({signup, toggleSignup}) => {
                  return (
                    <a href="#" onClick={(e) =>  toggleSignup() }>Login to existing account!</a>
                    )
                }}
            </userContext.Consumer>
        </div>
    )
}
