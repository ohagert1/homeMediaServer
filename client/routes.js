import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
//import PropTypes from 'prop-types'
import {
  Login,
  AllMedia,
  Signup,
  Thanks,
  Videos,
  SingleVideo
} from './components'
import axios from 'axios'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      isLoggedIn: false
    }
    this.setUser = this.setUser.bind(this)
  }

  componentDidMount() {
    axios
      .get('/auth/me')
      .then(me => {
        if (me) {
          this.setState({ isLoggedIn: true })
        } else {
          throw new Error('You suck')
        }
      })
      .then(() => {
        axios
          .get('/api/videos')
          .then(videos => {
            this.setState({ videos })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  setUser(user) {
    this.setState({ user })
  }

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/thanks"
          render={props => <Thanks {...props} setUser={this.setUser} />}
        />
        {this.state.isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/media/videos/:id" component={SingleVideo} />
            <Route exactPath="/media/videos" component={Videos} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

export default Routes
