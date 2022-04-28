import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('projects', dataSchema)