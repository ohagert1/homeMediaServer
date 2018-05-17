const fs = require('fs')
const path = require('path')
const { mediaPath } = require('./secrets')
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
    console.log(`FILE PATH: ${filePath}, FILE: ${file}, folder: ${folder}`)
    var stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      readMedia(table, filePath, arr, file)
    } else if (supportedFileTypes[path.extname(file)]) {
      let vid = table.build({
        url: `${folderPath.length ? folderPath + '/' : ''}${file}`,
        title: file.slice(0, file.lastIndexOf('.')),
        mediaType: file.includes('tv') ? 'tv' : 'film'
      })
      console.log(`url/title: ${vid.url}, mediaType: ${vid.mediaType}`)
      arr.push(vid)
    }
  })
}

readMedia(Video, pathToMedia, media)

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
    return Promise.all(media.map(movie => movie.save()))
  })
  .catch(err => console.log(err))
