const Sequelize = require('sequelize')
const db = require('../db')

const Video = db.define('video', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  mediaType: {
    type: Sequelize.ENUM('tv', 'film'),
    allowNull: false
  }
})

module.exports = Video
