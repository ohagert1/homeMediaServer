const fs = require('fs')
const path = require('path')
const moviesPath = require('./secrets').moviesMedia
const tvPath = require('./secrets').tvPath
const Video = require('./server/db/models').Video

const supportedFileTypes = {
  '.mp4': true,
  '.avi': true,
  '.mkv': true
}

const movies = []

const tv = []

const files = []

const path1 = path.join(__dirname, moviesPath)

const readMedia = (folder, arr) => {
  fs.readdirSync(folder).forEach(file => {
    let filePath = path.join(folder, file)
    var stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      readMedia(filePath, arr)
    } else if (supportedFileTypes[path.extname(file)]) {
      console.log(file)
      arr.push(file)
    }
  })
}

readMedia(path1, movies)
// Promise.all(
//   movies.map(movie => {
//     return Video.create({ url: movie, title: movie, mediaType: 'film' }).catch(
//       err => console.log(err)
//     )
//   })
// )
