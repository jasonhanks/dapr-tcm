import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    content: {
        required: false,
        type: String
    },
    versions: {
        required: true,
        type: [String]
    },
    tags: {
        requried: true,
        type: [String]
    }
})

module.exports = mongoose.model('projects', dataSchema)