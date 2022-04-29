import {
    Flex,
    FlexProps,
    Icon,
    Link
 } from "@chakra-ui/react"

import {
    FiHome,
    FiTrendingUp,
    FiCalendar,
    FiList,
    FiStar,
    FiBook,
   
} from 'react-icons/fi';

import { useNavigate } from 'react-router-dom'
  
import { ReactText } from 'react'
import { IconType } from 'react-icons'


interface LinkItemProps {
    name: string
    icon: IconType
    href: string
  }
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, href: "/" },
    { name: 'Recent', icon: FiTrendingUp, href: "#" },
    { name: 'Favorites', icon: FiStar, href: "#" },
    { name: 'Plans', icon: FiCalendar, href: "#" },
    { name: 'Suites', icon: FiBook, href: "#" },
  //   { name: 'Tests', icon: FiThumbsUp },
    // { name: 'Tasks', icon: FiList, href: "#" },
  //   { name: 'Settings', icon: FiSettings },
  ];
  

  interface NavItemProps extends FlexProps {
    icon: IconType
    children: ReactText
    href: string
  }
  const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
    const navigate = useNavigate()
    const navigateTo = (href: string) => {
      if (href === "#") return
      console.log("Navigating to: "+ href)
      navigate(href)
    }
  
      return (
      <Link onClick={() => navigateTo(href)} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'teal.300',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };
  
  
  
const MenuPane = () => {

    return (
        <div>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
                </NavItem>
            ))}
          </div>
    )

}

export default MenuPane