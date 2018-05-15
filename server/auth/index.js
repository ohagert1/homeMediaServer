const router = require('express').Router()
const User = require('../db/models').User

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        let err = new Error('User Not Found')
        err.status = 401
        throw err
      } else if (!user.correctPassword(req.body.password)) {
        console.log('user password incorrect')
        let err = new Error('Incorrect Password')
        err.status = 401
        throw err
      } else if (!user.isApproved) {
        let err = new Error('Patience.')
        err.status = 401
        throw err
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res, next) => {
  console.log('req user', req.user)
  res.json(req.user)
})

module.exports = router
