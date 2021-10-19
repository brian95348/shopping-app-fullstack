import React from 'react'
import {Link} from 'react-router-dom'

function ComponentNotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/products">Home</Link>
    </div>
  )
}

export default ComponentNotFound
