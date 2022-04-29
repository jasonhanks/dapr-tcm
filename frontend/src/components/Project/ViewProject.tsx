import React from 'react'
import {
  Text
} from "@chakra-ui/react"

import NavBar from "../Dashboard/NavBar"


export default function ViewProject(args: any) {
  return(
    <div>
      <NavBar />
      <Text fontSize={22} fontWeight={500}>
        Projects
      </Text>
      <br/>
    </div>
  )
}
