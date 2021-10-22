import React from 'react'
import Product from '../../Components/product/Product'
import Modal from '../../Components/modal/Modal'
import {fetchProducts} from '../../redux/Products/reducer'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {closeModal} from '../../redux/modal/reducer'
import './List.css'

const Products = (props) => {
    const dispatch = useDispatch();
    const {products,loading,listError} = useSelector(state => state.products)
    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])
    return (
    <section className="wrapper">
        {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
        {loading ? <h2>Loading</h2> : listError ? <h2>{listError}</h2> : products.map((product) => {
        return (
                <Product key={product._id} {...product}/> 
        )
    }) }
    </section>
    )    
}

export default Products