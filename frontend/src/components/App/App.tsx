import React, { useState } from 'react'
import {
  ChakraProvider,
} from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import theme from '../../theme'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Account/Login'
import Signup from '../Account/Signup'
import AccountSettings from '../Account/Settings'

import {userContext} from './context'




const App = () => {
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState(null);

  return (
      <userContext.Provider value={{
        logoutUser: () => setUser(null),
        toggleSignup: () => {
          setSignup(!signup)
        },
        signup: signup,
        user: user,
      }}>

        <ChakraProvider theme={theme}>
          <div className="wrapper">
          {user == null && signup == true &&
            <Signup setUser={setUser} />
          }
          {user == null && signup == false &&
            <Login setUser={setUser} />
          }

            { user != null &&
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/account/settings" element={<AccountSettings />} />
                </Routes>
              </BrowserRouter>
            }
            </div>    
        </ChakraProvider>
      </userContext.Provider>
      
    )
  }

  export default App