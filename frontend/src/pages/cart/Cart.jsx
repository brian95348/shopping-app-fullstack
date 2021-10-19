import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from '../../Components/cart/CartItem'
import { addProductToCart,removeProductFromCart } from '../../redux/cart/reducer'
import './Cart.css'

function Cart() {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cart)

  const qtyChangeHandler = (id,qty) => {
    dispatch(addProductToCart(id,qty))
  }

  const removeFromCart = (id) => {
    dispatch(removeProductFromCart(id))
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((qty,item)=> Number(item.qty) + qty,0)
  }

  const getCartSubTotal = () => {
    return cartItems.reduce((price,item) => item.price * item.qty + price,0)
  }
  return (
    <section className="cart flex">
      <div className="cart-items">
        <div className="header">
          <h3>Shopping Cart</h3>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart-div">
            <p>Your cart is empty</p> 
            <Link to="/products" className="empty-cart-link">Go back</Link>
          </div>
        ) : cartItems.map(product => {
            return (
            <>
            <CartItem key={product._id} {...product} qtyChangeHandler={qtyChangeHandler} removeFromCart={removeFromCart}/>
            </>
            )
        })}
      </div>
      {cartItems.length > 0 && (
      <div className="cart-info">
        <p>{getCartItemsCount()} items</p>
        <p>Total: ${getCartSubTotal().toFixed(2)}</p>
        <button>Proceed to checkout</button>
      </div>
      )}
    </section>
  )
}

export default Cart
