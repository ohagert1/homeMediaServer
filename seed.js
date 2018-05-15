const fs = require('fs')
const path = require('path')
const moviesPath = require('./secrets').moviesMedia
const tvPath = require('./secrets').tvMedia
const Video = require('./server/db/models').Video
const db = require('./server/db')

const supportedFileTypes = {
  '.mp4': true,
  '.avi': true,
  '.mkv': true
}

const movies = []

const tv = []

const files = []

const path1 = path.join(__dirname, moviesPath)
const path2 = path.join(__dirname, tvPath)

const readMedia = (table, folder, arr, mediaType) => {
  fs.readdirSync(folder).forEach(file => {
    let filePath = path.join(folder, file)
    var stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      readMedia(filePath, arr, mediaType)
    } else if (supportedFileTypes[path.extname(file)]) {
      let vid = table.build({
        url: file,
        title: file.slice(0, file.lastIndexOf('.')),
        mediaType
      })
      console.log(`url/title: ${file}, mediaType: ${mediaType}`)
      arr.push(vid)
    }
  })
}

const sync = async () => {
  await db.sync({ force: true })
  readMedia(Video, path1, movies, 'film')
  readMedia(Video, path2, tv, 'tv')
  await Promise.all(movies.map(movie => movie.save()).catch(console.log))
  await Promise.all(tv.map(movie => movie.save()).catch(console.log))
}

sync().then(db.close())
