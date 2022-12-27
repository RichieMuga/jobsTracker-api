require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const auth = require('./routes/auth')
const jobs = require('./routes/jobs')
const authentication = require('./middleware/authentication')
//security packages
const helmet = require('helmet')
const ratelimiter = require('express-rate-limit')
const xss = require('xss-clean')
const cors = require('cors')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
app.use(ratelimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}))
app.use(helmet())
app.use(xss())
app.use(cors())
//dummy get routes
app.get('/', (req, res) => {
  res.send('jobs-api')
})

// routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/jobs', authentication, jobs)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
