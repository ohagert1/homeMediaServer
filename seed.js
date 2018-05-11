const fs = require('fs')
const path = require('path')

fs.readdirSync(path.join(__dirname, require('./secrets'))).forEach(file => {
  console.log(file)
})
