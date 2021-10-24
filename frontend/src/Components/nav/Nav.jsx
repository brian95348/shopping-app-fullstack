import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Nav.css'


function Nav() {
    const [openNav,setOpenNav] = useState(false)
    const {cartItems} = useSelector(state => state.cart)
    const {isloggedIn,isAdmin,username} = useSelector(state => state.userLogin)

    const handleToggle = () => {
      setOpenNav(prev => !prev)
    }

    const getCartItemsCount = () => {
    return cartItems.reduce((qty,item)=> Number(item.qty) + qty,0)
  }
  return (
    <nav id="nav" className="nav nav-flex">
        <div className="nav-header">
            <h1 className="nav-logo">Zonkeshop</h1>
            <i onClick={handleToggle} className="fas fa-bars nav-drop-down"></i>
        </div>
        <div className={`nav-links ${openNav ? "show" : ""}`}>
            <p><Link className="link" to="/products" >Products</Link></p>
            <p className="cart-object"><Link id="cart-link" className="link" to="/cart"> <i className="fas fa-shopping-cart"></i> Cart <span className="cart-badge">{getCartItemsCount()}</span> </Link></p>
            {!isloggedIn && <p><Link className="link" to="/auth/register">Register</Link></p>}
            <p><Link className="link" to={isloggedIn ? "/auth/logout" : "/auth/login"}>{isloggedIn ? "Logout" : "Login"}</Link></p>
            {isAdmin && <p><Link className="link administrator-link" to="/admin">ADMIN</Link></p>}
            <p><Link className="link" to="/#">Contact us</Link></p>
            <p><Link className="link" to="/#">About</Link></p>
        </div>
        <div className={`nav-links-icons ${openNav ? "show" : ""}`}>
            {!isAdmin && isloggedIn && <><i className="fas fa-user fa-2x"></i><span>{username}</span></>}
            <i className="fab fa-github fa-2x"></i>
            <i className="fab fa-facebook fa-2x"></i>
            <i className="fab fa-instagram fa-2x"></i>
            <i className="fab fa-twitter fa-2x"></i>
        </div>
    </nav>
  )
}

export default Nav


