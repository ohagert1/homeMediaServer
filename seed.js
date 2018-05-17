const fs = require('fs')
const path = require('path')
const { mediaPath, seedUser } = require('./secrets')
const { Video, User } = require('./server/db/models')
const db = require('./server/db')

const supportedFileTypes = {
  '.mp4': true,
  '.avi': true,
  '.mkv': true
}

const media = []

const pathToMedia = path.join(__dirname, mediaPath)

const readMedia = (table, folder, arr, folderPath = '') => {
  fs.readdirSync(folder).forEach(file => {
    let filePath = path.join(folder, file)
    var stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      readMedia(
        table,
        filePath,
        arr,
        folderPath.length ? folderPath + '/' + file : file
      )
    } else if (supportedFileTypes[path.extname(file)]) {
      let vid = table.build({
        url: `${folderPath.length ? folderPath + '/' : ''}${file}`,
        title: file.slice(0, file.lastIndexOf('.')),
        mediaType: file.includes('tv') ? 'tv' : 'film'
      })
      arr.push(vid)
    }
  })
}

readMedia(Video, pathToMedia, media)

db
  .sync({ force: true })
  .then(() => {
    return User.create(seedUser)
  })
  .then(() => {
    return Promise.all(media.map(movie => movie.save()))
  })
  .then(() => db.close())
  .catch(err => console.log(err))
