import React, { Component } from 'react'
import { connect } from 'react-redux'
import levenshtein from 'fast-levenshtein'
import { fetchVideos, fetchCurrentVideo } from '../store'
import { Table } from './'

class Videos extends Component {
  constructor(props) {
    super(props)
    this.searchVideos = this.searchVideos.bind(this)
    this.selectVideo = this.selectVideo.bind(this)
  }

  componentDidMount() {
    this.props.loadVideos()
  }

  searchVideos() {
    let search = this.props.searchTerm.toLowerCase()
    let category = this.props.category
    let videos = this.props.videos
    if (!search.length) return videos
    let matches = []
    for (let i = 0; i < videos.length; i++) {
      let catMatch = videos[i].mediaType === category
      if (videos[i].title.toLowerCase() === search && catMatch) {
        return [videos[i]]
      } else if (videos[i].title.toLowerCase().includes(search) && catMatch) {
        matches.push(videos[i])
      } else if (
        catMatch &&
        levenshtein.get(search, videos[i].title.toLowerCase()) < 5
      ) {
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
          media={this.searchVideos(this.props.videos)}
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
