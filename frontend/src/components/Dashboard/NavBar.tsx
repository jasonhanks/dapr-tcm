import React, { useState } from 'react'
import {
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Select,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom'

import {
    FiBell,
    FiDatabase
} from 'react-icons/fi';


import UserMenu from "./UserMenu"


interface NavBarProps extends FlexProps {
    onOpen: () => void
  }
  
  
const NavBar = ({ onOpen, ...rest }: NavBarProps) => {
  const [newProject, createProject] = useState(false)
  const navigate = useNavigate()

  const navigateProject = (e: any) => {
    console.log("Navigating to project: "+ e.target.value)
    navigate("/projects/"+ e.target.value, { replace: true })
  }

  return (
    <Flex
      ml={{ base: 0, md: 40 }}
      px={{ base: 4, md: 4 }}
      height="12"
      alignItems="center"
      bg={useColorModeValue('teal.400', 'teal.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Text>Project</Text>
        <Select variant='filled' display="inline-block" width="initial" onChange={navigateProject}>
          <option value="1">Sample Project</option>
        </Select>
        <IconButton
            size="lm"
            onClick={() => navigate("/projects")}
            variant="link"
            aria-label="open menu"
            icon={<FiDatabase />}
          />
        <IconButton
          size="lm"
          variant="link"
          aria-label="open notifications"
          icon={<FiBell />}
        />
        <UserMenu />
      </HStack>
    </Flex>
  )
}

export default NavBar