import { 
    extendTheme, 
    withDefaultColorScheme
} from '@chakra-ui/react'

import './styles.css'
import styles from './styles'

// Import foundational overrides
import colors from './foundations/colors'
import fonts from './foundations/fonts'

// Import component overrides
// import Button from './components/button'


export default extendTheme({
    // Global overrides
    styles,

    // Foundations
    colors,
    ...fonts,

    // Components
    // Button
},
withDefaultColorScheme({
    colorScheme: 'trac',
    // components: [
    //     'Button',
    //     'Checkbox',
    // ]
}))
