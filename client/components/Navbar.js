import React from 'react'
import { connect } from 'react-redux'
import { logoutCurrentUser } from '../store'
import { Navbar, NavItem, Nav } from 'react-bootstrap'

const NavBar = props => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="">Ras Media</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {props.currentUser.isApproved ? (
            <NavItem eventKey={1} onClick={props.logoutUser}>
              Logout
            </NavItem>
          ) : (
            <Nav>
              <NavItem href="/login" eventKey={2}>
                Log In
              </NavItem>
              <NavItem href="/signup" eventKey={3}>
                Sign Up
              </NavItem>
            </Nav>
          )}
        </Nav>
        {props.currentUser.email && (
          <Navbar.Text pullRight>{props.currentUser.email}</Navbar.Text>
        )}
      </Navbar.Collapse>
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
