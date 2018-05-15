import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const CLEAR_USER = 'CLEAR_USER'

const getUser = user => {
  return {
    type: GET_USER,
    user
  }
}

const clearUser = () => {
  return {
    type: CLEAR_USER
  }
}

export const authorize = () => {
  return async dispatch => {
    let me = await axios.get('/auth/me')
    if (me.data) {
      dispatch(getUser(me.data))
      history.push('/media')
    } else {
      throw new Error('You suck')
    }
  }
}

export const fetchUser = user => {
  return async dispatch => {
    try {
      let currentUser = await axios.post('/auth/login', user)
      dispatch(getUser(currentUser))
      history.push('/media')
    } catch (err) {
      console.log(err)
    }
  }
}

export const signUpUser = user => {
  return async () => {
    try {
      await axios.post('/auth/signup', user)
      history.push('/splash')
    } catch (err) {
      console.log(err)
    }
  }
}

export const logoutCurrentUser = () => {
  return async dispatch => {
    try {
      await axios.post('/auth/logout')
      dispatch(clearUser())
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case CLEAR_USER:
      return {}
    default:
      return state
  }
}
