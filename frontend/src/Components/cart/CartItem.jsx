import React from 'react'
import './CartItem.css'

function CartItem(props) {
    const {image,title,price,qty,qtyChangeHandler,_id,removeFromCart} = props
    const defaultStock = [1,2,3]
  return (
    <div className="cart-item">
      <img src={image} alt=""/>
            <h4>{title}</h4>
            <h4>${price}</h4>
            <select className="select" value={qty} onChange={(e)=>qtyChangeHandler(_id,e.target.value)} >
                {defaultStock.map((x) => {
                  return (
                      <option key={x} value={x}>{x}</option>
                  )
              })}
            </select>
            <i className="fas fa-trash" onClick={()=>removeFromCart(_id)}></i>
    </div>
  )
}

export default CartItem
