import React from 'react'
import {
  Text
} from "@chakra-ui/react"

import Sidebar from "./Sidebar"


export default function Home(args: any) {
  return(
      <Sidebar>
          <Text fontSize={22} fontWeight={500}>
            Home
          </Text>

      </Sidebar>
  )
}