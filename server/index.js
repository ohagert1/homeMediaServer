const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const apiRouter = require('./api')
const utils = require('./utils')
const app = express()

// Necessary?
//if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = middleware => {
  let { adminCheck } = middleware

  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
      }
    })
  )
  app.use(helmet.noCache())

  app.use('/', adminCheck, (req, res, next) => {
    if (!adminCheck) {
      res.sendStatus(401)
    } else {
      next()
    }
  })

  app.use('/api', apiRouter)

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

createApp(utils)
