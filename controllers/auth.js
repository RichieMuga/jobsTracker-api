const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { CustomAPIError, UnauthenticatedError, NotFoundError, BadRequestError, } = require('./../errors/index')


const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = await user.createjsonwebtoken();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token: token })
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('please provide valid email or password')
    }
    //
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('could not find email')
    }
    //compare password
    const passwordcompare = await user.comparepassword(password)
    if (!passwordcompare) {
        throw new UnauthenticatedError('incorrect password')
    }
    //create json token
    const token = await user.createjsonwebtoken();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token: token })
}
module.exports = { login, register }