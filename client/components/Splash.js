import React from 'react'
import { connect } from 'react-redux'

const Splash = props => {
  let { currentUser } = props
  let message = 'Thank you for signing up, please be patient and await approval'
  if (!currentUser.email) {
    message = 'Welcome, please sign in or request access'
  } else if (props.currentUser.isApproved) {
    message = 'Welcome back!'
  }
  return <h1>{message}!</h1>
}

const mapState = state => {
  return {
    currentUser: state.user
  }
}

export default connect(mapState, null)(Splash)
