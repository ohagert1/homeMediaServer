import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchVideos, fetchCurrentVideo } from '../store'
import { Table } from './'

class Videos extends Component {
  constructor(props) {
    super(props)
    this.selectVideo = this.selectVideo.bind(this)
  }

  componentDidMount() {
    this.props.loadVideos()
  }

  selectVideo(event) {
    console.log('selectVideo')
    this.props.chooseVideo(event.target.id)
    this.props.history.push(event.target.id)
  }

  render() {
    return (
      <div>
        <Table
          media={this.props.videos}
          mediaPath={'/media/videos'}
          clickHandle={this.selectVideo}
        />
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
