const fs = require('fs')
const path = require('path')
const localPath = require('./secrets').mediaDev
const moviesPath = require('./secrets').moviesMedia
const tvPath = require('./secrets').tvMedia
const { Video, User } = require('./server/db/models')
const db = require('./server/db')

const supportedFileTypes = {
  '.mp4': true,
  '.avi': true,
  '.mkv': true
}

const movies = []

const tv = []

const path0 = path.join(__dirname, localPath)
const path1 = path.join(__dirname, moviesPath)
const path2 = path.join(__dirname, tvPath)

const readMedia = (table, folder, arr, mediaType) => {
  fs.readdirSync(folder).forEach(file => {
    let filePath = path.join(folder, file)
    var stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      readMedia(table, filePath, arr, mediaType)
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

// readMedia(Video, path1, movies, 'film')
// readMedia(Video, path2, tv, 'tv')

readMedia(Video, path0, movies, 'film')

db
  .sync()
  .then(() => {
    return User.update(
      { isAdmin: true, isApproved: true },
      {
        where: { email: 'test@test.test' }
      }
    )
  })
  .then(() => {
    return Promise.all(movies.map(movie => movie.save()))
  })
  // .then(() => {
  //   return Promise.all(tv.map(show => show.save()))
  // })
  .catch(err => console.log(err))
