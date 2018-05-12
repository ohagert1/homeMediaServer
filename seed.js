const fs = require('fs')
const path = require('path')
const mediaPath = require('./secrets')

const supportedFileTypes = {
  '.mp4': true,
  '.avi': true,
  '.mkv': true
}

const files = []

fs.readdirSync(path.join(__dirname, mediaPath)).forEach(file => {
  if (supportedFileTypes[path.extname(file)]) {
    console.log(file)
  }
})
