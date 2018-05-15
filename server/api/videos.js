const router = require('express').Router()
const Video = require('../db/models').Video

router.get('/', async (req, res, next) => {
  let videos = await Video.findAll()
  res.json(videos)
})

router.get('/:id', async (req, res, next) => {
  let video = await Video.findById(req.params.id)
  console.log('video', video)
  res.json(video)
})

module.exports = router
