const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('working')
})

module.exports = router
