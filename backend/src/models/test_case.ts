import mongoose from 'mongoose'

const TestCaseSchema = new mongoose.Schema({
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

module.exports = mongoose.model('test_cases', TestCaseSchema)