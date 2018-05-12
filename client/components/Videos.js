import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchVideos, fetchCurrentVideo } from '../store'
import { Table } from './'

class Videos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
    this.selectVideo = this.selectVideo.bind(this)
  }

  componentDidMount() {
    this.props.loadVideos()
  }

  selectVideo(event) {
    this.props.chooseVideo(event.target)
  }

  render() {
    console.log(this.props.videos)
    return (
      <div>
        <Table media={this.props.videos} mediaPath={'/media/videos'} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    videos: state.videos
  }
}

const mapDispatch = dispatch => {
  return {
    loadVideos: () => dispatch(fetchVideos()),
    chooseVideo: videoId => dispatch(fetchCurrentVideo(videoId))
  }
}

export default connect(mapState, mapDispatch)(Videos)
