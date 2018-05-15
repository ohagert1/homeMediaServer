import React from 'react'
import { connect } from 'react-redux'

const ErrorDisplay = props => {
  return <h1>{props.error.message}</h1>
}

const mapState = state => {
  return {
    error: state.error
  }
}

export default connect(mapState, null)(ErrorDisplay)
