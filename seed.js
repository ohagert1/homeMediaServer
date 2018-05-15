const fs = require('fs')
const path = require('path')
const moviesPath = require('./secrets').moviesMedia
const tvPath = require('./secrets').tvPath
const Video = require('./server/db/models').Video
const db = require('./server/db')

const supportedFileTypes = {
  '.mp4': true,
  '.avi': true,
  '.mkv': true
}

const sync = async () => {
  await db.sync({ force: true })
}

const movies = []

const tv = []

const files = []

const path1 = path.join(__dirname, moviesPath)

const readMedia = (folder, arr, mediaType) => {
  fs.readdirSync(folder).forEach(file => {
    let filePath = path.join(folder, file)
    var stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      readMedia(filePath, arr, mediaType)
    } else if (supportedFileTypes[path.extname(file)]) {
      let vid = Video.build({
        url: file,
        title: file,
        mediaType
      })
      console.log(`url/title: ${file}, mediaType: ${mediaType}`)
      arr.push(vid)
    }
  })
}

//sync()

readMedia(path1, movies, 'movie')
movies.forEach(movie => movie.save())
