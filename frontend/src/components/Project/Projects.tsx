import React from 'react'
import {
    Link,
    Text
} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom'

import Sidebar from "../Dashboard/Sidebar"


export default function Projects(args: any) {
    const navigate = useNavigate()
    return(
      <Sidebar>
          <Text fontSize={22} fontWeight={500}>
            Projects
          </Text>
          <br/>
          <Link onClick={() => navigate("/projects/new")}>
                Create a new Project
            </Link>
      </Sidebar>
    )
}