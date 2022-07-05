import React from 'react'
import {
  Text
} from "@chakra-ui/react"

import NavBar from "./NavBar"


export default function Home(args: any) {
  return(
      <div>
        <NavBar />
        <Text fontSize={22} fontWeight={500} data-test="content-title">
          Home
        </Text>
      </div>
  )
}