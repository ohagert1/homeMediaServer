import React from 'react'
import { connect } from 'react-redux'
import { logoutCurrentUser, setFilter } from '../store'
import { Navbar, NavItem, Nav, FormGroup, FormControl } from 'react-bootstrap'

const NavBar = props => {
  return (
    <Navbar inverse fluid>
      <Navbar.Header>
        <Navbar.Brand>RasMedia</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      {props.currentUser.isApproved && (
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Search"
              onChange={evt => {
                props.filter(evt.target.value)
              }}
            />
          </FormGroup>
        </Navbar.Form>
      )}
      <Navbar.Collapse>
        {props.currentUser.email ? (
          <Nav pullRight>
            <NavItem onClick={props.logoutUser}>logout</NavItem>
            <Navbar.Text> user: {props.currentUser.email}</Navbar.Text>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItem href="/login">Log In</NavItem>
            <NavItem href="/signup">Sign Up</NavItem>
          </Nav>
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
    logoutUser: () => dispatch(logoutCurrentUser()),
    filter: search => dispatch(setFilter(search))
  }
}

export default connect(mapState, mapDispatch)(NavBar)
