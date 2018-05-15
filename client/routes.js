import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
//import PropTypes from 'prop-types'
import { Login, Signup, Splash, Videos, SingleVideo } from './components'
import { authorize } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.setCurrentUser()
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/splash" component={Splash} />
        {this.props.currentUser.isApproved && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exactPath="/media/videos" component={Videos} />
            <Route path="/media/videos/:id" component={SingleVideo} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.user,
    error: state.error
  }
}

const mapDispatch = dispatch => {
  return {
    setCurrentUser: () => dispatch(authorize())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
