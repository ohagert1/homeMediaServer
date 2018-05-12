import axios from 'axios'

const SET_VIDEO = 'SET_VIDEO'

const setVideo = video => {
  return {
    type: SET_VIDEO,
    video
  }
}

export const fetchCurrentVideo = videoId => {
  return async dispatch => {
    let video = await axios.get(`/api/videos/${videoId}`)
    console.log('video in fetch', video.data)
    dispatch(setVideo(video.data))
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case SET_VIDEO:
      return action.video
    default:
      return state
  }
}
