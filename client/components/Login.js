import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchUser } from '../store'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      securityQuestion: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('!!', this.props)
  }

  handleSubmit(event) {
    console.log(this.props)
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

const mapDispatch = dispatch => {
  return {
    loginUser: user => dispatch(fetchUser(user))
  }
}

export default connect(null, mapDispatch)(Login)
