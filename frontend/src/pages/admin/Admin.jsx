import React from 'react'
import {Link} from 'react-router-dom'

function Admin() {
  return (
    <div >
      <h1>Administrator</h1>
      <Link className="admin-product-create-link" to="/products/add">Add Product</Link>
    </div>
  )
}

export default Admin
