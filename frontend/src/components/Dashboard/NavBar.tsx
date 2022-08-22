import {
    Button,
    ButtonGroup,
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom'

import { 
  FiHome,
} from "react-icons/fi";

import NavMenu from './NavMenu';
import Notifications from './Notifications'
import Tasks from "./Tasks"
import AccountMenu from "../Account/AccountMenu"
import NavBarProjectSelect from "./NavBarProjectSelect"

interface NavBarProps extends FlexProps {
  showProject?: boolean
  title?: string
}
  
  
const NavBar = ({ showProject, title, ...rest }: NavBarProps) => {
  const navigate = useNavigate()
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="12"
      alignItems="center"
      bg={useColorModeValue('teal.400', 'teal.900')}
      borderWidth="2px"
      borderColor={useColorModeValue('teal.400', 'teal.700')}
      {...rest}>

      <HStack spacing={{ base: '0', md: '4' }}>
        <NavMenu />
  
        <ButtonGroup variant="link" size="md">
          <Button
            as={IconButton}
            onClick={() => navigate("/")}
            rounded={'full'}
            size="md"
            color={useColorModeValue('teal.600', 'teal.400')}
            cursor={'pointer'}
            icon={<FiHome />}>
          </Button>
        </ButtonGroup>

        <Text fontSize={24} fontWeight={700} data-test="title-text">TRAC TCM</Text>
        {title != null && 
          <Text fontSize={24} fontWeight={600} data-test="content-title">|&nbsp; {title} &nbsp;|</Text>
        }

        {showProject && 
          <NavBarProjectSelect ></NavBarProjectSelect>
        }


        <ButtonGroup variant="link" size="md">
          <Tasks />
          <Notifications />
          <AccountMenu />
        </ButtonGroup>

      </HStack>
    </Flex>
  )
}

export default NavBar