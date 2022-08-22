import React from 'react';
import {
  Text
} from "@chakra-ui/react"

import NavBar from "../Dashboard/NavBar"

export default function Preferences() {
  return(
    <div>
      <NavBar />
      <Text fontSize={22} fontWeight={500} data-test="content-title">
        Account Settings
      </Text>
    </div>
  );
}
