import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../store'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  PageHeader
} from 'react-bootstrap'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.loginUser(this.state)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="row">
        <PageHeader className="col-lg-offset-1">Log In</PageHeader>
        <form
          onSubmit={this.handleSubmit}
          className="form-inline col-lg-1 col-md-offset-1"
        >
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              name="email"
              value={this.state.email}
              type="text"
              placeholder="email"
              onChange={this.handleChange}
            />

            <ControlLabel htmlFor="password">Password</ControlLabel>
            <FormControl
              name="password"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Button className="mt-10" type="submit">
              Log In
            </Button>
          </FormGroup>
        </form>
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
