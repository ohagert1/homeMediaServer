import React, { Component } from 'react'
import { signUpUser } from '../store'
import { connect } from 'react-redux'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  PageHeader
} from 'react-bootstrap'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.signUp(this.state)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="row">
        <PageHeader className="col-lg-offset-1">Request Access</PageHeader>
        <form onSubmit={this.handleSubmit} className="form-inline row">
          <FormGroup className="col-lg-1 col-md-offset-1">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              name="email"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <ControlLabel htmlFor="password">
              <small>Password</small>
            </ControlLabel>
            <FormControl
              name="password"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Button type="submit">Request Access</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    signUp: user => dispatch(signUpUser(user))
  }
}

export default connect(mapState, mapDispatch)(Signup)
