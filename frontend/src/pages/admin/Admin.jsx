import React from 'react'
import {Link} from 'react-router-dom'
import './Admin.css'

function Admin() {
  return (
    <section className="admin-container">
    <div className="admin-header">
      <h1>Administrator</h1>
      </div>
    <div className="admin-wrapper" >
      
      <div className="section-div admin-products">
        <h3>Products</h3>
          <Link className="admin-link" to="/products/">View Products</Link>
          <Link className="admin-link" to="/products/add">Add Product</Link>
          <Link className="admin-link" to="/products/">Delete Product</Link>
          <Link className="admin-link" to="/products/">Update Product</Link>
      </div>
      <div className="section-div admin-users">
        <h3>Users</h3>
          <Link className="admin-link" to="#">View Users</Link>
          <Link className="admin-link" to="#">Delete User</Link>
          <Link className="admin-link" to="#">Update User</Link>
      </div>
      <div className="section-div admin-orders">
        <h3>Orders</h3>
          <Link className="admin-link" to="#">View orders</Link>
          <Link className="admin-link" to="#">Delete order</Link>
          <Link className="admin-link" to="#">Update order</Link>
      </div>
      <div className="section-div admin-carts">
        <h3>Carts</h3>
          <Link className="admin-link" to="#">View Carts</Link>
          <Link className="admin-link" to="#">Delete Cart</Link>
      </div>
    </div>
    </section>
  )
}

export default Admin
