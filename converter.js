const handbrake = require('handbrake-js')
const path = require('path')
require('./secrets')
const input =
  '../Planet.Earth.Complete.Series.2006.1080p.HDDVD.x264.anoXmous/1.Planet.Earth.EP01.From.Pole.to.Pole/Planet.Earth.01.From.Pole.to.Pole.2006.1080p.HDDVD.x264.anoXmous_.mp4'
const output = 'PoleToPoleMKV.mkv'

console.log(input)

handbrake
  .spawn({ input, output })
  .on('error', err => {
    console.log(err)
  })
  .on('progress', prog => {
    console.log(`Progress: ${prog.percentComplete} \nETA: ${prog.eta}`)
  })
