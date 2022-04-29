import React from 'react'
import {
    Text
} from "@chakra-ui/react"

import Sidebar from "../Dashboard/Sidebar"


export default function CreateProject(args: any) {
  return(
      <Sidebar>
          <Text fontSize={22} fontWeight={500}>
            Create New Project
          </Text>
          
      </Sidebar>
  )
}