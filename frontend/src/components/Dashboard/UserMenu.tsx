import {
    Avatar,
    Button,
    Center,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useColorMode
} from "@chakra-ui/react"

import {userContext} from '../App/context'


const UserMenu = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <userContext.Consumer>
            {({logoutUser, user}) => {
                  return (
                    <Flex alignItems={'center'}>
                    <Menu>
                      <MenuButton
                          as={Button}
                          rounded={'full'}
                          variant={'link'}
                          cursor={'pointer'}
                          minW={0}>
                          <Avatar
                          size={'sm'}
                          src={'https://avatars.dicebear.com/api/male/username.svg'}
                          />
                      </MenuButton>
                      <MenuList alignItems={'center'}>
                          <br />
                          <Center>
                          <Avatar
                              size={'2xl'}
                              src={'https://avatars.dicebear.com/api/male/username.svg'}
                          />
                          </Center>
                          <br />
                          <Center>
                              <div>
                                  <Center>{user.full_name}</Center>
                                  <Center>{user.username}</Center>
                              </div>
                          </Center>
                          <br />
                          <MenuDivider />
                          <MenuItem>Account Settings</MenuItem>
                          <MenuItem onClick={toggleColorMode}>Toggle Light / Dark Mode</MenuItem>
                          <MenuDivider />
                          <MenuItem>Settings</MenuItem>
                          <MenuDivider />
                          <MenuItem onClick={() => { logoutUser() }}>Sign Out</MenuItem>
                      </MenuList>
                      </Menu>
                  </Flex>                  
                  )
                }}

        </userContext.Consumer>
    )
}

export default UserMenu
