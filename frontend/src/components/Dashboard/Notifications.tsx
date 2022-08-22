import {
    Center,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { FiBell } from "react-icons/fi";

import {userContext} from '../App/context'


const Notifications = () => {
    const color = useColorModeValue('teal.600', 'teal.400')
    return (
        <userContext.Consumer>
            {({logoutUser, user}) => {
                  return (
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                    as={IconButton}
                                    rounded={'full'}
                                    size="md"
                                    variant={'link'}
                                    color={color}
                                    cursor={'pointer'}
                                    icon={<FiBell />}>
                                </MenuButton>
                            <MenuList alignItems={'center'}>
                                <Center>
                                    <Text fontSize={16} fontWeight={500}>Notifications</Text>
                                </Center>
                                <MenuDivider />
                                <Center>
                                    <Text fontStyle="italic" fontSize={12}>No current notifications</Text>
                                </Center>
                            </MenuList>
                      </Menu>
                  </Flex>                  
                  )
                }}

        </userContext.Consumer>
    )
}

export default Notifications
