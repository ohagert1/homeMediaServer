import axios from 'axios'
import history from '../history'

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
    try {
      let video = await axios.get(`/api/videos/${videoId}`)
      video = video.data
      dispatch(setVideo(video))
      history.push(`/media/videos/${videoId}`)
    } catch (err) {
      console.log(err)
    }
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
