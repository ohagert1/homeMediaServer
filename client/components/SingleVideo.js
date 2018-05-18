import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentVideo, clearVideo } from '../store'
import ReactPlayer from 'react-player'
import { PageHeader } from 'react-bootstrap'

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
      <div className="row">
        {this.props.currentVideo.url && (
          <div className="col-lg-4 col-lg-offset-3">
            <h3>{currentVideo.title}</h3>
            <ReactPlayer url={`/media/${currentVideo.url}`} controls={true} />
            <h5>{currentVideo.description}</h5>
          </div>
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
