const express = require('express')
const router = express.Router()
const { createjob, updatejob, deletejob, getSinglejob, getAlljobs } = require('../controllers/jobs')

router.route('/').get(getAlljobs).post(createjob)
router.route('/:id').get(getSinglejob).patch(updatejob).delete(deletejob)

module.exports = router