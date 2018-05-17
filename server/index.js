const path = require('path')
const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const apiRouter = require('./api')
const authRouter = require('./auth')
const { loginCheck, adminCheck } = require('./utils')
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const force = false
const PORT = 8080
const app = express()

require('../secrets')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user
    .findById(id)
    .then(user => done(null, user))
    .catch(done)
)

const createApp = () => {
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
  app.use(compression())
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(
    '/media',
    loginCheck,
    express.static(path.join(__dirname, process.env.MEDIA_PATH))
  )
  app.use('/auth', authRouter)
  app.use('/api', loginCheck, apiRouter)
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
  db.sync({ force }).then(() => {
    app.listen(PORT, () => {
      console.log(`listening! on port ${PORT}`)
    })
  })
}

createApp()

module.exports = app
