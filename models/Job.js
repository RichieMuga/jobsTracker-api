const mongoose = require('mongoose')

const Jobschema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    },
    position: {
        type: String,
        require: [true, "please provide position"],
        maxlength: 100
    },
    company: {
        type: String,
        require: [true, "please provide company"],
        maxlength: 50
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'please provide user']
    }
}, { timestamps: true })

module.exports = mongoose.model('Job ', Jobschema)