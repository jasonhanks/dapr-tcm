import express, {Request, Response} from "express"
import { body, check, validationResult  } from 'express-validator'


// Model imports
const User = require('../models/user')


// Retrieve the router so we can define endpoints
const router = express.Router()


 /**
  * ROUTE handlers
  */



// Implementation for /api/users GET
router.get('/', async (request: Request, response: Response) => {
    return response.status(200).json(await User.find({}).sort('username'))
})


// Implementation for /api/users DELETE
router.delete('/:id', 
    async (request: Request, response: Response) => {
        const count = await User.countDocuments({ _id: request.params.id })
        if(count == 0){
            console.log(`Username was not found: ${ request.params.id }`)
            return response.status(404).json({})
        }

        // Delete the User
        await User.deleteOne({ _id: request.params.id })

        // Verify that we were able to remove the User
        const newCount = await User.countDocuments({ _id: request.params.id })
        if(newCount != count-1) {
            console.log(`Username was not deleted: ${ request.params.id }`)
            return response.status(403).json({})
        }

        console.log(`Username was deleted: ${ request.params.id }`)
        return response.status(200).json({})
    }
)


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
    body('username').isEmail().withMessage('Email must be a valid working email address'),
    body('initials').isLength({ min: 2, max: 5 }).withMessage('Initials must be between 2 and 5 chars long'),
    check('password').isLength({ min: 8 }).withMessage('Passwords must be at least 8 chars long'),
    check('password_confirm').isLength({ min: 8 }).withMessage('Password confirmations must be at least 8 chars long'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error()
        }
        return true
    }).withMessage('Password and confirmation password must match'),
    body('full_name').isLength({ min: 4 }).withMessage('Full name must at least 4 chars long'),

    // Login implementation
    async (request: Request, response: Response) => {

        // Check for form validation errors
        const errors = validationResult(request)
        if (!errors.isEmpty()) 
            return response.status(403).json({ "errors": errors.array() })

        // Verify that both passwords provided are the same
        if (request.body.password != request.body.password_confirm) 
            return response.status(403).json({ errors: [{ msg: "Invalid value", param: 'passwords',value: 'values do not match' }]})

        // Emails are unique for usernames
        if (await User.findOne({ username: request.body.username }) != null) 
            return response.status(403).json({ errors: ["User already exists!"] })

        // Encrypt the password before creating the User and storing them
        await User.encryptPassword(request.body.password, async (err: any, hash: string) => {
            if (err) return response.status(403).json(err)

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
                response.status(201).json({ user: u })
            })

        })
    }
)


// Implementation for /api/users PUT
router.put('/',

    // Request parameter validations
    body('username').isEmail().withMessage('Email must be a valid working email address'),
    body('initials').isLength({ min: 2, max: 5 }).withMessage('Initials must be between 2 and 5 chars long'),
    body('full_name').isLength({ min: 4 }).withMessage('Full name must at least 4 chars long'),

    // Login implementation
    async (request: Request, response: Response) => {

        // Check for form validation errors
        const errors = validationResult(request)
        if (!errors.isEmpty()) 
            return response.status(403).json({ "errors": errors.array() })

        const u = request.body
        const new_user = await User.findOneAndUpdate({ _id: u._id }, { username: u.username, initials: u.initials, full_name: u.full_name}, { new: true })

        if (new_user == null) return response.status(403).json({})
        response.status(200).json({ user: new_user })
    }
)


module.exports = router
