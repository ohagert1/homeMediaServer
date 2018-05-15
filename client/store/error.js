import history from '../history'

const SET_ERROR = 'SET_ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR'

export const setError = error => {
  return {
    type: SET_ERROR,
    error: {
      message: error.response.data,
      status: error.response.status
    }
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}

const defaultState = { message: '', status: null }

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error
    case CLEAR_ERROR:
      return defaultState
    default:
      return state
  }
}
