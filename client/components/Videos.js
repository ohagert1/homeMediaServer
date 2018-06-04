import React, { Component } from 'react'
import { connect } from 'react-redux'
import levenshtein from 'fast-levenshtein'
import { fetchVideos, fetchCurrentVideo } from '../store'
import { Table } from './'
import { refine } from '../utils'

class Videos extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    //this.categoryFilter = this.categoryFilter.bind(this)
    this.selectVideo = this.selectVideo.bind(this)
  }

  componentDidMount() {
    this.props.loadVideos()
  }

  search() {
    let search = this.props.searchTerm.toLowerCase()
    let category = this.props.category
    let videos = this.props.videos
    return refine(videos, search, category)
  }

  selectVideo(event) {
    this.props.chooseVideo(event.target.id)
    this.props.history.push(event.target.id)
  }

  render() {
    return (
      <div>
        <Table
          media={this.search(this.props.videos)}
          mediaPath={'/media/videos'}
          clickHandle={this.selectVideo}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    videos: state.videos,
    searchTerm: state.search,
    category: state.category
  }
}

const mapDispatch = dispatch => {
  return {
    loadVideos: () => dispatch(fetchVideos()),
    chooseVideo: videoId => dispatch(fetchCurrentVideo(videoId))
  }
}

export default connect(mapState, mapDispatch)(Videos)
