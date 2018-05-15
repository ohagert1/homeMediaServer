import React from 'react'
import { connect } from 'react-redux'

const Splash = props => {
  let message = 'Welcome, please sign in or request access'
  if (!props.currentUser.isApproved) {
    message = 'Thank you for signing up, please be patient and await approval'
  }
  return <h1>!{message}!</h1>
}

const mapState = state => {
  return {
    currentUser: state.user
  }
}

export default connect(mapState, null)(Splash)
