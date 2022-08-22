import { useEffect, useState } from "react"
import {
    Box,
    Button,
    Slide,
    Text,
    useDisclosure,
    useColorModeValue,
} from "@chakra-ui/react"



const Disclaimer = () => {
    const { isOpen, onToggle } = useDisclosure()
    const [disclaimer, setDisclaimer] = useState(true)
    useEffect(() => {
      if (disclaimer)
        onToggle()
        setDisclaimer(false)
    }, [disclaimer, onToggle])
  
    return (
        <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
          <Box
            p='20px'
            bg={useColorModeValue('teal.400', 'teal.700')}
          >
            <Text>
              <b>Notice:</b> this site uses cookies to provide necessary website functionality, 
              improve your experience, and analyze our traffic. By using our website, you agree 
              to our Privacy Policy and our cookies usage.
              &nbsp;
              <Button bg={useColorModeValue('teal.900', 'teal.400')} onClick={onToggle}>Accept</Button>
            </Text>
          </Box>
        </Slide>
    )
}

export default Disclaimer