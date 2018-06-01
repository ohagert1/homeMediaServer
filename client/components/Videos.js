import React, { Component } from 'react'
import { connect } from 'react-redux'
import levenshtein from 'fast-levenshtein'
import { fetchVideos, fetchCurrentVideo } from '../store'
import { Table } from './'

class Videos extends Component {
  constructor(props) {
    super(props)
    this.filterVideos = this.filterVideos.bind(this)
    this.selectVideo = this.selectVideo.bind(this)
  }

  componentDidMount() {
    this.props.loadVideos()
  }

  filterVideos() {
    let search = this.props.filter.toLowerCase()
    let videos = this.props.videos
    if (!search.length) return videos
    let matches = []
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].title.toLowerCase() === search) {
        return [videos[i]]
      } else if (videos[i].title.toLowerCase().includes(search)) {
        matches.push(videos[i])
      } else if (levenshtein.get(search, videos[i].title.toLowerCase()) < 5) {
        matches.push(videos[i])
      }
    }
    return matches
  }

  selectVideo(event) {
    this.props.chooseVideo(event.target.id)
    this.props.history.push(event.target.id)
  }

  render() {
    return (
      <div>
        <Table
          media={this.filterVideos(this.props.videos)}
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
    filter: state.filter
  }
}

const mapDispatch = dispatch => {
  return {
    loadVideos: () => dispatch(fetchVideos()),
    chooseVideo: videoId => dispatch(fetchCurrentVideo(videoId))
  }
}

export default connect(mapState, mapDispatch)(Videos)
