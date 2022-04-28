import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Select,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCalendar,
  FiList,
  FiStar,
  FiMenu,
  FiBell,
  FiBook,
 
} from 'react-icons/fi';
import { IconType } from 'react-icons'
import { HamburgerIcon } from '@chakra-ui/icons'
import { ReactText } from 'react'

import UserMenu from "./UserMenu"


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

export default function SidebarWithHeader(
  {
  children
  }: {
  children: ReactNode
}) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose()}
        onToggle={() => onToggle()}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}>
        <DrawerContent>
          <SidebarContent onClose={onClose} onToggle={onToggle} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  onToggle: () => void
}

const SidebarContent = ({ onClose, onToggle, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="2s ease"
      bg={useColorModeValue('teal.400', 'teal.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('teal.400', 'teal.900')}
      w={{ base: 'full', md: 40 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="12" alignItems="center" mx="4" justifyContent="space-between">
          <Text fontWeight={800} fontSize={22}>
            DAPR TCM
          </Text>
        {/* <CloseButton display={{ base: 'flex', md: '4' }} onClick={onClose} ></CloseButton> */}
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

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

interface MobileProps extends FlexProps {
  onOpen: () => void
}


const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
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
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <p>Project: &nbsp;</p>
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