const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, } = require('../errors')

const createjob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ job })
}
const updatejob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, body: { company, position } } = req
    if (company === '' || position === '') {
        throw UnauthenticatedError('company or postion cannot be an empty string')
    }

    const jobs = await Job.findOneAndUpdate({
        createdBy: userId,
        _id: jobId,
    },
        req.body,
        { new: true, runValidators: true }
    )
    res.status(StatusCodes.OK).json({ jobs })
}
const deletejob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const jobs = await Job.findOneAndRemove({
        createdBy: userId,
        _id: jobId
    })
    if (!jobs) {
        throw new UnauthenticatedError(`Could not find job with job Id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}
const getSinglejob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const jobs = await Job.findOne({
        createdBy: userId,
        _id: jobId
    })
    if (!jobs) {
        throw new UnauthenticatedError(`Could not find job with job Id ${jobId}`)
    }
    // res.send('get single job')
    res.status(StatusCodes.OK).json({ jobs })
}
const getAlljobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

module.exports = { createjob, updatejob, deletejob, getSinglejob, getAlljobs }