import mongoose from 'mongoose'

export const PlanSchema = new mongoose.Schema({
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},

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
    tags: {
        requried: true,
        type: [String]
    }
})

module.exports = mongoose.model('plans', PlanSchema)