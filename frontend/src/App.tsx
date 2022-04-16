import * as React from "react"
import {
  Container,
  ChakraProvider,
} from "@chakra-ui/react"

import MainContent from "./MainContent"
import SidebarWithHeader from "./Sidebar"
import theme from './theme'

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* <Nav /> */}
    <SidebarWithHeader >
      <MainContent />
    </SidebarWithHeader>


  </ChakraProvider>
)
