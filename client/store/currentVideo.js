import axios from 'axios'

const SET_VIDEO = 'SET_VIDEO'
const CLEAR_VIDEO = 'CLEAR_VIDEO'

const setVideo = video => {
  return {
    type: SET_VIDEO,
    video
  }
}

export const clearVideo = () => {
  return {
    type: CLEAR_VIDEO
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
    case CLEAR_VIDEO:
      return {}
    default:
      return state
  }
}
