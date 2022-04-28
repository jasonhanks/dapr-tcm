import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},

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

module.exports = mongoose.model('plans', dataSchema)