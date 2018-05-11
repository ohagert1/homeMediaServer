const fs = require('fs')

fs.readdirSync(process.env.MEDIA_PATH).forEach(file => {
  console.log(file)
})
