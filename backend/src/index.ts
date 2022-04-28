import 'dotenv/config'
import express from "express"
import bodyParser  from "body-parser"
import mongoose from 'mongoose'


// Create the Express server
const app = express();
 
// Connect to the MongoDB instance
const mongoString = process.env.DATABASE_URL || "mongodb://localhost:27017/dapr_tcm"
mongoose.connect(mongoString);

const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('MongoDB database is connected');
})

// Load the API routes
app.use(bodyParser.json())

// Setup the API routes
app.use('/api/users', require('./api/users'))
 

// Startup the Express server
const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
