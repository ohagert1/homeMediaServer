import React from 'react'
import { connect } from 'react-redux'

const ErrorDisplay = props => {
  return
}

const mapState = state => {
  return {
    currentUser: state.user
  }
}

export default connect(mapState, null)(ErrorDisplay)
