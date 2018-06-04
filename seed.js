const fs = require('fs')
const path = require('path')
const { seedDev, seedUser, moveToPath } = require('./secrets')
const { Video, User } = require('./server/db/models')
const db = require('./server/db')
const handbrake = require('handbrake-js')

const supportedFileTypes = {
  '.mp4': true,
  '.avi': true,
  '.mkv': true,
  '.m4v': true
}

const media = []

const pathToMedia = path.join(__dirname, seedDev)

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
      let mediaType = file.includes('tv') ? 'tv' : 'film'
      let title = file.slice(0, file.lastIndexOf('.'))
      let url =
        moveToPath + mediaType === 'tv' ? '/tv/' : '/film/' + title + '.mkv'
      let vid = table.build({
        url,
        title,
        mediaType
      })
      arr.push(vid)
      console.log(url)
      handbrake
        .spawn({ seedDev, url })
        .on('error', err => {
          console.log(err)
        })
        .on('progress', prog => {
          console.log(`Progress: ${prog.percentComplete} \nETA: ${prog.eta}`)
        })
        .on('complete', () => {
          console.log('finished ' + title)
        })
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
