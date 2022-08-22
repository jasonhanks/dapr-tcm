import { useState } from 'react'
import { ChakraProvider, } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {userContext} from './context'

import theme from '../../theme'

import AccountSettings from '../Account/Settings'
import AboutUs from './AboutUs'
import CreateProject from "../Project/Create"
import Disclaimer from './Disclaimer'
import Home from '../Dashboard/Home'
import Login from '../Account/Login'
import Projects from "../Project/Projects"
import Settings from './Settings'
import Signup from '../Account/Signup'
import ViewProject from "../Project/ViewProject"


const App = () => {
  const [signup, setSignup] = useState(false)
  const [user, setUser] = useState(null)

  return (
      <userContext.Provider value={{
        logoutUser: () => setUser(null),
        toggleSignup: () => setSignup(!signup),
        signup: signup,
        user: user,
      }}>

        <ChakraProvider theme={theme}>
          {user === null && signup === true && <Signup setUser={setUser} /> }
          {user === null && signup === false && <Login setUser={setUser} /> }
      
          { user !== null &&
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/account/settings" element={<AccountSettings setUser={setUser} />} />
                <Route path="/projects" element={<Projects />}  />
                <Route path="/projects/:id" element={<ViewProject />} />
                <Route path="/projects/new" element={<CreateProject />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </BrowserRouter>
          }
          <Disclaimer />
        </ChakraProvider>
      </userContext.Provider>
    )
  }

  export default App