import React, { Component } from 'react'

class AllMedia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
  }

  render() {
    console.log(this.props)
    return <div>TEST</div>
  }
}

export default AllMedia
