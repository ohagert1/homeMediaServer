const router = require('express').Router()
const videoRouter = require('./video')

router.use('/video', videoRouter)

module.exports = router
