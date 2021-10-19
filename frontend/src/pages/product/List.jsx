import React from 'react'
import Product from '../../Components/product/Product'
import {fetchProducts} from '../../redux/Products/reducer'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './List.css'

const Products = (props) => {
    const dispatch = useDispatch();
    const {products,loading,error} = useSelector(state => state.products)
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])
    return (
    <section className="wrapper">
        {loading ? <h2>Loading</h2> : error ? <h2>{error}</h2> : products.map((product) => {
        return (
                <Product key={product._id} {...product}/> 
        )
    }) }
    </section>
    )    
}

export default Products