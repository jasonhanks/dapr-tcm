import {
    Link,
} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom'

import NavBar from "../Dashboard/NavBar"


export default function Projects(args: any) {
    const navigate = useNavigate()
    return(
      <div>
        <NavBar title="Projects" />
        <br/>
        <Link onClick={() => navigate("/projects/new")}>
          Create a new Project
        </Link>
      </div>
    )
}