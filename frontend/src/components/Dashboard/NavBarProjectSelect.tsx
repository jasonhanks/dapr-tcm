import { 
    useEffect,
    useState
 } from "react";
 import { useNavigate } from 'react-router-dom'

 import {
    Select,
} from "@chakra-ui/react"

const NavBarProjectSelect = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [projects, setProjects] = useState([]);

    // Fetch the list of Projects from the API server
    useEffect(() => {
      fetch("/api/projects")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            setProjects(result)
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          }
        )
    }, [])

    if (error) {
        return (<div>ERROR loading Projects: {error}</div>)
    } else if (!isLoaded) {
        return (<div>Loading Projects...</div>)
    } else {
        return (
            <Select variant='filled' display="inline-block" width="initial" data-test="project-select" onChange={(e) => navigate("/projects/"+ e.target.value, { replace: true })}>
                {projects.map((project: any) => <option key={project._id}>{project.name}</option> )}
            </Select> 
        )
    }
}

export default NavBarProjectSelect