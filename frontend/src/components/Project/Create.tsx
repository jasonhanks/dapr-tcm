import React from 'react'
import {
    Text
} from "@chakra-ui/react"

import NavBar from "../Dashboard/NavBar"


export default function CreateProject(args: any) {
  return (
    <div>
      <NavBar />
      <Text fontSize={22} fontWeight={500}>
        Projects | Create New Project
      </Text>
      <br/>
    </div>
  )
}