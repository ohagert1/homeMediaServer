import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutCurrentUser } from '../store'

const Navbar = props => {
  return (
    <span>
      <h2>user: {props.currentUser.email || 'Not Logged In'}</h2>
      {props.currentUser.isApproved ? (
        <div>
          <Link to="" onClick={props.logoutUser}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </span>
  )
}

const mapState = state => {
  return { currentUser: state.user, error: state.error }
}

const mapDispatch = dispatch => {
  return {
    logoutUser: () => dispatch(logoutCurrentUser())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
