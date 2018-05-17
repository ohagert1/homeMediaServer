import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentVideo, clearVideo } from '../store'
import ReactPlayer from 'react-player'

class SingleVideo extends Component {
  componentDidMount() {
    let videoId = this.props.match.params.id
    this.props.chooseVideo(videoId)
  }

  componentWillUnmount() {
    this.props.removeVideo()
  }

  render() {
    let { currentVideo } = this.props
    return (
      <div>
        {this.props.currentVideo.url && (
          <ReactPlayer url={`/media/${currentVideo.url}`} controls={true} />
        )}
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
    chooseVideo: videoId => dispatch(fetchCurrentVideo(videoId)),
    removeVideo: () => dispatch(clearVideo())
  }
}

export default connect(mapState, mapDispatch)(SingleVideo)
