import React from 'react'
import {
    Link,
    Text
} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom'

import NavBar from "../Dashboard/NavBar"


export default function Projects(args: any) {
    const navigate = useNavigate()
    return(
      <div>
        <NavBar />
        <Text fontSize={22} fontWeight={500}>
          Projects
        </Text>
        <br/>
        <Link onClick={() => navigate("/projects/new")}>
          Create a new Project
        </Link>
      </div>
    )
}