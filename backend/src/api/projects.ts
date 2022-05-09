import express, {Request, Response} from "express"
import { body, validationResult  } from 'express-validator'


// Model imports
const Project = require('../models/project')


// Retrieve the router so we can define endpoints
const router = express.Router()


 /**
  * ROUTE handlers
  */


// Implementation for /api/users/login POST route
router.get('/',

    // Retrieve Projects implementation
    async (request: Request, response: Response) => {
        // Check for errors
        const errors = validationResult(request)
        if (!errors.isEmpty()) 
            return response.status(401).json({})
        
        // find the User and authenticate using the supplied password if possible
        const projects = await Project.find({})
        if(projects != null) {
            return response.status(200).json(projects)
        } else {
            return response.status(401).json({})
        }
    }
)


module.exports = router
