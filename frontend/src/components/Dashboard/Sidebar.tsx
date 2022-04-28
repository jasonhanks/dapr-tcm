import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
} from '@chakra-ui/react'


import MenuPane from './MenuPane'
import NavBar from './NavBar'


const Sidebar = ({children}: {children: ReactNode}) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
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
      <NavBar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export interface SidebarProps extends BoxProps {
  onClose: () => void
  onToggle: () => void
}

export const SidebarContent = ({ onClose, onToggle, ...rest }: SidebarProps) => {
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

      <MenuPane />
    </Box>
  )
}

export default Sidebar