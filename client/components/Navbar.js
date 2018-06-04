import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutCurrentUser, setSearch, setCategory } from '../store'
import {
  Navbar,
  NavItem,
  Nav,
  FormGroup,
  FormControl,
  ControlLabel,
  Glyphicon,
  Collapse
} from 'react-bootstrap'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advanced: false
    }
    this.toggleAdvanced = this.toggleAdvanced.bind(this)
  }

  toggleAdvanced() {
    this.setState({
      advanced: !this.state.advanced
    })
  }

  render() {
    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>RasMedia</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.props.currentUser.isApproved && (
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Search"
                onChange={evt => {
                  this.props.searchFilter(evt.target.value)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Navbar.Text>
                <Glyphicon
                  glyph={`glyphicon glyphicon-menu-${
                    this.state.advanced ? 'left' : 'right'
                  }`}
                  onClick={this.toggleAdvanced}
                />
              </Navbar.Text>
            </FormGroup>
            <FormGroup>
              <Collapse
                in={this.state.advanced}
                dimension="width"
                timeout={100}
              >
                <Nav>
                  <ControlLabel>
                    <Navbar.Text>Category</Navbar.Text>
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="all"
                    onChange={evt =>
                      this.props.categoryFilter(evt.target.value)
                    }
                  >
                    <option value="all">All</option>
                    <option value="tv">Television</option>
                    <option value="film">Film</option>
                  </FormControl>
                  <ControlLabel>
                    <Navbar.Text>Genre</Navbar.Text>
                  </ControlLabel>
                  <FormControl componentClass="select" placeholder="all">
                    <option value="all">All</option>
                    <option value="placeholder1">placeholder1</option>
                    <option value="placeholder2">placeholder2</option>
                  </FormControl>
                </Nav>
              </Collapse>
            </FormGroup>
          </Navbar.Form>
        )}

        <Navbar.Collapse>
          {this.props.currentUser.email ? (
            <Nav pullRight>
              <NavItem onClick={this.props.logoutUser}>logout</NavItem>
              <Navbar.Text> user: {this.props.currentUser.email}</Navbar.Text>
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
}

const mapState = state => {
  return { currentUser: state.user, error: state.error }
}

const mapDispatch = dispatch => {
  return {
    logoutUser: () => dispatch(logoutCurrentUser()),
    searchFilter: term => dispatch(setSearch(term)),
    categoryFilter: cat => dispatch(setCategory(cat))
  }
}

export default connect(mapState, mapDispatch)(NavBar)
