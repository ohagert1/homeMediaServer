import axios from 'axios'
import history from '../history'
import { setError } from './'
import { isError } from 'util'

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
      history.push('/media/videos')
    } else {
      let err = new Error('Not logged in/Not Authorized')
      console.log(err)
      dispatch(setError(err))
    }
  }
}

export const fetchUser = user => {
  return async dispatch => {
    try {
      let currentUser = await axios.post('/auth/login', user)
      currentUser = currentUser.data
      dispatch(getUser(currentUser))
      history.push('/media/videos')
    } catch (err) {
      console.log(err)
      dispatch(setError(err))
    }
  }
}

export const signUpUser = user => {
  return async dispatch => {
    try {
      let newUser = await axios.post('/auth/signup', user)
      console.log(`NEW USER: ${newUser}`)
      dispatch(getUser(newUser))
      history.push('/splash')
    } catch (err) {
      console.log(err)
      dispatch(setError(err))
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
      dispatch(setError(err))
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
