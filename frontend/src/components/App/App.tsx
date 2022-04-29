import React, { useState } from 'react'
import {
  ChakraProvider,
} from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import theme from '../../theme'
import Home from '../Dashboard/Home'
import Login from '../Account/Login'
import Signup from '../Account/Signup'
import AccountSettings from '../Account/Settings'

import {userContext} from './context'

import CreateProject from "../Project/Create"
import Projects from "../Project/Projects"
import ViewProject from "../Project/ViewProject"


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
          {user == null && signup == true &&
            <Signup setUser={setUser} />
          }
          {user == null && signup == false &&
            <Login setUser={setUser} />
          }

          { user != null &&
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/account/settings" element={<AccountSettings />} />
                <Route path="/projects" element={<Projects />}  />
                <Route path="/projects/:id" element={<ViewProject />} />
                <Route path="/projects/new" element={<CreateProject />} />
              </Routes>
            </BrowserRouter>
          }
        </ChakraProvider>
      </userContext.Provider>
      
    )
  }

  export default App