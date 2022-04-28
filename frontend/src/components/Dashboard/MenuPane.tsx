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
  
import { ReactText } from 'react'
import { IconType } from 'react-icons'


interface LinkItemProps {
    name: string;
    icon: IconType;
  }
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome },
    { name: 'Recent', icon: FiTrendingUp },
    { name: 'Favorites', icon: FiStar },
    { name: 'Plans', icon: FiCalendar },
    { name: 'Suites', icon: FiBook },
  //   { name: 'Tests', icon: FiThumbsUp },
    { name: 'Tasks', icon: FiList },
  //   { name: 'Settings', icon: FiSettings },
  ];
  

  interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
  }
  const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
      <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
                <NavItem key={link.name} icon={link.icon}>
                {link.name}
                </NavItem>
            ))}
          </div>
    )

}

export default MenuPane