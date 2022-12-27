require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide name'],
        required: [true, 'please provide valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 5,
    },

})

userSchema.methods.createjsonwebtoken = async function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.jWT_LIFETIME })
};
userSchema.methods.comparepassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

module.exports = mongoose.model('User', userSchema)