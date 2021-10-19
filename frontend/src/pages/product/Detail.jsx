import React from 'react'
import {Link, useParams,useHistory} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProductDetail} from '../../redux/Product/reducer'
import {addProductToCart} from '../../redux/cart/reducer'
import './Detail.css'

const ProductDetail = (props) => {
    const defaultStock = [1,2,3]
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch();
    const {id} = useParams()
    const history = useHistory();
    const {product,loading,error} = useSelector(state => state.productDetail)
    const {isAdmin} = useSelector(state => state.userLogin)
    useEffect(()=>{
        if (product && id !== product._id) {
            dispatch(fetchProductDetail(id))
        }
    },[dispatch,product,id])
    const {_id,description,image,title,price,size,color,category} = product

    const addToCartHandler = () => {
        dispatch(addProductToCart(product._id,qty))
        history.push('/cart')
    }
    return ( 
        <>
        {loading ? (
             <h2>Loading</h2> 
            ) : error ? (
            <h2>{error}</h2>
            ) : (
            <>
            <div className="detail-wrapper">
                <div className="image-div">
                    <img src={image} alt=""/>
                </div>
                <div className="info-div">
                    <p>name: {title}</p>
                    <p>description: <span>{description}...</span></p>
                    <p>color: {color}</p>
                    <p>size: {size}</p>
                    <p>category: {category}</p>
                    <h4>price: ${price}</h4>
                    {isAdmin && <p><Link className="product-detail-link product-update" to={`/products/${_id}/update`}>Update</Link></p>}
                    {isAdmin && <p><Link className="product-detail-link product-delete" to={`/products/${_id}/delete`}>Delete</Link></p>}
                </div>
                <div className="cart-div">
                    <p>Status: <span>in-stock</span></p>
                    <p>Quantity: <span>
                        <select value={qty} onChange={(e)=> setQty(e.target.value)}>
                            {defaultStock.map((x) => {
                                return (
                                    <option key={x} value={x}>{x}</option>
                                )
                            })}     
                        </select>
                        </span></p>
                        <p>Total: ${price}</p>
                    <button onClick={addToCartHandler} >Add to cart</button>
                </div>
            </div>
            <div className="back-div">
                <Link className="back" to="/products">Back</Link>
            </div>
            </>
        )
        }
        </>
    )
}

export default ProductDetail
