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


const AccountMenu = () => {
    const { toggleColorMode } = useColorMode();
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
                          data-test="account-menu-button"
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
                              size={'xl'}
                              src={'https://avatars.dicebear.com/api/male/username.svg'}
                          />
                          </Center>
                          <Center>
                              <div>
                                  <Center data-test="full_name">{user.full_name}</Center>
                                  <Center data-test="username">{user.username}</Center>
                              </div>
                          </Center>
                          <MenuDivider />
                          <MenuItem data-test="account-settings-link">Account Settings</MenuItem>
                          <MenuItem data-test="toggle-dark-light-link" onClick={toggleColorMode}>Toggle Light / Dark Mode</MenuItem>
                          <MenuDivider />
                          <MenuItem data-test="signout-link" onClick={() => { logoutUser() }}>Sign Out</MenuItem>
                      </MenuList>
                      </Menu>
                  </Flex>                  
                  )
                }}

        </userContext.Consumer>
    )
}

export default AccountMenu
