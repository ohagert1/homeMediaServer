import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentVideo } from '../store'
import ReactPlayer from 'react-player'

class SingleVideo extends Component {
  componentDidMount() {
    let videoId = this.props.match.params.id
    this.props.chooseVideo(videoId)
  }

  render() {
    console.log('Single Video', this.props.currentVideo.url)
    return (
      <div>
        {this.props.currentVideo.url && (
          <ReactPlayer
            url={
              '/media/Planet.Earth.01.From.Pole.to.Pole.2006.1080p.HDDVD.x264.anoXmous_.mp4'
            }
            controls={true}
          />
        )}
        <span>WHOOPS</span>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentVideo: state.currentVideo
  }
}

const mapDispatch = dispatch => {
  return {
    chooseVideo: videoId => dispatch(fetchCurrentVideo(videoId))
  }
}

export default connect(mapState, mapDispatch)(SingleVideo)
