import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentVideo, clearVideo } from '../store'
import ReactPlayer from 'react-player'
const pathModifier = process.env.NODE_ENV === 'production'

class SingleVideo extends Component {
  componentDidMount() {
    let videoId = this.props.match.params.id
    console.log('id:', videoId)
    this.props.chooseVideo(videoId)
    this.ref = this.ref.bind(this)
  }

  componentWillUnmount() {
    this.props.removeVideo()
  }

  ref(player) {
    this.player = player
  }

  render() {
    console.log('DUR: ', this.player.getDuration())
    return (
      <div>
        {this.props.currentVideo.url && (
          <ReactPlayer
            onReady={() => console.log('DURRRR: ', this.player.getDuration())}
            ref={this.ref}
            url="/media/newtest2.mp4"
            //url={`/media/movies/${this.props.currentVideo.url}`}
            controls={true}
          />
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
