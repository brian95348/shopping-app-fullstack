import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

function Home() {
  
  return (
    <section className="home">
      <div className="text">
        <h1>Keep the Summer Vibe Alive</h1>
        <Link className="shop-link" to="/products">Shop Now</Link>
      </div>
    </section>
  )
}

export default Home
