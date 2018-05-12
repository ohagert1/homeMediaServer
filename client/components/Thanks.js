import React from 'react'
import { Link } from 'react-router-dom'

const Thanks = () => {
  console.log('??')
  return (
    <span>
      <h1>
        Thanks for asking, please wait for a response from the administrator.
      </h1>
      <Link to="/login">Back to login</Link>
    </span>
  )
}

export default Thanks
