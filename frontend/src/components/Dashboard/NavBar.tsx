import {
    ButtonGroup,
    Flex,
    FlexProps,
    HStack,
    Select,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom'

import NavMenu from './NavMenu';
import Notifications from './Notifications'
import Tasks from "./Tasks"
import AccountMenu from "../Account/AccountMenu"

interface NavBarProps extends FlexProps {
}
  
  
const NavBar = ({ ...rest }: NavBarProps) => {
  const navigate = useNavigate()
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="12"
      alignItems="center"
      bg={useColorModeValue('teal.400', 'teal.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-start' }}
      {...rest}>

      <HStack spacing={{ base: '0', md: '4' }}>
        <NavMenu />
  
        <Text fontSize={16} fontWeight={600}>DAPR TCM</Text>
        <Select variant='filled' display="inline-block" width="initial" onChange={(e) => navigate("/projects/"+ e.target.value, { replace: true })}>
          <option value="1">Default Project</option>
          <option value="2">Sample Project</option>
        </Select>

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