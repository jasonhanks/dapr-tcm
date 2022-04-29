import express, {Request, Response} from "express"
import { body, validationResult  } from 'express-validator'


// Model imports
const User = require('../models/user')


// Retrieve the router so we can define endpoints
const router = express.Router()


 /**
  * ROUTE handlers
  */


// Implementation for /api/users/login POST route
router.post('/login',

    // Request parameter validations
    body('username').isEmail(),
    body('password').isLength({ min: 8 }),

    
    // Login implementation
    async (request: Request, response: Response) => {
        // Check for errors
        const errors = validationResult(request)
        if (!errors.isEmpty()) 
            return response.status(401).json({})
        
        // find the User and authenticate using the supplied password if possible
        const user = await User.findOne({ username: request.body.username })
        if(user != null) {
            // Authenticate using the known hash with what we create from the specified password
            await user.authenticate(request.body.password, (authenticated: boolean) => {
                if(authenticated) {
                    console.log("Authentication succesful username="+ request.body.username)
                    return response.status(200).json({ user: user })
                } else {
                    console.log("Authentication failed username="+ request.body.username)
                    return response.status(401).json({})
                }
            })
        } else {
            console.log("Authentication failed username="+ request.body.username)
            return response.status(401).json({})
        }
    }
)

// Implementation for /api/users POST
router.post('/',

    // Request parameter validations
    body('username').isEmail(),
    body('initials').isLength({ min: 2, max: 5 }),
    body('password').isLength({ min: 8 }),
    body('password_confirm').isLength({ min: 8 }),
    body('full_name').isLength({ min: 4 }),

    // Login implementation
    async (request: Request, response: Response) => {

        // Check for form validation errors
        const errors = validationResult(request)
        if (!errors.isEmpty()) 
            return response.status(401).json({ errors: errors })

        // Verify that both passwords provided are the same
        if (request.body.password != request.body.password_confirm) 
            return response.status(401).json({ errors: "Passwords do not match!"})

        // Emails are unique for usernames
        if (await User.findOne({ username: request.body.username }) != null) 
            return response.status(401).json({ errors: "User already exists!" })

        // Encrypt the password before creating the User and storing them
        await User.encryptPassword(request.body.password, async (err: any, hash: string) => {
            if (err) return response.status(401).json(err)

            const results = await User.findOne({ is_admin: true}).exec()

            // Create the User from the request
            const user = new User({ 
                username: request.body.username,
                initials: request.body.initials,
                password: hash,
                full_name: request.body.full_name,
                is_admin: results == null
            })

            // Save the User to the DB
            console.log("Creating User username="+ request.body.username)
            user.save((err: any, u: typeof User) => {
                if(err) {
                    response.status(401).json(err)
                    return console.log(err)
                } 
                response.status(200).json({ user: u })
            })

        })
    }
)

module.exports = router
