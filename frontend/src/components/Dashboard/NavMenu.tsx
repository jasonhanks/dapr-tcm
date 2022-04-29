import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom'
import { 
    FiBook, 
    FiCalendar,
    FiDatabase,
    FiHome,
    FiInfo,
    FiMenu,
    FiSettings,
    FiStar, 
    FiTrendingUp,
} from "react-icons/fi";


const NavMenu = () => {
    const navigate = useNavigate()
    // <IconButton variant="link" size="md" icon={<HamburgerIcon />} onClick={() => navigate("/")} aria-label="open menu" />
    return (
        <Flex alignItems={'center'}>
            <Menu>
                <MenuButton
                    as={IconButton}
                    rounded={'full'}
                    size="md"
                    variant="solid"
                    cursor={'pointer'}
                    icon={<FiMenu />}>
                </MenuButton>
                <MenuList alignItems={'center'}>
                    <MenuItem icon={<FiHome />} onClick={() => navigate("/")}>Home</MenuItem>
                    <MenuItem icon={<FiStar />} onClick={() => navigate("/favorites")}>Favorites</MenuItem>
                    <MenuItem icon={<FiTrendingUp />} onClick={() => navigate("/")}>Recent</MenuItem>
                    <MenuDivider />

                    <MenuItem icon={<FiDatabase />} onClick={() => navigate("/projects")}>Projects</MenuItem>
                    <MenuItem icon={<FiCalendar />} onClick={() => navigate("/plans")}>Plans</MenuItem>
                    <MenuItem icon={<FiBook />} onClick={() => navigate("/suites")}>Suites</MenuItem>
                    <MenuDivider />

                    <MenuItem icon={<FiSettings />} onClick={() => navigate("/settings")}>Settings</MenuItem>
                    <MenuDivider />

                    <MenuItem icon={<FiInfo />} onClick={() => navigate("/about")}>About</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default NavMenu
