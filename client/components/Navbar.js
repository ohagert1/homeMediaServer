import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutCurrentUser } from '../store'
import { Button, Navbar, NavItem, Nav } from 'react-bootstrap'

const NavBar = props => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand pullLeft>Ras Media</Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <Navbar.Text>
          user: {props.currentUser.email || 'Not Logged In'}
        </Navbar.Text>
        {props.currentUser.isApproved ? (
          <NavItem eventKey={1} onClick={props.logoutUser}>
            Logout
          </NavItem>
        ) : (
          <Nav>
            <NavItem href="/login">Log In</NavItem>
            <NavItem href="/signup">Sign Up</NavItem>
          </Nav>
        )}
      </Nav>
    </Navbar>
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

export default connect(mapState, mapDispatch)(NavBar)
