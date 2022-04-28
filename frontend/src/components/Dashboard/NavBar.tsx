
import {
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Select,
    useColorModeValue,
} from "@chakra-ui/react"

import {
    FiMenu,
    FiBell,
} from 'react-icons/fi';


import UserMenu from "./UserMenu"


interface NavBarProps extends FlexProps {
    onOpen: () => void
  }
  
  
  const NavBar = ({ onOpen, ...rest }: NavBarProps) => {
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
  
        <p>Project &nbsp;</p>
        <Select variant='filled' display="inline-block" width="initial">
          <option value="1">Sample Project</option>
          <option>-- Add a new Project --</option>
        </Select>
  
        <HStack spacing={{ base: '0', md: '6' }}>
  
          <IconButton
            size="lg"
            variant="link"
            aria-label="open menu"
            icon={<FiBell />}
          />
  
          <UserMenu />
        </HStack>
      </Flex>
    );
  };

export default NavBar