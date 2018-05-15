import axios from 'axios'
import { setError } from './'

const GET_VIDEOS = 'GET_VIDEOS'

const getVideos = videos => {
  return {
    type: GET_VIDEOS,
    videos
  }
}

export const fetchVideos = options => {
  return async dispatch => {
    try {
      let videos = await axios.get('/api/videos')
      console.log('vd', videos)
      dispatch(getVideos(videos.data))
    } catch (err) {
      console.log(err)
      dispatch(setError(err))
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_VIDEOS:
      return action.videos
    default:
      return state
  }
}
