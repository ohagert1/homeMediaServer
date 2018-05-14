import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../store'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let user = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    this.props.loginUser(user)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">Log In</button>
          </div>
        </form>
        <Link to="/signup">Not a user? Request Access!</Link>
      </div>
    )
  }
}

const mapState = state => {
  return { currentUser: state.user }
}

const mapDispatch = dispatch => {
  return {
    loginUser: user => dispatch(fetchUser(user))
  }
}

export default connect(mapState, mapDispatch)(Login)
