import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      securityQuestion: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let user = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    axios.post('/auth/signup', user).then(() => {
      this.props.history.push('/thanks')
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Request Access. You probably won't get it.</h3>
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
            <button type="submit">Request Access</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup
