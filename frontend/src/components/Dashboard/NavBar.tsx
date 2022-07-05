import {
    ButtonGroup,
    Flex,
    FlexProps,
    HStack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"

import NavMenu from './NavMenu';
import Notifications from './Notifications'
import Tasks from "./Tasks"
import AccountMenu from "../Account/AccountMenu"
import NavBarProjectSelect from "./NavBarProjectSelect"

interface NavBarProps extends FlexProps {
}
  
  
const NavBar = ({ ...rest }: NavBarProps) => {
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
  
        <Text fontSize={16} fontWeight={600} data-test="title-text">TRAC TCM</Text>
        <NavBarProjectSelect ></NavBarProjectSelect>

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