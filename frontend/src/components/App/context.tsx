import React from 'react'

// const userContext = React.createContext({})

export interface IAppState { 
  logoutUser: () => void
  toggleSignup: () => void
  signup: boolean
  user: any 
}

const defaultState = {
  logoutUser: () => {},
  toggleSignup: () => { console.log("default implementation") },
  signup: false,
  user: null
}

const userContext = React.createContext<IAppState>(defaultState)

export { userContext }
