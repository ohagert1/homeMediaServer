const router = require('express').Router()
const videoRouter = require('./videos')
const userRouter = require('./users')

router.use('/videos', videoRouter)
router.use('/users', userRouter)

module.exports = router
